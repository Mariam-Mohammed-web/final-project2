import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination:(req,file,cb) =>{
        cb(null,path.join(__dirname,'../../images/full'))
    },
    filename:(req,file,cb)=>{
        const uniqueSuffix = Date.now()+'-'+Math.round(Math.random()*1E9)
        const extension = path.extname(file.originalname)
        cb (null,file.fieldname+'-'+uniqueSuffix+extension)
    },
})
const fileFilter = (req:any,file:any,cb:any)=>{
    if(file.mimetype ==='image/jpeg' || file.mimetype === 'image/png'||file.mimetype==='image/jpg'){
        cb(null,true)
    }else{
        cb(new Error ('only jpeg and jpg and png extensions are allowed'),false)
    }
}
const upload = multer({
    storage:storage,
    fileFilter:fileFilter,
    limits:{
        fileSize:1024*1024*5
    }
})
export{upload}