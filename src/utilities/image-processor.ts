import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
interface imageParametrs {
    filename : string;
    width : number;
    height : number;
}
const processingImage = async (parametrs:imageParametrs):Promise<string>=>{
    const {filename,width,height}=parametrs;
    const inputDir= path.resolve(__dirname,"../../images/full")
    const outputDir = path.resolve(__dirname,"../../images/thumb")

    const inputPath=path.join(inputDir,filename+".jpg");
    const outputPath =path.join(outputDir,filename+"_"+width+"x"+height+".jpg");
    if (fs.existsSync(inputPath)){
        console.log ("main image is found")
    }else{
        throw new Error("image isn't found")
    }
    if(fs.existsSync(outputPath)){
        console.log("thumbPath/outputpath is found")
        return outputPath
    }
    try {
        await sharp(inputPath).resize(width,height).toFile(outputPath);
        return outputPath;
    }catch(err){
        throw new Error("image processing failed")
    }
}
export{processingImage,imageParametrs}