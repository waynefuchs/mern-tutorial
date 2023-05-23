import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import asyncHandler from "express-async-handler"
import User from "../models/mongo/user.mongo.model.js"

/////////////////////////////////////////////////////////////////////// REGISTER
// @desc    Register New User
// @route   POST /api/users
// @access  Public
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body
  if (!name || !email || !password) {
    res.status(400)
    throw new Error("Please include all fields (name, email, password)")
  }

  // Check if user exists
  const userExists = await User.findOne({ email })
  if (userExists) {
    res.status(400)
    throw new Error("User already exists")
  }

  // Create a salt
  const salt = await bcrypt.genSalt(10)

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, salt)

  // Create the user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  })

  // Fail "gracefully" if something goes wrong with the create
  if (!user) {
    res.status(400)
    throw new Error("Invalid user data")
  }

  // Return user data
  res.status(201).json(getUserObject(user))
})

////////////////////////////////////////////////////////////////////////// LOGIN
// @desc    Authenticate a User
// @route   POST /api/users/login
// @access  Public
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  // Throw an error as if the user just tried logging in
  // under all circumstances. (Ensure difficulty in diagnosing login issues)
  // Early out here to ensure the database isn't hit if invalid input is provided
  if (!email || !password) {
    res.status(400)
    throw new Error("Invalid credentials")
  }

  // Retrieve field based on email if email/password were provided
  const user = await User.findOne({ email })

  // Check password against stored hash
  if (!user || !(await bcrypt.compare(password, user.password))) {
    res.status(400)
    throw new Error("Invalid credentials")
  }

  // Successfully authenticated
  res.json(getUserObject(user))
})

//////////////////////////////////////////////////////////////////////// SESSION
// @desc    Get logged in user data
// @route   GET /api/session
// @access  Private
export const getSession = asyncHandler(async (req, res) => {
  res.json(getUserObject(req.user, false))
})

//////////////////////////////////////////////////////////////////////// UTILITY
// Generate JWT
const generateToken = (id) => {
  const { JWT_SECRET, JWT_EXPIRATION } = process.env
  if (!JWT_SECRET || !JWT_EXPIRATION)
    throw new Error("JWT Environment Not Found")
  return jwt.sign({ id }, JWT_SECRET, { expiresIn: JWT_EXPIRATION })
}

// Return User Object from Database
const getUserObject = (user, includeToken = true) => {
  if (!user || !user.id || !user.name || !user.email) return null
  const userObject = {
    _id: user.id,
    name: user.name,
    email: user.email,
  }
  if (includeToken) userObject.token = generateToken(user.id)
  return userObject
}
