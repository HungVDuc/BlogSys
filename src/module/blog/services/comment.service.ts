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

  createQb(id?: string) {
    const queryBuilder = this.repository
      .createQueryBuilder('comment')
      .leftJoin('comment.user', 'user')
      .leftJoin('comment.post', 'post')
      .addSelect(['user.username', 'post.title', 'post.content']);

    if (id) queryBuilder.andWhere('comment.id = :id', { id });

    return queryBuilder;
  }

  getAll() {
    return this.createQb().getMany();
  }

  getDetail(id: string) {
    return this.createQb(id).getOne();
  }
}
