import express from "express"
import { createPrincipal, deletePrincipal, eachDepartmentTotalStudent, totalEachUser, updatePrincipal, viewPrincipal } from "../controllers/principalController.js"
import { verifyPrincipal ,verifyStaff} from "../middleware/token.js"
const router = express.Router()

router.post('/create',createPrincipal)
router.get('/view/:id',verifyPrincipal,viewPrincipal)
router.delete('/delete/:id',deletePrincipal)
router.patch('/update/:id',verifyPrincipal,updatePrincipal)
router.get('/totalEachUser',verifyStaff,totalEachUser)
router.get('/departmentWise',verifyStaff,eachDepartmentTotalStudent)
export default router