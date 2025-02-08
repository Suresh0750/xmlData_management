import express, {Request,Response, NextFunction } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import {connectDatabase} from './config/database'
import reportRoutes from './routes/reportRoutes'
import errorHandler from './middleware/errorHandler'

dotenv.config()
connectDatabase()  

const app = express()

app.use(
    cors({
      origin: 'http://localhost:3000', // Allow only your frontend
      methods: 'GET,POST,PUT,DELETE',
      credentials: true,
    })
  );
  

app.use(express.json())


app.use('/api/reports',reportRoutes)

//
app.use(errorHandler)  // * error handlers

const PORT = process.env.PORT || 5001

app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`) 
})