import {
  Controller,
  Get,
  Param,
  Post,
  UseInterceptors,
  Res,
  BadRequestException,
  Body,
  Delete,
  Header,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { BackblazeService } from './backblaze.service';
import { ValidateUploadFiles } from './decorators/validate.upload.files.decorator';
import { FileService } from '../files/file.service';
import { ConfigService } from '@nestjs/config';
import { IEnv } from 'src/configs/env.config';
import { UploadImageDto } from './dto/upload-image.dto';
import {
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { GetCategoryResponse } from './dto/get-category-res.dto';

@ApiTags('files')
@Controller('files')
export class BackBlazeController {
  constructor(
    private readonly backblazeService: BackblazeService,
    private readonly fileService: FileService,
    private readonly configService: ConfigService<IEnv>,
  ) {}
  @Post('images')
  @ApiCreatedResponse({ description: 'Array of ids of created images' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      required: ['images'],
      properties: {
        category: {
          type: 'string',
          description:
            'category by which you can filter then like slider logo etc',
        },
        images: {
          description: 'Images to upload, maximum 6',
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    },
  })
  @UseInterceptors(FilesInterceptor('images', 6))
  async uploadImage(
    @ValidateUploadFiles(2_097_152, ['.ico', '.png', '.jpeg'])
    images: Express.Multer.File[],
    @Body() uploadImageDto: UploadImageDto,
  ) {
    if (!images) {
      throw new BadRequestException('No files uploaded');
    }
    const links = await Promise.all(
      images.map((image) =>
        this.backblazeService.uploadFile(
          image.buffer,
          image.originalname,
          uploadImageDto.category,
        ),
      ),
    );
    return links;
  }

  @Post('documents')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      required: ['document'],
      properties: {
        document: {
          description: 'File to upload',
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiCreatedResponse({ description: 'Id of created document' })
  @UseInterceptors(FileInterceptor('document'))
  async uploadDocument(
    @ValidateUploadFiles(2_097_152, ['.txt', '.pdf', '.doc'])
    document: Express.Multer.File,
  ) {
    if (!document) {
      throw new BadRequestException('No files uploaded');
    }
    const link = await this.backblazeService.uploadFile(
      document.buffer,
      document.originalname,
      'Document',
    );
    return link;
  }

  @ApiNotFoundResponse({ description: 'File not found' })
  @ApiOkResponse()
  @Get(':url')
  @Header('Cache-control', 'max-age=31536000')
  async getFileByUrl(@Param('url') url: string, @Res() response: Response) {
    console.log('test', new Date());
    const stream = await this.backblazeService.getFile(url);
    response.setHeader('Content-type', 'image');
    stream.on('data', (data) => response.write(data));
    stream.on('end', () => {
      response.end();
    });
  }

  @Get('/document/:url')
  @ApiNotFoundResponse({ description: 'Document not found' })
  @ApiOkResponse()
  @ApiParam({ name: 'url', description: 'id of document', required: true })
  @Header('Cache-control', 'max-age=31536000')
  async getDocumentByUrl(@Param('url') url: string, @Res() response: Response) {
    const getFileName = await this.backblazeService.getFileInfo(url);
    response.setHeader('Content-Type', 'application/octet-stream');
    response.setHeader(
      'Content-Disposition',
      `attachment; filename=${encodeURI(getFileName.name)}`,
    );
    (await this.backblazeService.getFile(url)).pipe(response);
  }

  @Get('category/:category')
  @ApiOkResponse({ type: [GetCategoryResponse] })
  async getImagesByCategory(
    @Param('category') category: string,
  ): Promise<GetCategoryResponse[]> {
    const files = await this.backblazeService.getFilesByCategory(category);
    const filesResponse = files.map((file) => ({
      Url: file.Url,
      name: file.name,
    }));
    return filesResponse;
  }

  @ApiOkResponse()
  @ApiNotFoundResponse({ description: 'File not found' })
  @Delete(':id')
  async deleteFileById(@Param('id') id: string) {
    const result = await this.backblazeService.deleteFile(id);
    return { status: result };
  }
}
