import mongoose from 'mongoose';

const birdSchema = new mongoose.Schema({
  species: { type: String, required: true },
  subspecies: { type: String },
  habitat: { type: String },
  color: { type: String },
  size: { type: String },
  diet: { type: String },
}, {
  timestamps: true,
});

const Bird = mongoose.model('Bird', birdSchema);

export default Bird;