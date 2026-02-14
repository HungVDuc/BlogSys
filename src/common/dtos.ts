import { IsString } from 'class-validator';

export class MysqlId {
  @IsString()
  id: string;
}
