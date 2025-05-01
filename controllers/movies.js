import Movie from '../models/movie.js'

export async function movieIndex(_req, res, next) {
  try {
    const movies = await Movie.find()
    return res.status(200).json(movies)
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
        { year: { $regex: regex } },
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
    const { id } = req.params
    const movie = await Movie.findById(id)
    if (movie) {
      return res.status(200).json(movie)
    } else {
      return res.status(404).json({ message: 'Movie not found' })
    }
  } catch (err) {
    next(err)
  }
}