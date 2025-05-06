import { NotFound, Unauthorized, AlreadyExists } from '../lib/errors.js'

import { Activity } from '../models/Trips/trip.js'

export async function activityIndex(_req, res, next) {
  try {
    const activities = await Activity.find()
    return res.json(activities)
  } catch (err) {
    next(err)
  }
}

export async function activityCreate(req, res, next) {
  try {
    const newActivity = await Activity.create(req.body)
    return res.json(newActivity)
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

export async function activityUpdate(req, res, next) {
  const { activityId } = req.params
  try {
    const foundActivity = await Activity.findById(activityId)
    if (!foundActivity) {
      throw new NotFound()
    }
    const updatedActivity = await Activity.findByIdAndUpdate(activityId, req.body, { new: true })
    return res.status(200).json(updatedActivity)
  } catch (err) {
    next(err)
  }
}

export async function activityDelete(req, res, next) {
  const { activityId } = req.params
  try {
    const foundActivity = await Activity.findById(activityId)
    if (!foundActivity) {
      throw new NotFound()
    }
    await Activity.findByIdAndDelete(activityId)
    return res.sendStatus(204)
  } catch (err) {
    next(err)
  }
}