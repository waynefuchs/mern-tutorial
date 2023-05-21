import dotenv from "dotenv"
dotenv.config()
import express from "express"

import goalRoutes from "./routes/goalRoutes.js"

const port = process.env.PORT || 5000
const app = express()

// Enable parsing json body and urlencoded inputs
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Routes
app.use("/api/goals", goalRoutes)

// Start the server
app.listen(port, () => console.log(`Server started on port ${port}`))
