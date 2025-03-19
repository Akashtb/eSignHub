import express from "express"
import { createTutor, deleteTutor, updateTutor, viewAllTutors, viewTutor } from "../controllers/tutorController.js"
import { verifyPrincipal, verifyStaff } from "../middleware/token.js"

const router = express.Router()

router.post('/create',verifyPrincipal,createTutor)
router.patch('/update/:id',verifyStaff,updateTutor)
router.delete('/delete/:id',verifyPrincipal,deleteTutor)
router.get('/view/:id',verifyStaff,viewTutor)
router.get('/viewAll',verifyStaff,viewAllTutors)
export default router