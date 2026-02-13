import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/base/service/base.service';
import { User } from './user.entity';
import { DeepPartial, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService extends BaseService<User> {
  constructor(
    @InjectRepository(User) protected readonly repository: Repository<User>,
  ) {
    super(repository);
  }

  protected async preCreate(dto: DeepPartial<User>) {
    const saltRounds = 10;

    if (dto.password)
      dto.password = await bcrypt.hash(dto.password, saltRounds);
  }
}
