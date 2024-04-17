import express, { Router } from 'express'
import cors from 'cors'
import serverless from 'serverless-http'
import birdData from '../data/birds'

const app = express()

const router = Router()

// Routes
router.get('/birds', (req, res) => res.json(birdData))

app.use(cors())

app.use('/api/', router)

export const handler = serverless(app)