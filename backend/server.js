import dotenv from "dotenv"
dotenv.config()
import express from "express"
import colors from "colors"

// Local Imports
import { mongooseConnect } from "./config/db.js"
import { errorHandler } from "./middleware/errorMiddleware.js"
import goalRoutes from "./routes/goalRoutes.js"

const port = process.env.PORT || 5000
const app = express()

// Enable parsing json body and urlencoded inputs
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Routes
app.use("/api/goals", goalRoutes)

// Overwrite default express error handling
app.use(errorHandler)

// Start the server
app.listen(port, () => console.log(`Server started on port ${port}`))
