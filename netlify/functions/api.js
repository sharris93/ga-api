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
router.get('/events/:id', (req, res) => {
  const event = eventData.find(event => event._id === parseInt(req.params.id))
  if (event) {
    return res.json(event)
  } else {
    return res.status(404).json({ message: 'Event Not Found' })
  }
})

// Middleware
app.use(cors())

app.use('/api/', router)

export const handler = serverless(app)