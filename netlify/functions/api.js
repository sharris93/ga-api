import 'dotenv/config'

import { connectToDb } from '../../db/helpers.js'
import cors from 'cors'
import errorHandler from '../../lib/errorHandler.js'
import express from 'express'
import logger from '../../lib/logger.js'
import router from '../../config/router.js'
import htmlRouter from '../../config/html-router.js'
import serverless from 'serverless-http'

const app = express()

app.use(express.json())
app.use(cors())
app.use(logger)
app.use('/', htmlRouter)
app.use('/api', router)
app.use(errorHandler)

async function startSever() {
  try {
    await connectToDb()
    console.log('Database connected')
  } catch (err) {
    console.log('Oh no something went wrong')
    console.log(err)
  }
}

startSever()

export const handler = serverless(app)