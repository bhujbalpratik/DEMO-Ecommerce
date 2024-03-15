import path from "path"
import express from "express"
import { connectDB } from "./config/db.js"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"

dotenv.config()

connectDB()
