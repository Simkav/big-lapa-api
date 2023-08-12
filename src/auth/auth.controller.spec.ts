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
import { JwtStratagy } from './strategies/jwt.strategy';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let authService: AuthService;

  const mockAuthService = {
    findUser: jest.fn().mockImplementation((userName: string) => {
      console.log('findUser mock called with:', userName);
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

  const mockJwtService = {
    signAsync: jest
      .fn()
      .mockImplementation((payload) => Promise.resolve('mockedToken')),
  };

  const mockJwtStrategy = {
    validate: jest
      .fn()
      .mockImplementation(({ userName }) => Promise.resolve(userName)),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: JwtService, useValue: mockJwtService },
        { provide: JwtStratagy, useValue: mockJwtStrategy },
      ],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    authService = module.get<AuthService>(AuthService);
    console.log('Application initialized. AuthService:', authService);
  });

  it('/auth/register (POST) should register a user', () => {
    const authDto: AuthDto = {
      login: 'testUser',
      password: 'testPassword',
    };

    console.log('Sending request with DTO:', authDto);

    return request(app.getHttpServer())
      .post('/auth/register')
      .send(authDto)
      .expect(201)
      .then((response) => {
        console.log(response.body);
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

  afterEach(async () => {
    if (app) {
      await app.close();
    }
  });
});
