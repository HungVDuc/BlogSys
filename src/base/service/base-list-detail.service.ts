import { ObjectLiteral, Repository } from 'typeorm';

export class BaseListService<TRepo extends ObjectLiteral> {
  constructor(protected readonly repository: Repository<TRepo>) {}

  getList() {
    return this.repository.find();
  }

  getOne(id: string) {
    return this.repository.findOne({
      where: { id } as any,
    });
  }
}
