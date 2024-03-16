import path from "path"
import express from "express"
import { connectDB } from "./config/db.js"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"

dotenv.config({ path: "./backend/config/.env" })

connectDB()

const port = process.env.PORT
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.get("/", (req, res) => res.send("hello,Everything is working "))

app.listen(port, () =>
  console.log(`server is working on http://localhost:${port}`)
)
