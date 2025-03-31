import express from "express"
import { createStudent, deleteStudent, getRecentStudents, updateStudent, viewAllStudent, viewStudent } from "../controllers/studentController.js"
import {  verifyStaff, verifyStudent } from "../middleware/token.js"
const router = express.Router()

router.post('/create',createStudent)
router.get('/view/:id',viewStudent)
router.delete('/delete/:id',verifyStaff,deleteStudent)
router.patch('/update/:id',verifyStudent,updateStudent)
router.get('/viewAll',viewAllStudent)
router.get('/recentStudent',getRecentStudents)
 

export default router