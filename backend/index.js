import express from "express"
import dotenv from "dotenv"
import connect from "./db.js"
import authRoute from "./routes/authRoutes.js"
import principalRoutes from "./routes/principalRoutes.js"
import tutorRoutes from "./routes/tutorRoutes.js"
import hodRoutes from "./routes/hodRoutes.js"
import studentRoutes from "./routes/studentRoutes.js"
import requestLetterRoutes from "./routes/requestLetterRoutes.js"
import cookieParser from "cookie-parser"
import cors from "cors"
const app = express()


dotenv.config()
app.use(express.json())
app.use(cookieParser());

const corsOptions = {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
};

app.use(cors(corsOptions));



app.use("/auth",authRoute)
app.use("/principal",principalRoutes)
app.use("/tutor",tutorRoutes)
app.use("/hod",hodRoutes)
app.use("/student",studentRoutes)
app.use('/requestLetter', requestLetterRoutes);


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
