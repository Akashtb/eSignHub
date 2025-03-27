import express from "express"
import { createTutor, deleteTutor, updateTutor, viewAllTutors, viewTutor } from "../controllers/tutorController.js"
import { verifyPrincipal, verifyStaff } from "../middleware/token.js"

const router = express.Router()

router.post('/create',createTutor)
router.patch('/update/:id',updateTutor)
router.delete('/delete/:id',verifyPrincipal,deleteTutor)
router.get('/view/:id',verifyStaff,viewTutor)
router.get('/viewAll',viewAllTutors)
export default router