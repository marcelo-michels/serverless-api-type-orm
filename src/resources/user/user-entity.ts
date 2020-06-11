import { Entity, Column } from 'typeorm'
import { EntityBase } from '../../database/entity-base'

@Entity({ name: 'user' })
export class UserEntity extends EntityBase {

  @Column({ nullable: false })
  name: string

  @Column({ nullable: true })
  email?: string

  @Column({ nullable: true })
  phone?: string

}
