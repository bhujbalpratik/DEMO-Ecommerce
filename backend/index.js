import express from "express"
import { connectDB } from "./config/db.js"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import userRouter from "./routes/user.routers.js"
import categoryRouter from "./routes/category.routers.js"
import { errorMiddleware } from "./middlewares/error.middleware.js"

dotenv.config({ path: "./backend/config/.env" })

connectDB()

const port = process.env.PORT
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use("/api/users", userRouter)
app.use("/api/category", categoryRouter)

app.use(errorMiddleware)
app.listen(port, () =>
  console.log(`server is working on http://localhost:${port}`)
)
