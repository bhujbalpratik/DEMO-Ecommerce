import express from "express"
import {
  createUser,
  getAllUsers,
  login,
  logout,
  updateUser,
} from "../controllers/user.controllers.js"
import { isAuthorizeAdmin, isAuthenticated } from "../utils/verifyUser.js"
const router = express.Router()

router.route("/").get(isAuthenticated, isAuthorizeAdmin, getAllUsers)
router.route("/new").post(createUser)
router.route("/login").post(login)
router.route("/logout").post(logout)
router.route("/update/:id").put(isAuthenticated, updateUser)

export default router
