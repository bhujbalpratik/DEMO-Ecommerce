import express from "express"
import {
  createUser,
  deleteUser,
  getAllUsers,
  login,
  logout,
  updateUser,
  deleteUserById,
  getUserById,
  updateUserById,
} from "../controllers/user.controllers.js"
import { isAuthorizeAdmin, isAuthenticated } from "../utils/verifyUser.js"
const router = express.Router()

router.route("/").get(isAuthenticated, isAuthorizeAdmin, getAllUsers)
router.route("/new").post(createUser)
router.route("/login").post(login)
router.route("/logout").post(logout)
router.route("/update/:id").put(isAuthenticated, updateUser)
router.route("/delete/:id").delete(isAuthenticated, deleteUser)

//Admin Api
router
  .route("/:id")
  .delete(isAuthenticated, isAuthorizeAdmin, deleteUserById)
  .get(isAuthenticated, isAuthorizeAdmin, getUserById)
  .put(isAuthenticated, isAuthorizeAdmin, updateUserById)

export default router
