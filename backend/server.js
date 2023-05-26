import path from "path"
import dotenv from "dotenv"
dotenv.config()
import express from "express"
import colors from "colors"

// Local Imports
import { mongooseConnect } from "./config/db.js"
import { errorHandler } from "./middleware/errorMiddleware.js"

// Initialization
mongooseConnect()

// if (!process) throw new Error("Process not found")
if (!process.env) throw new Error("Environment not found")
const port = process.env.PORT || 5000
const app = express()

// Enable parsing json body and urlencoded inputs
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Routes
import goalRoutes from "./routes/goalRoutes.js"
app.use("/api/goals", goalRoutes)
import userRoutes from "./routes/userRoutes.js"
app.use("/api/users", userRoutes)

// Production Mode
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "../frontend/build")))
//   app.get("*", (req, res) =>
//     res.sendFile(
//       path.resolve(__dirname, "../", "frontend", "build", "index.html")
//     )
//   )
// }

// Overwrite default express error handling
app.use(errorHandler)

// Start the server
app.listen(port, () =>
  console.log(
    "HTTP Server started on".padEnd(process.env.CONSOLE_TAB_SIZE, "."),
    `http://localhost:${port}`.cyan.underline
  )
)
