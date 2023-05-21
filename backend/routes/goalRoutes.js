import express from "express"
const router = express.Router()

import {
  getGoals,
  getGoal,
  setGoal,
  updateGoal,
  deleteGoal,
} from "../controllers/goalController.js"

// Get all goals
router.get("/", getGoals)

// Get a goal
router.get("/:id", (req, res) => {
  res.status(200).json({ message: `Get goal ${req.params.id}` })
})

// Create a goal
router.post("/", setGoal)

// Update a goal
router.put("/:id", updateGoal)

// Delete a goal
router.delete("/:id", deleteGoal)

export default router
