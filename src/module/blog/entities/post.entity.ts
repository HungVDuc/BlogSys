import { User } from 'src/module/user/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Comment } from './comment.entity';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column('userId')
  userId: string;

  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn({ name: 'userId' })
  user: User;

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];
}
