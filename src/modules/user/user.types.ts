import { IsNotEmpty, IsString } from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  readonly id: string;

  @IsNotEmpty()
  readonly username: string;
}

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  readonly username: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;
}

export class UserProfileDto extends UserDto {
  favorites: string[];
}
