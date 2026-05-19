import dns from "node:dns/promises";
dns.setServers(["1.1.1.1"]);
import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import connectDB from './db/connectDB.js'
import authRouter from './routes/authRoutes.js'
import { protect , authorize } from "./middlewares/authMiddleware.js";
import propertyRouter from './routes/propertyRoutes.js'
import errorHandler from "./middlewares/errorHandler.js"

const app = express()
app.use(express.json())

app.use('/auth',authRouter)
app.use('/property',propertyRouter)


app.get('/profile',protect,(req,res) =>{
    return res.json({message:"Welcome to profile",user:req.user.username})
})

app.get('/dashboard', protect, authorize("admin"),(req,res) =>{
    return res.json({message:"Welcome admin"})
})


//Error handler
app.use(errorHandler)

const port = process.env.PORT || 5000

app.listen(port,()=>{
    console.log(`Server started at port ${port}`)
})
connectDB()