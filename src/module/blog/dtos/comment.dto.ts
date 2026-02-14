import { PartialType } from '@nestjs/mapped-types';
import { IsString } from 'class-validator';

class CommentDto {
  @IsString()
  content: string;
}

export class CreateCommentDto extends CommentDto {}

export class UpdateCommentDto extends PartialType(CreateCommentDto) {}
