import express from "express";
import { processingImage} from "../utilities/image-processor";
import path from "path";
import fs from "fs";
import { existsSync } from "fs";

type ErrorResponse={
    error:string;
    status:number;
    details?:string;
};
const router = express.Router();
router.get('/process' , async (request, response,next) => {
    try {
        const { filename, width, height } = request.query;
        if (!filename || !width || !height) {
            response.status(400).json({
                error:"missing required parametrs",
                required:["filename","width","height"]
            });
            return;
        }
        const widthNum = parseInt(width as string);
        const heightNum = parseInt(height as string);
        if(isNaN(widthNum)||isNaN(heightNum)){
            response.status(400).json({
                error:"width and height must be numbers"
            })
            return
        }
        const processedImagePath = await processingImage({
            filename: filename as string,
            width: widthNum,
            height: heightNum,
        });
        const relativePath = '/images/thumb/' + path.basename(processedImagePath);
        response.send(relativePath);
            if(!existsSync(processedImagePath)){
                response.status(500).json({
                    error:"image cant be found"
                })
                return
            }
            response.sendFile(path.resolve(processedImagePath),(err)=>{
                if(err){
                    next(err);
                }
            });
        }
        catch (err:unknown) {
            console.error("err in img processing",err)
            const errMessage = err instanceof Error?err.message:"err ocured"
            const errRes :ErrorResponse ={
                error:"img prosessing fail",
                status:500
            }
            if (process.env.NODE_ENV !=="production"){
                errRes.details=errMessage
            }
            response.status(500).json(errRes)
        }
    }
);
router.get('/', (req, res) => {
    const uploadsPath = path.join(__dirname, '../../images/full');
    fs.readdir(uploadsPath, (err, files) => {
      if (err) {
        console.error('failed to read uploads folder:', err);
        return res.status(500).json({ error: 'Failed to load images' });
      }
    
      const urls = files.map(filename => "/images/full/"+filename);
      res.json(urls);
    });
  });
export default router;

