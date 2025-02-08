import {connect} from 'mongoose'
import dotenv from 'dotenv'
import { logger } from '../utils/logger'
dotenv.config()

const connectDatabase = async ()=>{
    try {
        await connect(process.env?.MONGOOSE_URL as string)
        logger.info('✅ MongoDB connected successfully');
    } catch (error:unknown) {
        logger.error('MongoDB connection error:', error);
        process.exit(1);
    }
}   


export  {connectDatabase}