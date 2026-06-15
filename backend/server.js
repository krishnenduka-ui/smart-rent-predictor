import dns from "node:dns/promises";
dns.setServers(["1.1.1.1"]);

import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'
import connectDB from './db/connectDB.js'
import authRouter from './routes/authRoutes.js'
import { protect , authorize } from "./middlewares/authMiddleware.js";
import propertyRouter from './routes/propertyRoutes.js'
import errorHandler from "./middlewares/errorHandler.js"
import favoriteRouter from './routes/favoriteRoutes.js'
import compareRouter from './routes/compareRoutes.js'
import rentRouter from './routes/rentRoutes.js'
import Property from './models/propertyModel.js'
import { trainModel } from "./ml/rentModel.js";
import bookingRouter from './routes/bookingRoute.js'

const app = express()
app.use(cors())
app.use(express.json())

app.use('/auth',authRouter)
app.use('/property',propertyRouter)
app.use('/favorites', favoriteRouter)
app.use('/compare',compareRouter)
app.use('/booking',bookingRouter)

app.use('/api/rent',rentRouter)


app.get('/profile',protect,authorize("user"),(req,res) =>{
    return res.json({message:"Welcome to profile",user:req.user.username})
})

app.get('/dashboard', protect, authorize("admin"),(req,res) =>{
    return res.json({message:"Welcome admin"})
})


//Error handler
app.use(errorHandler)

const port = process.env.PORT || 5000

const startServer = async () => {

  try {

    await connectDB();

    console.log("MongoDB connected");

    const properties = await Property.find();

    console.log(`Training with ${properties.length} properties`);

    await trainModel(properties);

    console.log("AI rent model trained");

    app.listen(port, () => {
      console.log(`Server started at port ${port}`);
    });

  } catch (error) {

    console.log(error);

  }

};

startServer();