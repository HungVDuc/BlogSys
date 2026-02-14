import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/base/service/base.service';
import { Post } from '../entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PostService extends BaseService<Post> {
  constructor(
    @InjectRepository(Post) protected readonly repository: Repository<Post>,
  ) {
    super(repository);
  }
}
