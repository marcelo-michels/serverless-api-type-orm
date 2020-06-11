import { JsonController, Get } from 'routing-controllers'
import * as pkg from '../../../package.json'

@JsonController()
export class APIController {

  @Get('/version')
  version (): unknown {
    return { version: pkg.version }
  }

  @Get('/sync')
  syncTables (): unknown {
    return true
  }

}
