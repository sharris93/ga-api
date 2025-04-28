import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  director: { type: String, required: true },
  year: { type: Number, required: true },
  genres: { type: [String], required: true }, // Array of strings
  rating: { type: Number, required: true },
}, {
  timestamps: true,
});

const Movie = mongoose.model('Movie', movieSchema);

export default Movie;
