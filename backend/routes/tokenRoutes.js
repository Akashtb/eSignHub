import express from "express"
const router = express.Router()


router.post('/accessToken',(req,res)=>{
    console.log("accessToken");
})

router.post('/refreshToken',(req,res)=>{
    console.log("refreshToken");
})


export default router
