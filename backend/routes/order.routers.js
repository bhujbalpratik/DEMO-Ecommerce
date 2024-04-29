import express from "express"
import { createOrder } from "../controllers/order.controllers.js"
import { isAuthenticated, isAuthorizeAdmin } from "../utils/verifyUser.js"
import { errorHandler } from "../utils/errorHandler.js"

const router = express.Router()

router.route("/create").post(isAuthenticated, createOrder)

export default router
