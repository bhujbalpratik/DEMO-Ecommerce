import { User } from "../models/user.models.js"
import asyncHandler from "../middlewares/async.handler.js"

const createUser = asyncHandler(async (req, res) => {
  res.send("Hello")
})

export { createUser }
