import express from 'express'
import { eventIndex, eventCreate, eventShow, eventEdit, eventDelete } from '../controllers/events.js'
import { movieIndex, movieShow } from '../controllers/movies.js'
import secureRoute from '../lib/secureRoute.js'
import auth from '../controllers/auth.js'


const router = express.Router()


router.route('/events')
  .get(eventIndex)
  .post(secureRoute, eventCreate)

router.route('/events/:eventId')
  .get(eventShow)
  .delete(secureRoute, eventDelete)
  .put(secureRoute, eventEdit)

router.route('/movies')
  .get(movieIndex)

router.route('/movies/:id')
  .get(movieShow)

router.post('/register', auth.register)
router.post('/login', auth.login)


export default router

