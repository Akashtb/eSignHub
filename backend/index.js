import express from "express"
import dotenv from "dotenv"
import connect from "./db.js"
import authRoute from "./routes/authRoutes.js"
import principalRoutes from "./routes/principalRoutes.js"
import tutorRoutes from "./routes/tutorRoutes.js"
import hodRoutes from "./routes/hodRoutes.js"
import studentRoutes from "./routes/studentRoutes.js"
const app = express()


dotenv.config()
app.use(express.json())


app.use("/auth",authRoute)
app.use("/principal",principalRoutes)
app.use("/tutor",tutorRoutes)
app.use("/hod",hodRoutes)
app.use("/student",studentRoutes)


app.use((err,req,res,next)=>{
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something went wrong"
    return res.status(errorStatus).json({
        success:false,
        status:errorStatus,
        message:errorMessage,
        stack:err.stack
    })
})

connect();
app.listen(process.env.PORT,()=>{
    console.log(`server is running on ${process.env.PORT}`)
})
