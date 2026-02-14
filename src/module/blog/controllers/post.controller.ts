import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PostService } from '../services/post.service';
import { UserAuth } from 'src/common/decorators/user-auth.decorator';
import { type IUserAuth } from 'src/common/user-auth.interface';
import { CreatePostDto, UpdatePostDto } from '../dtos/post.dto';
import { MysqlId } from 'src/common/dtos';
import { checkOwnerOrAdmin } from 'src/common/utils/authorization.util';

@Controller('post')
export class PostController {
  constructor(private readonly service: PostService) {}

  @Get()
  async getAll(@UserAuth() user: IUserAuth) {
    return this.service.getList();
  }

  @Post()
  async create(@UserAuth() user: IUserAuth, @Body() dto: CreatePostDto) {
    return this.service.create({ ...dto, userId: user.sub });
  }

  @Patch(':id')
  async update(
    @UserAuth() user: IUserAuth,
    @Param() param: MysqlId,
    @Body() dto: UpdatePostDto,
  ) {
    const post = await this.service.getOne(param.id);

    if (!post) {
      throw new NotFoundException();
    }

    checkOwnerOrAdmin(user, post);

    return this.service.updateOne(param.id, dto);
  }

  @Delete(':id')
  async delete(@UserAuth() user: IUserAuth, @Param() param: MysqlId) {
    const post = await this.service.getOne(param.id);

    if (!post) {
      throw new NotFoundException();
    }

    checkOwnerOrAdmin(user, post);

    return this.service.deleteOne(param.id);
  }
}
