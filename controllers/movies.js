import movieData from './data/movies.js'

export function movieIndex(_req, res, next) {
  try {
    return res.status(200).json(movieData)
  } catch (err) {
    next(err)
  }
}

export function movieShow(req, res, next) {
  try {
    const { id } = req.params
    const movie = movieData.find(movie => movie.id === parseInt(id))
    if (movie) {
      return res.status(200).json(movie)
    } else {
      return res.status(404).json({ message: 'Movie not found' })
    }
  } catch (err) {
    next(err)
  }
}