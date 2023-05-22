import jwt from "jsonwebtoken"
import asyncHandler from "express-async-handler"
import User from "../models/mongo/user.mongo.model.js"

export const protect = asyncHandler(async (req, res, next) => {
  let token
  const { JWT_SECRET, JWT_EXPIRATION } = process.env
  if (!JWT_SECRET || !JWT_EXPIRATION)
    throw new Error("JWT Environment Not Found")

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1]
      const decoded = jwt.verify(token, JWT_SECRET)
      req.user = await User.findById(decoded.id).select("-password")
      return next()
    } catch (err) {
      // TODO: This should not be in production (very useful for debugging)
      throw new Error("Caught authorization error", err)
    }
  }

  // Failed Validation
  res.status(401)
  throw new Error("Not authorized")
})
