import express from "express"
import { Login, logOut } from "../controllers/authController.js"
const router = express.Router()

router.post('/login',Login)

router.post('/logout',logOut)



export default router