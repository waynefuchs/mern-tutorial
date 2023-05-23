import asyncHandler from "express-async-handler"
import Goal from "../models/mongo/goal.mongo.model.js"

/////////////////////////////////////////////////////////////////////////// READ
// @desc    Get goals
// @route   GET /api/goals
// @access  Private
export const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id })
  res.status(200).json(goals)
})

///////////////////////////////////////////////////////////////////////// CREATE
// @desc    Set goal
// @route   POST /api/goals
// @access  Private
export const setGoal = asyncHandler(async (req, res) => {
  const text = req.body?.text
  const user = req.user?.id

  // The text field is required to create a new goal with this text field.......
  if (!text) {
    res.status(400)
    throw new Error("A 'text' field is required")
  }

  // Create the goal and return it
  const goal = await Goal.create({ text, user })
  res.status(200).json(goal)
})

///////////////////////////////////////////////////////////////////////// UPDATE
// @desc    Update goal
// @route   PUT /api/goals/:id
// @access  Private
export const updateGoal = asyncHandler(async (req, res) => {
  const user = req.user?.id

  // Get the goal from the db, throw an error if it doesn't exist
  const goal = await Goal.findById(req.params.id)
  if (!goal) {
    res.status(400)
    throw new Error("Goal not found")
  }

  // Ensure the user matches the userId in the queried goal
  if (user !== goal.user.toString()) {
    res.status(401)
    throw new Error("User not authorized")
  }

  // Update the goal and return it
  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })
  res.status(200).json(updatedGoal)
})

///////////////////////////////////////////////////////////////////////// DELETE
// @desc    Delete goal
// @route   DELETE /api/goals/:id
// @access  Private
export const deleteGoal = asyncHandler(async (req, res) => {
  const userId = req.user?.id

  // Get the goal from the db, throw an error if it doesn't exist
  const goal = await Goal.findById(req.params.id)
  if (!goal) {
    res.status(400)
    throw new Error("Goal not found")
  }

  // Ensure the user matches the userId in the queried goal
  if (userId !== goal.user.toString()) {
    res.status(401)
    throw new Error("User not authorized")
  }

  // Delete the goal and return deleted id
  await goal.deleteOne()
  res.status(200).json({ id: req.params.id })
})
