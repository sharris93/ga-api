import mongoose from 'mongoose'

const activitySchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxlength: 100 },
  description: { type: String, trim: true, maxlength: 1000 },
  location: { type: String, required: true },
  activityType: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ActivityType' }],
  tags: [String],
  duration: { type: Number, min: 0 },
  images: [String],
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true })

const typeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  emoji: { type: String, required: true },
  description: { type: String, required: true }
})

const tripSchema = new mongoose.Schema({
  name: { type: String, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  attendees: [{ type: mongoose.Schema.ObjectId, ref: 'User', required: true }],
  activities: [{ type: mongoose.Schema.ObjectId, ref: 'Activity', required: true }]
})

export const Activity = mongoose.model('Activity', activitySchema)
export const ActivityType = mongoose.model('ActivityType', typeSchema)
export const Trip = mongoose.model('Trip', tripSchema)