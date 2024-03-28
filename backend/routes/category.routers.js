import express from "express"
import {
  createCategory,
  deleteCategory,
  listCategory,
  updateCategory,
  readCategory,
} from "../controllers/category.controllers.js"
import { isAuthenticated, isAuthorizeAdmin } from "../utils/verifyUser.js"

const router = express.Router()

router.route("/new").post(isAuthenticated, isAuthorizeAdmin, createCategory)
router
  .route("/update/:categoryId")
  .put(isAuthenticated, isAuthorizeAdmin, updateCategory)

router
  .route("/delete/:categoryId")
  .delete(isAuthenticated, isAuthorizeAdmin, deleteCategory)

router.route("/categories").get(listCategory)
router.route("/:id").get(readCategory)
export default router
