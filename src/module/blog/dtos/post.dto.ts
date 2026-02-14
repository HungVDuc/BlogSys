import { PartialType } from '@nestjs/mapped-types';
import { IsString } from 'class-validator';

class PostDto {
  @IsString()
  title: string;

  @IsString()
  content: string;
}

export class CreatePostDto extends PostDto {}

export class UpdatePostDto extends PartialType(CreatePostDto) {}
