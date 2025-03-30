import express from "express"
import { approveRequestLetter, createRequestLetter, deleteRequestLetter, getLetterRecipients, getListOfUnseenRequestLetters, listOfSentRequestLetter, markRequestLetterAsSeen, receviedRequestLetter, rejectRequestLetter, updateRequestLetter, viewAllRequestLetter, viewRequestLetter } from "../controllers/requestLetterController.js"
import {verifyPrincipal, verifyStaff, verifyStudent } from "../middleware/token.js"
const router = express.Router()

router.post('/create',verifyStudent,createRequestLetter)//
router.get('/view/:id',verifyStudent,viewRequestLetter)//
router.get('/viewAll',verifyStudent,viewAllRequestLetter)//
router.delete('/delete/:id',verifyStudent,deleteRequestLetter)//
router.get('/recipientList',verifyStudent,getLetterRecipients)//
// router.patch('/update/:id',verifyStudent,updateRequestLetter)//
router.get('/listOfRecevied',verifyStaff,receviedRequestLetter)// 
// router.get('/listOfSentLetterByUser',verifyStudent,listOfSentRequestLetter)//
router.patch('/approveRequestLetter/:id',verifyStaff,approveRequestLetter)//
router.patch('/rejectRequestLetter/:id',verifyStaff,rejectRequestLetter)
router.patch('/markRequestLetterAsSeen/:id',verifyStaff,markRequestLetterAsSeen)//
router.get('/listForNotification',verifyStaff,getListOfUnseenRequestLetters)//

export default router