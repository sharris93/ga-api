import express from 'express'
import { eventIndex, eventCreate, eventShow, eventEdit, eventDelete } from '../controllers/events.js'
import { movieIndex, movieShow, movieSearch, movieSuggestions, movieCreate, movieUpdate, movieDelete } from '../controllers/movies.js'
import { birdIndex, birdShow, birdCreate, birdUpdate, birdDelete } from '../controllers/birds.js'
import { activityIndex, activityShow, activityCreate, activityUpdate, activityDelete } from '../controllers/activities.js'
import secureRoute from '../lib/secureRoute.js'
import { registerUser, loginUser } from '../controllers/auth.js'


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
  .post(secureRoute, movieCreate)

router.route('/movies/suggestions')
  .get(movieSuggestions)

router.route('/movies/search')
  .get(movieSearch)

router.route('/movies/:movieId')
  .get(movieShow)
  .put(secureRoute, movieUpdate)
  .delete(secureRoute, movieDelete)

router.route('/birds')
  .get(birdIndex)
  .post(secureRoute, birdCreate)

router.route('/birds/:birdId')
  .get(birdShow)
  .put(secureRoute, birdUpdate)
  .delete(secureRoute, birdDelete)

router.route('/activities')
  .get(activityIndex)
  .post(secureRoute, activityCreate)

router.route('/activities/:activityId')
  .get(activityShow)
  .put(secureRoute, activityUpdate)
  .delete(secureRoute, activityDelete)

router.post('/register', registerUser)
router.post('/login', loginUser)


export default router

