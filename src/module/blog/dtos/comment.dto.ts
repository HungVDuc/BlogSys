import { OmitType, PartialType } from '@nestjs/mapped-types';
import { IsString } from 'class-validator';

class CommentDto {
  @IsString()
  content: string;

  @IsString()
  postId: string;
}

export class CreateCommentDto extends CommentDto {}

export class UpdateCommentDto extends PartialType(
  OmitType(CreateCommentDto, ['postId']),
) {}
