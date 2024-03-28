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

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET)

    res
      .status(201)
      .cookie("token", token, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
      })
      .json({
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      })
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
  console.log(req.params.id)
  if (req.params.id !== req.user.id)
    return next(errorHandler(400, "Unauthorized to update user"))

  try {
    if (req.body.password)
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

export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(403, "You can delete only your account"))

  try {
    await User.findByIdAndDelete(req.params.id)
    res.status(200).json({ success: true, message: "User has been deleted" })
  } catch (error) {
    next(error)
  }
}

// Admin API
export const deleteUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)

    if (user) {
      if (user.isAdmin) {
        return next(errorHandler(400, "Cannot delete admin"))
      }

      await User.findByIdAndDelete(req.params.id)
      res.json({ message: "User removed" })
    } else {
      return next(errorHandler(404, "User not found."))
    }
  } catch (error) {
    next(error)
  }
}
export const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select("-password")

    if (user) {
      res.json(user)
    } else {
      return next(errorHandler(404, "User not found."))
    }
  } catch (error) {
    next(error)
  }
}
export const updateUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)

    if (user) {
      if (user.isAdmin) {
        return next(errorHandler(400, "Cannot edit admin details"))
      }
      user.username = req.body.username || user.username
      user.email = req.body.email || user.email
      user.isAdmin = Boolean(req.body.isAdmin)

      const updatedUser = await user.save()

      res.json({
        _id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
      })
    } else {
      return next(errorHandler(404, "User not found."))
    }
  } catch (error) {
    next(error)
  }
}
