import { NotFound, Unauthorized, AlreadyExists } from '../lib/errors.js'

import { Activity } from '../models/Trips/trip.js'

export async function activityIndex(_req, res, next) {
  try {
    const activities = await Activity.find()
    return res.status(200).json(activities)
  } catch (err) {
    next(err)
  }
}

export async function activityShow(req, res, next) {
  const { activityId } = req.params
  try {
    const foundActivity = await Activity.findById(activityId)
    if (!foundActivity) {
      throw new NotFound()
    }
    return res.status(200).json(foundActivity)
  } catch (err) {
    next(err)
  }
}