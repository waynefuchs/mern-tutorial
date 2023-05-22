import express from "express"
const router = express.Router()

import { protect } from "../middleware/authMiddleware.js"

import {
  registerUser,
  loginUser,
  getSession,
} from "../controllers/userController.js"

router.post("/", registerUser)
router.post("/login", loginUser)
router.get("/session", protect, getSession)

export default router
