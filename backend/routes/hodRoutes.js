import express from "express"
import { createHod, deleteHod, updateHod, viewAllHod, viewHod } from "../controllers/hodController.js"
const router = express.Router()

router.post("/create",createHod)
router.patch("/update/:id",updateHod)
router.delete("/delete/:id",deleteHod)
router.get("/viewAll",viewAllHod)
router.get("/view/:id",viewHod)


export default router