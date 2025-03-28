import express from "express"
import { createPrincipal, deletePrincipal, updatePrincipal, viewPrincipal } from "../controllers/principalController.js"
import { verifyPrincipal } from "../middleware/token.js"
const router = express.Router()

router.post('/create',createPrincipal)
router.get('/view/:id',verifyPrincipal,viewPrincipal)
router.delete('/delete/:id',deletePrincipal)
router.patch('/update/:id',verifyPrincipal,updatePrincipal)
export default router