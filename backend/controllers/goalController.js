// @desc    Get goals
// @route   GET /api/goals
// @access  Private
export const getGoals = (req, res) => {
  res.status(200).json({ message: "Get Goals from goalRoutes.js" })
}

// @desc    Get goal
// @route   GET /api/goals/:id
// @access  Private
export const getGoal = (req, res) => {
  res.status(200).json({ message: `Get goal ${req.params.id}` })
}

// @desc    Set goal
// @route   POST /api/goals
// @access  Private
export const setGoal = (req, res) => {
  res.status(200).json({ message: "Set Goal" })
}

// @desc    Update goal
// @route   PUT /api/goals/:id
// @access  Private
export const updateGoal = (req, res) => {
  res.status(200).json({ message: `Update goal ${req.params.id}` })
}

// @desc    Delete goal
// @route   DELETE /api/goals/:id
// @access  Private
export const deleteGoal = (req, res) => {
  res.status(200).json({ message: `Delete goal ${req.params.id}` })
}
