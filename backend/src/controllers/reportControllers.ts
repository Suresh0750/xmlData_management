


import {Response,Request,NextFunction} from 'express'
import { StatusCode } from '../utils/httpStatusCode'
import fs from 'fs/promises'
import { parseXML } from '../services/xmlParser'
import Report from '../models/Report'
import { logger } from '../utils/logger'


interface MulterRequest extends Request {
    file?: Express.Multer.File;
  }
export const uploadReport = async (req:MulterRequest,res:Response,next:NextFunction):Promise<void>=>{
    try {
        if(!req.file){
            res.status(StatusCode.BadRequest).send({success:false,message:'No file uploaded'})
            return
        }


        const xmlData = await fs.readFile(req.file?.path, 'utf8');
        const parsedData = await parseXML(xmlData)

        const existFile = await Report.findOne({"basicDetails.mobilePhone":parsedData?.basicDetails?.mobilePhone})

        if(existFile){
          res.status(StatusCode.Conflict).send({success:false,message:'Data is already exist'})
          return
        } 
        const report = new Report(parsedData)
        await report.save()
        await fs.unlink(req.file.path)

        res.status(StatusCode.Success).send({success:false,message:'successfully upload the xml data'})
    } catch (error:unknown) {
        logger.error(error)
        
        throw error
    }
}


export const getReport = async (req: Request, res: Response): Promise<void> => {
    try {
      const report = await Report.find();
      if (!report) {
        res.status(StatusCode.NotFound).json({ message: 'Report not found' });
        return;
        
      }
      res.json(report);
    } catch (error) {
      logger.error('Error fetching report:', error);
      res.status(StatusCode.InternalServerError).json({ message: 'Error fetching report' });
    }
  };