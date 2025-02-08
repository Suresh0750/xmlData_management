import express from 'express'
import multer from 'multer'
import { uploadReport,getReport } from '../controllers/reportControllers'

const router = express.Router()
const upload = multer({dest:'uploads/'})


router.get('/', getReport);
router.post('/upload',upload.single('file'),uploadReport)

export default router