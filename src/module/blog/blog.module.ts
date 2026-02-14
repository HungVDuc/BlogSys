import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Comment } from './entities/comment.entity';
import { PostService } from './services/post.service';
import { CommentService } from './services/comment.service';
import { PostController } from './controllers/post.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Post, Comment])],
  controllers: [PostController],
  providers: [PostService, CommentService],
  exports: [],
})
export class BlogModule {}
