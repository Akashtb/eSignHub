import express from "express"
import { createStudent, deleteStudent, updateStudent, viewAllStudent, viewStudent } from "../controllers/studentController.js"
import {  verifyStaff, verifyStudent } from "../middleware/token.js"
const router = express.Router()

router.post('/create',createStudent)
router.get('/view/:id',verifyStudent,viewStudent)
router.delete('/delete/:id',verifyStaff,deleteStudent)
router.patch('/update/:id',verifyStaff,updateStudent)
router.get('/viewAll',verifyStaff,viewAllStudent)


export default router