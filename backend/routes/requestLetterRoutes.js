import express from "express"
import { approveRequestLetter, createRequestLetter, deleteRequestLetter, getListOfUnseenRequestLetters, listOfSentRequestLetter, markRequestLetterAsSeen, receviedRequestLetter, rejectRequestLetter, updateRequestLetter, viewAllRequestLetter, viewRequestLetter } from "../controllers/requestLetterController.js"
import {verifyPrincipal, verifyStaff, verifyStudent } from "../middleware/token.js"
const router = express.Router()

router.post('/create',verifyStudent,createRequestLetter)//
router.get('/view/:id',verifyStudent,viewRequestLetter)//
router.get('/viewAll',verifyPrincipal,viewAllRequestLetter)//
router.delete('/delete/:id',verifyStudent,deleteRequestLetter)//
router.patch('/update/:id',verifyStudent,updateRequestLetter)//
router.get('/listForPrincipal',verifyStaff,receviedRequestLetter)//
router.get('/listOfSentLetterByUser',verifyStudent,listOfSentRequestLetter)//
router.get('/approveRequestLetter/:id',verifyStaff,approveRequestLetter)//
router.get('/approveRequestLetter',verifyStaff,approveRequestLetter)//
router.get('/rejectRequestLetter/:id',verifyStaff,rejectRequestLetter)
router.get('/markRequestLetterAsSeen/:id',verifyStaff,markRequestLetterAsSeen)//
router.get('/getListOfUnseenRequestLetters',verifyStaff,getListOfUnseenRequestLetters)//
router.get('/listForNotification',verifyStaff,getListOfUnseenRequestLetters)//

export default router