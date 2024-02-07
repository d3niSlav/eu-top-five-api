import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { CreateUserDto, UserProfileDto } from './user.types';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getById(id: string) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['favorites'],
    });

    if (!user) {
      throw new HttpException('User not found!', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  async getByEmail(email: string) {
    const user = await this.userRepository.findOneBy({ username: email });

    if (!user) {
      throw new HttpException('User not found!', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  async getProfile(id: string): Promise<UserProfileDto> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['favorites'],
    });

    if (!user) {
      throw new HttpException('User not found!', HttpStatus.NOT_FOUND);
    }

    const { favorites = [], username } = user;

    return {
      id,
      username,
      favorites: favorites.map(({ teamId }) => teamId),
    };
  }

  create(userData: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(userData);

    return this.userRepository.save(user);
  }
}
