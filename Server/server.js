import express from "express"
import dotenv from "dotenv"

dotenv.config()

const app = express();
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT,()=>{
    console.log(`Server running on PORT ${PORT}`)
})

app.get("/",(req,res)=>{
    res.send("Welcome!! You are on home screen")
})