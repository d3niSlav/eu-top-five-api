import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { RegisterUserDto } from './auth.types';
import { UserService } from '../user/user.service';
import { PostgresErrorCode } from '../../common/decorators/typeorm.decorator';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UserService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const existingUser = await this.usersService.getByEmail(username);

    if (!existingUser) {
      throw new HttpException(
        'Wrong email or password!',
        HttpStatus.BAD_REQUEST,
      );
    }

    await AuthService.verifyPassword(password, existingUser.password);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: hashedPass, ...userData } = existingUser;

    return userData;
  }

  async login(username: string, password: string): Promise<any> {
    const user = await this.validateUser(username, password);

    return {
      access_token: this.jwtService.sign(user),
    };
  }

  async register(registrationData: RegisterUserDto) {
    try {
      return await this.usersService.create(registrationData);
    } catch (error) {
      if (error?.code === PostgresErrorCode.UniqueViolation) {
        throw new HttpException(
          'User with that email already exists!',
          HttpStatus.BAD_REQUEST,
        );
      }

      throw new HttpException(
        'Something went wrong!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private static async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string,
  ) {
    const isPasswordMatching = await bcrypt.compare(
      plainTextPassword,
      hashedPassword,
    );

    if (!isPasswordMatching) {
      throw new HttpException(
        'Wrong email or password!',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
