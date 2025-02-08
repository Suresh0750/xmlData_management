import {Response,Request,NextFunction} from 'express'
import {StatusCode} from '../utils/httpStatusCode'



const errorHandler = async(error:any,req:Request,res:Response,next:NextFunction)=>{

    const errorMessage = error?.message || 'unexpected error'
    const statusCode= error?.statusCode  || StatusCode.NotFound
    res.status(statusCode).send({successs:false,message:errorMessage})
}       



export default errorHandler