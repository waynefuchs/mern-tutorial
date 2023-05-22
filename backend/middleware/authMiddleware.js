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
      console.dir(decoded)
      req.user = await User.findById(decoded.id).select("-password")
      return next()
    } catch (err) {
      console.error("Caught Error", err)
      token = null
    }
  }

  // Failed Validation
  console.log("Validation Failed")
  res.status(401)
  throw new Error("Not authorized")
})
