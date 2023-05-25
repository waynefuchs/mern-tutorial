import axios from "axios"

////////////////////////////////////////////////////////////////////// API ROUTE
const API_URL = "api/goals/"

//////////////////////////////////////////////////////////////////// CREATE GOAL
const createGoal = async (goalData, token) => {
  const response = await axios.post(API_URL, goalData, getConfig(token))
  return response.data
}

///////////////////////////////////////////////////////////////// GET USER GOALS
const getGoals = async (token) => {
  const response = await axios.get(API_URL, getConfig(token))
  return response.data
}

//////////////////////////////////////////////////////////////////// DELETE GOAL
const deleteGoal = async (id, token) => {
  const response = await axios.delete(`${API_URL}/${id}`, getConfig(token))
  return response.data
}

///////////////////////////////////////////////////////////////////////// HELPER
const getConfig = (token) => ({ headers: { Authorization: `Bearer ${token}` } })

//////////////////////////////////////////////////////////////////////// EXPORTS
const goalService = { createGoal, getGoals, deleteGoal }
export default goalService
