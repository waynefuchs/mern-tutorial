import express from "express"
const router = express.Router()

import { protect } from "../middleware/authMiddleware.js"

import {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
} from "../controllers/goalController.js"

// Route is fully (auth) protected
router.use(protect)

// Routes
router.route("/").get(getGoals).post(setGoal)
router.route("/:id").put(updateGoal).delete(deleteGoal)

export default router
