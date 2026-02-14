import { DeepPartial, ObjectLiteral } from 'typeorm';
import { BaseListService } from './base-list-detail.service';

export class BaseCreateService<
  TRepo extends ObjectLiteral,
> extends BaseListService<TRepo> {
  protected preCreate(dto: DeepPartial<TRepo>) {
    /* */
  }

  protected postCreate(dto: DeepPartial<TRepo>, newData: TRepo) {
    return newData;
  }

  async create(dto: DeepPartial<TRepo>) {
    await this.preCreate(dto);
    const newData = await this.repository.save(dto);
    return this.postCreate(dto, newData);
  }
}
