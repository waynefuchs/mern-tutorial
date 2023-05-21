import express from "express"
const router = express.Router()

import {
  getGoals,
  getGoal,
  setGoal,
  updateGoal,
  deleteGoal,
} from "../controllers/goalController.js"

router.route("/").get(getGoals).post(setGoal)
router.route("/:id").get(getGoal).put(updateGoal).delete(deleteGoal)

export default router
