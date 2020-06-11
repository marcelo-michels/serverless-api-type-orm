import { PrimaryColumn, BeforeInsert, Column, BeforeUpdate } from 'typeorm'
import { nanoid } from '../services/nanoid'

export class EntityBase {

    @PrimaryColumn()
    id?: string;

    @Column()
    createdAt?: Date;

    @Column()
    updatedAt?: Date;

    @BeforeInsert()
    prepareInsert? (): void {
      this.id = nanoid()
      const dt = new Date()
      this.createdAt = dt
      this.updatedAt = dt
    }

    @BeforeUpdate()
    prepareUpdate? (): void {
      this.updatedAt = new Date()
    }

}
