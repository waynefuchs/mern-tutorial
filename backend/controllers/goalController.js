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
export const getGoal = asyncHandler(async (req, res) => {
  //TODO: Delete this(?)
  res.status(200).json({ message: `Get goal ${req.params.id}` })
})

// @desc    Set goal
// @route   POST /api/goals
// @access  Private
export const setGoal = asyncHandler(async (req, res) => {
  if (!req.body?.text) {
    res.status(400)
    throw new Error("A 'text' field is required")
  }

  const goal = await Goal.create({
    text: req.body.text,
  })

  res.status(200).json({ goal })
})

////////////////////////////////////////////////////////////////////////////////
// @desc    Update goal
// @route   PUT /api/goals/:id
// @access  Private
export const updateGoal = asyncHandler(async (req, res) => {
  // Get the goal from the db
  const goal = await Goal.findById(req.params.id)
  if (!goal) {
    res.status(400)
    throw new Eror("Goal not found")
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
  const goal = await Goal.findById(req.params.id)
  if (!goal) {
    res.status(400)
    throw new Error("Goal not found")
  }
  await goal.deleteOne()
  res.status(200).json({ id: req.params.id })
})
