import { NotFound } from "../lib/errors.js"
import Bird from "../models/bird.js"

export async function birdIndex(_req, res, next) {
  try {
    const birds = await Bird.find()
    return res.status(200).json(birds)
  } catch (err) {
    next(err)
  }
}

export async function birdShow(req, res, next) {
  try {
    const { id } = req.params
    const bird = await Bird.findById(id)
    if (bird) {
      return res.json(bird)
    } else {
      return res.status(404).json({ message: 'Bird not found' })
    }
  } catch (err) {
    next(err)
  }
}

export async function birdCreate(req, res, next) {
  try {
    const newBird = await Bird.create(req.body)
    return res.json(newBird)
  } catch (err) {
    next(err)
  }
}

export async function birdUpdate(req, res, next) {
  const { birdId } = req.params
  try {
    const foundBird = await Bird.findById(birdId)
    if (!foundBird) {
      throw new NotFound()
    }
    const updatedBird = await Bird.findByIdAndUpdate(birdId, req.body, { new: true })
    return res.status(200).json(updatedBird)
  } catch (err) {
    next(err)
  }
}

export async function birdDelete(req, res, next) {
  const { birdId } = req.params
  try {
    const foundBird = await Bird.findById(birdId)
    if (!foundBird) {
      throw new NotFound()
    }
    await Bird.findByIdAndDelete(birdId)
    return res.sendStatus(204)
  } catch (err) {
    next(err)
  }
}