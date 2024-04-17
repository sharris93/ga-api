import { NotFound, Unauthorized, OhNoYouDidnt, AlreadyExists } from '../lib/errors.js'

import Event from '../models/event.js'

export async function eventIndex(_req, res, next) {
  try {
    const events = await Event.find().populate('owner')
    return res.status(200).json(events)
  } catch (err) {
    next(err)
  }
}

export async function eventCreate(req, res, next) {
  const { currentUserId } = req
  
  try {
    const existingEvent = await Event.findOne({ name: req.body.name })

    if(existingEvent) throw new AlreadyExists

    const createdEvent = await Event.create({
      ...req.body,
      owner: currentUserId,
    })
    
    return res.status(201).json(createdEvent)
  } catch (err) {
    next(err)
  }
}

export async function eventShow(req, res, next) {
  const { eventId } = req.params
  try {
    const foundEvent = await Event.findById(eventId)
      .populate('owner')
      .populate('comments.owner')

    if (!foundEvent) {
      throw new NotFound
    }
    return res.status(200).json(foundEvent)
  } catch (err) {
    next(err)
  }
}

export async function eventEdit(req, res, next) {
  const { eventId } = req.params
  const { currentUserId } = req
  try {
    const eventToUpdate = await Event.findById(eventId)
    if (!eventToUpdate) {
      throw new NotFound
    }
    if (!eventToUpdate.addedBy.equals(currentUserId)) {
      throw new Unauthorized
    }
    Object.assign(eventToUpdate, req.body)
    await eventToUpdate.save()
    return res.status(202).json(eventToUpdate)
  } catch (err) {
    next(err)
  }
}

export async function eventDelete(req, res, next) {
  const { eventId } = req.params
  const { currentUserId } = req
  try {
    const eventToDelete = await Event.findById(eventId)
    if (!eventToDelete) {
      throw new NotFound
    }
    if (!eventToDelete.owner.equals(currentUserId)) {
      throw new Unauthorized
    }
    await eventToDelete.remove()
    return res.sendStatus(204)
  } catch (err) {
    next(err)
  }
}