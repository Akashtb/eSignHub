import express from "express"
import { createPrincipal, deletePrincipal } from "../controllers/principalController.js"
const router = express.Router()

router.post('/create',createPrincipal)
router.delete('/delete/:id',deletePrincipal)
export default router