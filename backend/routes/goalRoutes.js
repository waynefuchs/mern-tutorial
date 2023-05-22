import express from "express"
const router = express.Router()

import { protect } from "../middleware/authMiddleware.js"

import {
  getGoals,
  getGoal,
  setGoal,
  updateGoal,
  deleteGoal,
} from "../controllers/goalController.js"

// Route is fully (auth) protected
router.use(protect)

// Routes
router.route("/").get(getGoals).post(setGoal)
router.route("/:id").get(getGoal).put(updateGoal).delete(deleteGoal)

export default router
