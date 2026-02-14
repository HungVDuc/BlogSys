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

  createQb(id?: string) {
    const queryBuilder = this.repository
      .createQueryBuilder('post')
      .leftJoin('post.user', 'user')
      .leftJoin('post.comments', 'comment')
      .addSelect(['user.username', 'comment.content']);

    if (id) queryBuilder.andWhere('post.id = :id', { id });

    return queryBuilder;
  }

  getAll() {
    return this.createQb().getMany();
  }

  getDetail(id: string) {
    return this.createQb(id).getOne();
  }
}
