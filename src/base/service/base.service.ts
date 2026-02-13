import { ObjectLiteral } from 'typeorm';
import { BaseDeleteService } from './base-delete.service';

export class BaseService<
  TRepo extends ObjectLiteral,
> extends BaseDeleteService<TRepo> {}
