import { Forbidden } from "./errors.js"

export default function checkOwner(loggedInUser, object){
  if (!object.owner.equals(loggedInUser._id)) {
    throw new Forbidden()
  }
}