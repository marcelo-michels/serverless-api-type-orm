import { getRepository, Repository, FindManyOptions, FindOneOptions, QueryRunner, createConnection } from 'typeorm'

export class RepositoryBase<T> {

  private repository: Repository<T>

  constructor (private entity) {
    this.repository = getRepository(this.entity)
  }

  setQueryRunner (queryRunner: QueryRunner): RepositoryBase<T> {
    this.repository = queryRunner.connection.getRepository(this.entity)
    return this
  }

  private async getRepository (tryNumber = 0): Promise<Repository<T>> {
    try {
      return getRepository(this.entity)
    } catch (error) {
      if (tryNumber < 3) {
        await createConnection()
        return this.getRepository(++tryNumber)
      }
    }
  }

  async save (object: T): Promise<T> {
    return this.repository.save(object)
  }

  async find (options?: FindManyOptions): Promise<T[]> {
    return this.repository.find(options)
  }

  async findOne (id?: string|number, options?: FindOneOptions): Promise<T> {
    return this.repository.findOne(id, options)
  }

  async count (options?: FindManyOptions): Promise<number> {
    return this.repository.count(options)
  }

}
