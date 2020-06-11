
import { JsonController, Param, Body, Get, Post } from 'routing-controllers'
import { UserRepository } from './user-repository'
import { UserEntity } from './user-entity'

@JsonController()
export class UserController {

  userRepository = new UserRepository()

  @Get('/users')
  async getAll (): Promise<unknown> {
    try {
      const users = await this.userRepository.find()
      return users
    } catch (error) {
      console.log('error', error)
      return { status: 'error' }
    }
  }

  @Get('/users/count')
  async count (): Promise<unknown> {
    try {
      const count = await this.userRepository.count()
      return count
    } catch (error) {
      console.log('error', error)
      return { status: 'error' }
    }
  }

  @Get('/users/id/:id')
  async getOne (@Param('id') id: number): Promise<unknown> {
    try {
      const result = await this.userRepository.findOne(id)
      if (result) {
        return result
      } else {
        return { status: 'Item Not Found' }
      }
    } catch (error) {
      console.log('error', error)
      return { status: 'error' }
    }
  }

  @Post('/users')
  async post (@Body() user: UserEntity): Promise<unknown> {
    try {
      await this.userRepository.save(user)
      return user
    } catch (error) {
      console.log('error', error)
      return { status: 'errors' }
    }
  }

  @Get('/users/popule')
  async popule (): Promise<unknown> {
    try {
      const promises = []
      for (let i = 0; i < 300; i++) {
        promises.push(this.userRepository.save({
          name: `Name ${i}`,
          phone: `(${i}${i}) ${i}${i}${i}${i}-${i}${i}${i}${i}${i}`
        }))
      }
      await Promise.all(promises)
      return { status: 'ok' }
    } catch (error) {
      console.log('error', error)
      throw new Error('error')
    }
  }

}
