import express from "express"
import path from "path"
import { connectDB } from "./config/db.js"
import { config } from "dotenv"
import cookieParser from "cookie-parser"
import userRouter from "./routes/user.routers.js"
import categoryRouter from "./routes/category.routers.js"
import productsRouter from "./routes/product.routers.js"
import uploadRouter from "./routes/upload.router.js"
import { errorMiddleware } from "./middlewares/error.middleware.js"

config({ path: "./backend/config/.env" })

connectDB()

const port = process.env.PORT
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use("/api/users", userRouter)
app.use("/api/category", categoryRouter)
app.use("/api/products", productsRouter)
app.use("/api/upload", uploadRouter)

const __dirname = path.resolve()
app.use("/uploads", express.static(path.join(__dirname + "/uploads")))
app.use(errorMiddleware)

app.listen(port, () =>
  console.log(`server is working on http://localhost:${port}`)
)
