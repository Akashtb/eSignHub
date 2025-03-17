import express from "express"
import { createPrincipal, deletePrincipal, updatePrincipal, viewPrincipal } from "../controllers/principalController.js"
const router = express.Router()

router.post('/create',createPrincipal)
router.get('/view/:id',viewPrincipal)
router.delete('/delete/:id',deletePrincipal)
router.patch('/update/:id',updatePrincipal)
export default router