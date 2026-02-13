import { ObjectLiteral } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { BaseCreateService } from './base-create.service';

export class BaseUpdateService<
  TRepo extends ObjectLiteral,
> extends BaseCreateService<TRepo> {
  protected async preUpdateOne(id: string, dto: QueryDeepPartialEntity<TRepo>) {
    /* */
  }

  protected async postUpdateOne(
    id: string,
    dto: QueryDeepPartialEntity<TRepo>,
    updatedData: TRepo,
  ) {
    /* */
  }

  async updateOne(
    id: string,
    dto: QueryDeepPartialEntity<TRepo>,
  ): Promise<TRepo> {
    await this.preUpdateOne(id, dto);

    const result = await this.repository.update(id, dto);

    if (!result.affected) {
      throw new Error('Record not found');
    }

    const updatedData = await this.repository.findOne({
      where: { id } as any,
    });

    await this.postUpdateOne(id, dto, updatedData as TRepo);

    return updatedData as TRepo;
  }
}
