import express from "express"
import dotenv from "dotenv"
import connect from "./db.js"
import authRoute from "./routes/authRoutes.js"
import principalRoutes from "./routes/principalRoutes.js"


const app = express()


dotenv.config()
app.use(express.json())


app.use("/auth",authRoute)
app.use("/principal",principalRoutes)


connect();
app.listen(process.env.PORT,()=>{
    console.log(`server is running on ${process.env.PORT}`)
})
