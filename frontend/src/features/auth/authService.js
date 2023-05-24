// Set up HTTP requests to fetch data
import axios from "axios"

const API_URL = "/api/users/"

////////////////////////////////////////////////////////////////// REGISTER USER
const register = async (userData) => {
  const response = await axios.post(API_URL, userData)

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data))
  }

  return response.data
}

///////////////////////////////////////////////////////////////////// LOGIN USER
const login = async (userData) => {
  const response = await axios.post(`${API_URL}login`, userData)

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data))
  }

  return response.data
}

//////////////////////////////////////////////////////////////////// LOGOUT USER
const logout = () => {
  console.log("Logging out...")
  localStorage.removeItem("user")
  console.log("Loged out...")
}

const authService = {
  register,
  logout,
  login,
}

export default authService
