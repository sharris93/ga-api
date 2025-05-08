import checkOwner from '../lib/checkOwner.js'
import { NotFound } from '../lib/errors.js'
import Movie from '../models/movie.js'

export async function movieIndex(_req, res, next) {
  try {
    const movies = await Movie.find()
    return res.status(200).json(movies)
  } catch (err) {
    next(err)
  }
}

export async function movieSuggestions(req, res, next) {
  try {
    const regex = new RegExp(req.query.q, 'i')

    const movies = await Movie.find({
      $or: [
        { title: { $regex: regex } }
      ]
    })

    return res.json(movies.map(movie => movie.title))
  } catch (err) {
    next(err)
  }
}

export async function movieSearch(req, res, next) {
  try {
    const regex = new RegExp(req.query.q, 'i')

    const movies = await Movie.find({
      $or: [
        { title: { $regex: regex } },
        { director: { $regex: regex } },
        { genres: { $regex: regex } }, // Add more as needed
      ]
    })

    return res.status(200).json(movies)
  } catch (err) {
    next(err)
  }
}

export async function movieShow(req, res, next) {
  try {
    const { movieId } = req.params
    const movie = await Movie.findById(movieId)
    if (movie) {
      return res.status(200).json(movie)
    } else {
      return res.status(404).json({ message: 'Movie not found' })
    }
  } catch (err) {
    next(err)
  }
}

export async function movieCreate(req, res, next) {
  try {
    const newMovie = await Movie.create(req.body)
    return res.json(newMovie)
  } catch (err) {
    next(err)
  }
}

export async function movieUpdate(req, res, next) {
  const { movieId } = req.params
  try {
    const foundMovie = await Movie.findById(movieId)
    if (!foundMovie) {
      throw new NotFound()
    }
    checkOwner(req.user, foundMovie)
    const updatedMovie = await Movie.findByIdAndUpdate(movieId, req.body, { new: true })
    return res.status(200).json(updatedMovie)
  } catch (err) {
    next(err)
  }
}

export async function movieDelete(req, res, next) {
  const { movieId } = req.params
  try {
    const foundMovie = await Movie.findById(movieId)
    if (!foundMovie) {
      throw new NotFound()
    }
    checkOwner(req.user, foundMovie)
    await Movie.findByIdAndDelete(movieId)
    return res.sendStatus(204)
  } catch (err) {
    next(err)
  }
}