import express from "express"
import { createStudent, deleteStudent, updateStudent, viewAllStudent, viewStudent } from "../controllers/studentController.js"
import {  verifyStaff, verifyStudent } from "../middleware/token.js"
const router = express.Router()

router.post('/create',createStudent)
router.get('/view/:id',viewStudent)
router.delete('/delete/:id',verifyStaff,deleteStudent)
router.patch('/update/:id',updateStudent)
router.get('/viewAll',viewAllStudent)


export default router