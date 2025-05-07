import { MissingBody } from './errors.js'

export default function enforceBody(req, res, next) {
  if (['POST', 'PUT', 'PATCH'].includes(req.method)){
    if (!req.body) {
      throw new MissingBody
    }
  }
  next()
}