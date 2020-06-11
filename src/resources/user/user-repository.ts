
import { RepositoryBase } from '../../database/repository-base'
import { UserEntity } from './user-entity'

export class UserRepository extends RepositoryBase<UserEntity> {

  constructor () {
    super(UserEntity)
  }

}
