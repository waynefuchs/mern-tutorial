import asyncHandler from "express-async-handler"
import Goal from "../models/mongo/goal.mongo.model.js"

////////////////////////////////////////////////////////////////////////////////
// @desc    Get goals
// @route   GET /api/goals
// @access  Private
export const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id })
  res.status(200).json({ goals })
})

////////////////////////////////////////////////////////////////////////////////
// @desc    Get goal
// @route   GET /api/goals/:id
// @access  Private
// @TODO:   Delete this(?) I don't think this is useful to anyone
export const getGoal = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Get goal ${req.params.id}` })
})

////////////////////////////////////////////////////////////////////////////////
// @desc    Set goal
// @route   POST /api/goals
// @access  Private
export const setGoal = asyncHandler(async (req, res) => {
  const text = req.body?.text
  const user = req.user?.id
  if (!text) {
    res.status(400)
    throw new Error("A 'text' field is required")
  }

  const goalObject = { text, user }
  const goal = await Goal.create(goalObject)

  console.log("------------------------------------------")
  console.warn(goalObject)
  console.log(goal)
  res.status(200).json({ goal })
})

////////////////////////////////////////////////////////////////////////////////
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

  // Ensure the user matches
  if (user !== goal.user.toString()) {
    res.status(401)
    throw new Error("User not authorized")
  }

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })

  res.status(200).json({ updatedGoal })
})

////////////////////////////////////////////////////////////////////////////////
// @desc    Delete goal
// @route   DELETE /api/goals/:id
// @access  Private
export const deleteGoal = asyncHandler(async (req, res) => {
  const user = req.user?.id

  // Get the goal from the db, throw an error if it doesn't exist
  const goal = await Goal.findById(req.params.id)
  if (!goal) {
    res.status(400)
    throw new Error("Goal not found")
  }

  // Ensure the user matches
  if (user !== goal.user.toString()) {
    res.status(401)
    throw new Error("User not authorized")
  }

  await goal.deleteOne()
  res.status(200).json({ id: req.params.id })
})
