import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/service/base.service';
import { Comment } from '../entities/comment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CommentService extends BaseService<Comment> {
  constructor(
    @InjectRepository(Comment)
    protected readonly repository: Repository<Comment>,
  ) {
    super(repository);
  }
}
