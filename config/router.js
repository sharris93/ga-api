import express from 'express'
import { eventIndex, eventCreate, eventShow, eventEdit, eventDelete } from '../controllers/events.js'
import { movieIndex, movieShow, movieSearch } from '../controllers/movies.js'
import { birdIndex, birdShow } from '../controllers/birds.js'
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

router.route('/movies/search')
  .get(movieSearch)

router.route('/movies/:id')
  .get(movieShow)

router.route('/birds')
  .get(birdIndex)

router.route('/birds/:id')
  .get(birdShow)

router.post('/register', auth.register)
router.post('/login', auth.login)


export default router

