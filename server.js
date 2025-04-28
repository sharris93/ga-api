import 'dotenv/config'

import { connectToDb } from './db/helpers.js'
import cors from 'cors'
import errorHandler from './lib/errorHandler.js'
import express from 'express'
import logger from './lib/logger.js'
import router from './config/router.js'

const app = express()

app.use(express.json())
app.use(cors())
app.use('/', logger)
app.use('/api', router)
app.use(errorHandler)

async function startSevers() {
  try {
    await connectToDb()
    console.log('Database connected')
    app.listen(process.env.PORT, () => console.log(`Server up and running on port ${process.env.PORT}`))
  } catch (err) {
    console.log('Oh no something went wrong')
    console.log(err)
  }
}

startSevers()