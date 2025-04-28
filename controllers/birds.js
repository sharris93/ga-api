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
      return res.status(200).json(bird)
    } else {
      return res.status(404).json({ message: 'Bird not found' })
    }
  } catch (err) {
    next(err)
  }
}