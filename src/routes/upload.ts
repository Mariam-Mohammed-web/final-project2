import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { Request,Response } from "express";
type ErrorResponse={
    error:string;
    status:number;
    details?:string;
};
type UploadResponse ={
    message:string,
    filename:string,
    path:string
}
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        const uploadPath = path.join(__dirname,"images/full/")
        if(!fs.existsSync(uploadPath)){
            fs.mkdirSync(uploadPath,{recursive:true})
        }
        cb(null,uploadPath)
    }
    ,filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
})
const upload = multer({storage:storage});
const router = express.Router();
router.post('/',upload.single('image'),(request:Request,response:Response) =>{
    try{
        if(!request.file){
            response.status(400).json({
                error:"file isn't uploaded successfuly"
            })
            return
        }
        response.status(200).json({
            message:"file uploaded successfully",
            filename:request.file.originalname,
            path:request.file.path
        })
    }catch(error:unknown){
        console.error("error in img uploading",error);
        const errorMessage=error instanceof Error?error.message:"error in uploading"
        const errorResponse:ErrorResponse={
            error:"error in uploading",
            status:500
        }
        if(process.env.NODE_ENV !=="production"){
            errorResponse.details=errorMessage
        }
        response.status(500).json(errorResponse)
    }
})
export default router