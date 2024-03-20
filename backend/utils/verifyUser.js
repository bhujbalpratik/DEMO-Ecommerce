import jwt from "jsonwebtoken"
import { errorHandler } from "./errorHandler.js"
import { User } from "../models/user.models.js"

export const isAuthenticated = (req, res, next) => {
  const token = req.cookies.token
  if (!token) return next(errorHandler(400, "You should login first"))

  jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
    if (err) return next(errorHandler(500, "Token is not valid"))
    req.user = await User.findById(user.id).select("-password")
    next()
  })
}

export const isAuthorizeAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) next()
  else return next(errorHandler(401, "Not authorized as an admin"))
}
