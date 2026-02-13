import { DeepPartial, ObjectLiteral } from 'typeorm';
import { BaseListService } from './base-list.service';

export class BaseCreateService<
  TRepo extends ObjectLiteral,
> extends BaseListService<TRepo> {
  protected preCreate(dto: DeepPartial<TRepo>) {
    /* */
  }

  protected postCreate(dto: DeepPartial<TRepo>, newData: TRepo) {
    /* */
  }

  async create(dto: DeepPartial<TRepo>) {
    this.preCreate(dto);
    const newData = await this.repository.save(dto);
    return this.postCreate(dto, newData);
  }
}
