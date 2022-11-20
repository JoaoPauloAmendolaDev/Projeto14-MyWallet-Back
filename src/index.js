import express from "express"
import cors from "cors"
import { extractCollection } from "./src/database/db"

const app = express()
app.use(express.json())
app.use(cors())

const port = process.env.PORT || 3333