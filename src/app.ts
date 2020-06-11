import 'reflect-metadata'
import { useExpressServer } from 'routing-controllers'
import * as compression from 'compression'
import * as cors from 'cors'
import * as path from 'path'

import * as express from 'express'
import { getConnection, createConnection } from 'typeorm'
// import { createConnection, getConnection } from 'typeorm'

const app = express()
app.use(cors())
app.use(compression())

app.use((req, res, next) => {
  try {
    if (getConnection().isConnected) {
      return next()
    }
  } catch (error) {
    console.log('não tinha conexao')
  }
  console.log('manda criar conexao')
  createConnection()
    .then(() => next())
    .catch((err) => res.send({ status: 'falha banco', err }))
})

useExpressServer(app, {
  controllers: [path.join(__dirname, '/resources/**/*-controller.*')]
})

export default app
