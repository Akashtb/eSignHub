import express from "express"
import { createHod, deleteHod, updateHod, viewAllHod, viewHod } from "../controllers/hodController.js"
import { verifyPrincipal, verifyStaff } from "../middleware/token.js"
const router = express.Router()

router.post("/create",verifyPrincipal,createHod)
router.patch("/update/:id",verifyStaff,updateHod)
router.delete("/delete/:id",verifyPrincipal,deleteHod)
router.get("/viewAll",viewAllHod)
router.get("/view/:id",viewHod)


export default router