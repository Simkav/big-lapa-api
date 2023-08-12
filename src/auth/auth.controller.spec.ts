/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {
  INestApplication,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import request from 'supertest';
import { JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ConfigService } from '@nestjs/config';
import jwt from 'jsonwebtoken';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let authService: AuthService;
  const JWT_SECRET = 'defaultSecret';

  const realToken = jwt.sign({ userName: 'testUser' }, JWT_SECRET);

  const mockAuthService = {
    findUser: jest.fn().mockImplementation((userName: string) => {
      // console.log('findUser mock called with:', userName);
      return Promise.resolve(null);
    }),
    createUser: jest.fn().mockImplementation((dto: AuthDto) => {
      console.log('createUser mock called with DTO:', dto);
      return Promise.resolve({
        userName: dto.login,
        passwordHash: 'hashedPassword',
      });
    }),
    validateUser: jest
      .fn()
      .mockImplementation((email: string, password: string) => {
        if (email === 'testUser' && password === 'testPassword') {
          return Promise.resolve({ userName: email });
        } else {
          return Promise.reject(
            new UnauthorizedException('Invalid credentials'),
          );
        }
      }),
    login: jest.fn().mockImplementation((userName: string) => {
      return Promise.resolve({ access_token: 'mockedToken' });
    }),
    changePassword: jest
      .fn()
      .mockImplementation(
        (userName: string, oldPassword: string, newPassword: string) => {
          if (userName === 'testUser' && oldPassword === 'testPassword') {
            return Promise.resolve(true);
          } else {
            return Promise.reject(
              new UnauthorizedException('Invalid credentials'),
            );
          }
        },
      ),
  };

  const mockJwtStrategy = {
    validate: jest
      .fn()
      .mockImplementation(({ userName }) => Promise.resolve(userName)),
  };

  const mockJwtService = {
    sign: jest.fn().mockImplementation(() => realToken),
  };

  const mockConfigService = {
    get: jest.fn().mockImplementation((key: string) => {
      switch (key) {
        case 'JWT_SECRET':
          return JWT_SECRET;
        case 'JWT_EXPIRATION_TIME':
          return '3600s';
        default:
          return null;
      }
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: JwtService, useValue: mockJwtService },
        { provide: ConfigService, useValue: mockConfigService },
        JwtStrategy,
      ],
    }).compile();

    app = module.createNestApplication();
    await app.init();
    authService = module.get<AuthService>(AuthService);
  });

  it('/auth/register (POST) should register a user', () => {
    const authDto: AuthDto = {
      login: 'testUser',
      password: 'testPassword',
    };

    // console.log('Sending request with DTO:', authDto);

    return request(app.getHttpServer())
      .post('/auth/register')
      .send(authDto)
      .expect(201)
      .then((response) => {
        // console.log(response.body);
        expect(response.body.userName).toEqual(authDto.login);
      });
  });

  it('/auth/register (POST) should fail if user already exists', () => {
    const authDto: AuthDto = {
      login: 'existingUser',
      password: 'testPassword',
    };

    mockAuthService.findUser.mockResolvedValue({
      userName: 'existingUser',
      passwordHash: 'hashedPassword',
    });

    return request(app.getHttpServer())
      .post('/auth/register')
      .send(authDto)
      .expect(400);
  });

  it('/auth/register (POST) should fail if password is missing', () => {
    const authDto = {
      login: 'testUser',
      // password empty
    };

    return request(app.getHttpServer())
      .post('/auth/register')
      .send(authDto)
      .expect(400);
  });

  it('/auth/register (POST) should fail if login is missing', () => {
    const authDto = {
      // login empty
      password: 'testPassword',
    };

    return request(app.getHttpServer())
      .post('/auth/register')
      .send(authDto)
      .expect(400);
  });

  it('/auth/login (POST) should login successfully', () => {
    const authDto: AuthDto = {
      login: 'testUser',
      password: 'testPassword',
    };

    mockAuthService.validateUser.mockResolvedValue({
      userName: authDto.login,
    });

    return request(app.getHttpServer())
      .post('/auth/login')
      .send(authDto)
      .expect(200)
      .then((response) => {
        expect(response.body.access_token).toBeDefined();
      });
  });

  it('/auth/login (POST) should fail for incorrect password', () => {
    const authDto: AuthDto = {
      login: 'testUser',
      password: 'wrongPassword',
    };

    mockAuthService.validateUser.mockRejectedValue(
      new UnauthorizedException('Invalid credentials'),
    );

    return request(app.getHttpServer())
      .post('/auth/login')
      .send(authDto)
      .expect(401)
      .then((response) => {
        expect(response.body.message).toBe('Invalid credentials');
      });
  });

  // it('/auth/login (POST) should fail for non-existing user', () => {
  //   const authDto: AuthDto = {
  //     login: 'nonExistentUser',
  //     password: 'testPassword',
  //   };

  //   mockAuthService.validateUser.mockResolvedValue(null);

  //   return request(app.getHttpServer())
  //     .post('/auth/login')
  //     .send(authDto)
  //     .expect(401)
  //     .then((response) => {
  //       expect(response.body.message).toBe('User not found');
  //     });
  // });

  it('/auth/login (POST) should handle server error', () => {
    const authDto: AuthDto = {
      login: 'testUser',
      password: 'testPassword',
    };

    mockAuthService.validateUser.mockRejectedValue(
      new InternalServerErrorException(),
    );

    return request(app.getHttpServer())
      .post('/auth/login')
      .send(authDto)
      .expect(500);
  });

  it('/auth/change-password (POST) should change password successfully', async () => {
    const changePasswordDto = {
      currentPassword: 'oldPassword',
      newPassword: 'newPassword',
    };

    mockAuthService.changePassword.mockResolvedValue(true);

    const response = await request(app.getHttpServer())
      .patch('/auth/change-password')
      .set('Authorization', `Bearer ${realToken}`) // Use the real token
      .send(changePasswordDto)
      .expect(200);
    expect(response.body.message).toEqual('Password changed');
  });

  it('/auth/change-password (POST) should fail for wrong current password', async () => {
    const changePasswordDto = {
      currentPassword: 'wrongPassword',
      newPassword: 'newPassword',
    };

    mockAuthService.changePassword.mockRejectedValue(
      new UnauthorizedException('Invalid credentials'),
    );

    const response = await request(app.getHttpServer())
      .patch('/auth/change-password')
      .set('Authorization', `Bearer ${realToken}`)
      .send(changePasswordDto)
      .expect(401);
    expect(response.body.message).toEqual('Invalid credentials');
  });

  it('/auth/change-password (POST) should fail for non-existent user', async () => {
    const changePasswordDto = {
      currentPassword: 'oldPassword',
      newPassword: 'newPassword',
    };

    mockAuthService.changePassword.mockRejectedValue(
      new UnauthorizedException('User not found'),
    );

    const response = await request(app.getHttpServer())
      .patch('/auth/change-password')
      .set('Authorization', `Bearer ${realToken}`)
      .send(changePasswordDto)
      .expect(401);
    expect(response.body.message).toEqual('User not found');
  });

  afterEach(async () => {
    if (app) {
      await app.close();
    }
  });
});
