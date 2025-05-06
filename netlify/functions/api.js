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

app.use((req, res, next) => {
  let data = '';

  req.on('data', chunk => {
    data += chunk;
  });

  req.on('end', () => {
    if (data) {
      try {
        req.body = JSON.parse(data);
      } catch (err) {
        return res.status(400).send({ error: 'Invalid JSON' });
      }
    } else {
      req.body = {};
    }
    next();
  });
})
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