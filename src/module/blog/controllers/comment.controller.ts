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
import { CommentService } from '../services/comment.service';
import { UserAuth } from 'src/common/decorators/user-auth.decorator';
import { type IUserAuth } from 'src/common/user-auth.interface';
import { CreateCommentDto, UpdateCommentDto } from '../dtos/comment.dto';
import { MysqlId } from 'src/common/dtos';
import { checkOwnerOrAdmin } from 'src/common/utils/authorization.util';

@Controller('comment')
export class CommentController {
  constructor(private readonly service: CommentService) {}

  @Get()
  async getAll(@UserAuth() user: IUserAuth) {
    return this.service.getList();
  }

  @Post()
  async create(@UserAuth() user: IUserAuth, @Body() dto: CreateCommentDto) {
    return this.service.create({ ...dto, userId: user.sub });
  }

  @Patch(':id')
  async update(
    @UserAuth() user: IUserAuth,
    @Param() param: MysqlId,
    @Body() dto: UpdateCommentDto,
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
