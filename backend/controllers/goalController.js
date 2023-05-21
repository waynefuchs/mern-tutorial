import asyncHandler from "express-async-handler"
import Goal from "../models/mongo/goal.mongo.model.js"

// @desc    Get goals
// @route   GET /api/goals
// @access  Private
export const getGoals = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Get Goals from goalRoutes.js" })
})

// @desc    Get goal
// @route   GET /api/goals/:id
// @access  Private
export const getGoal = asyncHandler(async (req, res) => {
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
  res.status(200).json({ message: "Set Goal" })
})

// @desc    Update goal
// @route   PUT /api/goals/:id
// @access  Private
export const updateGoal = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Update goal ${req.params.id}` })
})

// @desc    Delete goal
// @route   DELETE /api/goals/:id
// @access  Private
export const deleteGoal = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Delete goal ${req.params.id}` })
})
