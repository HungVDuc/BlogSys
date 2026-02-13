import { ObjectLiteral } from 'typeorm';
import { BaseUpdateService } from './base-update.service';

export class BaseDeleteService<
  TRepo extends ObjectLiteral,
> extends BaseUpdateService<TRepo> {
  protected async preDeleteOne(id: string) {
    /*  */
  }

  protected async postDeleteOne(id: string, deletedData: TRepo | null) {
    /*  */
  }

  async deleteOne(id: string) {
    await this.preDeleteOne(id);

    const entity = await this.repository.findOne({
      where: { id } as any,
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const result = await this.repository.delete(id);

    if (!result.affected) {
      throw new Error('Delete failed');
    }

    await this.postDeleteOne(id, entity);
  }
}
