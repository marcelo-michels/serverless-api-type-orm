/* eslint-disable import/first */
import * as dotenv from 'dotenv'
dotenv.config()
import app from './app'
import { createConnection } from 'typeorm'

app.listen(3000, async () => {
  createConnection()
  console.log('Server is running on port 3000')
})
