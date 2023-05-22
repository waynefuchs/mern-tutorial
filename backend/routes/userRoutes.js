import express from "express"
const router = express.Router()

import {
  registerUser,
  loginUser,
  getSession,
} from "../controllers/userController.js"

router.post("/", registerUser)
router.post("/login", loginUser)
router.get("/session", getSession)

export default router
