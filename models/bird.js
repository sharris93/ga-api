import mongoose from 'mongoose';

const birdSchema = new mongoose.Schema({
  species: { type: String, required: true },
  subspecies: { type: String },
  habitat: { type: String },
  color: { type: String },
  size: { type: String },
  diet: { type: String },
  owner: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
}, {
  timestamps: true,
});

const Bird = mongoose.model('Bird', birdSchema);

export default Bird;