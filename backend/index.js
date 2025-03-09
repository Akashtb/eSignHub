import express from "express"
import dotenv from "dotenv"

const app = express()
dotenv.config()
app.use(express.json())

app.get('/',(req,res)=>{
    console.log('Hello, World!')
    res.send("Hello, World!");
})

app.listen(3000,()=>{
    console.log('Server is running on port 3000')
})
