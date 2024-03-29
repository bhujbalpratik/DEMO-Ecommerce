import express from "express"
import formidable from "express-formidable"
import { isAuthenticated, isAuthorizeAdmin } from "../utils/verifyUser.js"
import checkId from "../middlewares/checkId.js"
import {
  addProduct,
  updateProductDetails,
  removeProduct,
  fetchAllProducts,
  fetchProducts,
  fetchTopProducts,
  fetchProductById,
  addProductReview,
} from "../controllers/product.controllers.js"
const router = express.Router()
router
  .route("/create")
  .post(isAuthenticated, isAuthorizeAdmin, formidable(), addProduct)

router
  .route("/update/:id")
  .put(isAuthenticated, isAuthorizeAdmin, formidable(), updateProductDetails)

router
  .route("/delete/:id")
  .delete(isAuthenticated, isAuthorizeAdmin, removeProduct)

router.route("/").get(fetchProducts)

router.get("/top", fetchTopProducts)

router.get("/new", fetchTopProducts)

router.route("/allproducts").get(fetchAllProducts)

router.route("/:id").get(fetchProductById)
router.route("/:id/reviews").post(isAuthenticated, checkId, addProductReview)

export default router
