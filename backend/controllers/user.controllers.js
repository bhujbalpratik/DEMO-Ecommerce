import { User } from "../models/user.models.js"
import { errorHandler } from "../utils/errorHandler.js"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
export const createUser = async (req, res, next) => {
  const { username, email, password } = req.body

  const user = await User.findOne({ $or: [{ email }, { username }] })
  if (user) return next(errorHandler(400, "User already exist"))

  const hashedPassword = bcryptjs.hashSync(password, 10)

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  })

  try {
    await newUser.save()
    res.status(201).json({ message: "User Created Successfully" })
  } catch (error) {
    next(error)
  }
}

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const validUser = await User.findOne({ email })
    if (!validUser) return next(errorHandler(400, "Invalid email and password"))

    const validPassword = bcryptjs.compareSync(password, validUser.password)
    if (!validPassword)
      return next(errorHandler(400, "Invalid email and password"))

    const { password: hashedPassword, ...rest } = validUser._doc

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET)
    res
      .status(201)
      .cookie("token", token, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
      })
      .json(rest)
  } catch (error) {
    next(error)
  }
}

export const logout = async (req, res, next) => {
  try {
    res.clearCookie("token").json({ mssage: "User logout successsfully" })
  } catch (error) {
    next(error)
  }
}

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({})
    res.json(users)
  } catch (error) {
    next(error)
  }
}

export const updateUser = async (req, res, next) => {
  if (req.params.id !== req.user.id)
    return next(errorHandler(400, "Unauthorized to update user"))
  try {
    if (
      req.body.username.trim() ||
      req.body.email.trim() ||
      req.body.password.trim() === ""
    )
      return next(errorHandler(401, "fields can't be empty"))
    const userName = await User.findOne({ username: req.body.username || "" })
    const userEmail = await User.findOne({ email: req.body.email || "" })

    if (userName) return next(errorHandler(500, "username already existed"))

    if (userEmail) return next(errorHandler(500, "user already existed"))

    req.body.password = bcryptjs.hashSync(req.body.password, 10)

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
        },
      },
      { new: true }
    )
    const { password, ...rest } = updatedUser._doc
    res.status(200).json(rest)
  } catch (error) {
    next(error)
  }
}
