import { connectToDb, truncateDb, disconnectDb } from './helpers.js'

// Models
import Event from '../models/event.js'
import User from '../models/user.js'
import Bird from '../models/bird.js'
import Movie from '../models/movie.js'

// Data
import eventData from './data/events.js'
import birdData from './data/birds.js'
import movieData from './data/movies.js'

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

    eventData.forEach(event => {
      event.owner = user
    })

    const events = await Event.create(eventData)

    console.log(`${events.length} events added to Database`)
    
    const movies = await Movie.create(movieData)
    console.log(`${movies.length} movies added to Database`)
    
    const birds = await Bird.create(birdData)
    console.log(`${birds.length} birds added to Database`)
    

  } catch (err) {
    console.log('Something went wrong')
    console.log(err)
  }

  await disconnectDb()
  console.log('Bye bye')
}

seed()