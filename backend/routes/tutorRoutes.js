import express from "express"
import { createTutor, deleteTutor, updateTutor, viewTutor } from "../controllers/tutorController.js"

const router = express.Router()

router.post('/create',createTutor)
router.patch('/update/:id',updateTutor)
router.delete('/delete/:id',deleteTutor)
router.get('/view/:id',viewTutor)
export default router