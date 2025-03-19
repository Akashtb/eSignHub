import express from "express"
import { createHod, deleteHod, updateHod, viewAllHod, viewHod } from "../controllers/hodController.js"
import { verifyPrincipal, verifyStaff } from "../middleware/token.js"
const router = express.Router()

router.post("/create",verifyPrincipal,createHod)
router.patch("/update/:id",verifyStaff,updateHod)
router.delete("/delete/:id",verifyStaff,deleteHod)
router.get("/viewAll",verifyStaff,viewAllHod)
router.get("/view/:id",verifyStaff,viewHod)


export default router