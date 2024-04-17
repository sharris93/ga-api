import mongoose from 'mongoose'
import mongooseUniqueValidator from 'mongoose-unique-validator'

const eventSchema = new mongoose.Schema({
  eventName: { type: String, required: true },
  date: { type: String, required: true },
  location: { type: String, required: true },
  image: { type: String, required: true },
  categories: [String],
  owner: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
})

eventSchema.plugin(mongooseUniqueValidator)

export default mongoose.model('Event', eventSchema)