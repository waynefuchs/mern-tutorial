import dotenv from "dotenv"
dotenv.config()
import express from "express"

const port = process.env.PORT || 5000
const app = express()

app.get("/api/goals", (req, res) => {
  res.status(200).json({ message: "Get goals" })
})

app.listen(port, () => console.log(`Server started on port ${port}`))
