import { connectToDb, truncateDb, disconnectDb } from './helpers.js'

// Models
import Event from '../models/event.js'
import User from '../models/user.js'
import Bird from '../models/bird.js'
import Movie from '../models/movie.js'
import { ActivityType, Activity, Trip } from '../models/Trips/trip.js'

// Data
import eventData from './data/events.js'
import birdData from './data/birds.js'
import movieData from './data/movies.js'
import typeData from './data/TripApp/activity-types.js'
import activityData from './data/TripApp/activities.js'

async function seed() {
  try {
    await connectToDb()
    console.log('Database Connected')

    await truncateDb()
    console.log('Database Dropped')

    const user = await User.create({
      username: 'admin',
      email: 'admin@email.com',
      password: 'pass',
      passwordConfirmation: 'pass',
      isAdmin: true,
    })

    // * Events App
    eventData.forEach(event => {
      event.owner = user
    })
    movieData.forEach(movie => {
      movie.owner = user
    })
    birdData.forEach(bird => {
      bird.owner = user
    })
    activityData.forEach(activity => {
      activity.owner = user
    })

    const events = await Event.create(eventData)
    console.log(`${events.length} events added to Database`)
    
    // * Movie App
    const movies = await Movie.create(movieData)
    console.log(`${movies.length} movies added to Database`)
    
    // * Birds App
    const birds = await Bird.create(birdData)
    console.log(`${birds.length} birds added to Database`)

    // * Trip App
    const activityTypes = await ActivityType.create(typeData)
    console.log(`${activityTypes.length} activity types added to Database`)
    
    const activities = await Activity.create(activityData)
    console.log(`${activities.length} activities added to Database`)

  } catch (err) {
    console.log('Something went wrong')
    console.log(err)
  } finally {
    await disconnectDb()
    console.log('Bye bye')
  }
}

seed()