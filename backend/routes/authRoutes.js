import express from "express"
import { Login, logOut, refreshToken } from "../controllers/authController.js"
const router = express.Router()

router.post('/login',Login)

router.post('/logout',logOut)

router.post('/refreshToken',refreshToken)

export default router