import { PartialType, PickType } from '@nestjs/mapped-types';
import { IsString } from 'class-validator';

class UserDto {
  @IsString()
  username: string;

  @IsString()
  password: string;
}

export class CreateUserDto extends UserDto {}

export class UpdateUserDto extends PartialType(CreateUserDto) {}

export class LoginDto extends PickType(UserDto, ['username', 'password']) {}
