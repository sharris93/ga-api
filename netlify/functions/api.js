import express, { Router } from 'express'
import cors from 'cors'
import serverless from 'serverless-http'
import birdData from '../data/birds'
import eventData from '../data/events'

const app = express()

const router = Router()

// Routes
router.get('/birds', (req, res) => res.json(birdData))
router.get('/events', (req, res) => res.json(eventData))

// Middleware
app.use(cors())

app.use('/api/', router)

export const handler = serverless(app)