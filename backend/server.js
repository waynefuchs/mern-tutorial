import dotenv from "dotenv"
dotenv.config()
import express from "express"

import goalRoutes from "./routes/goalRoutes.js"

const port = process.env.PORT || 5000
const app = express()

app.use("/api/goals", goalRoutes)

app.listen(port, () => console.log(`Server started on port ${port}`))
