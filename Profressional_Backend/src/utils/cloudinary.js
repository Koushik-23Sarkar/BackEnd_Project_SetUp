import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";

    // Configuration
cloudinary.config({ 
    cloud_name:process.env, 
    api_key: process.env, 
    api_secret: process.env // Click 'View Credentials' below to copy your API secret
});

const uploadClouinary = async (localFilePath)=>{
    try {
        if(!localFilePath) return null;
        const responce = await cloudinary.uploader.upload(localFilePath,{
            resource_type: "auto"
        });
        console.log("file is uploaded on cloudinary",responce.url);
        return responce;        
    } catch (error) {
        fs.unlinkSync(localFilePath);   //remove saved temporary file as the upload operation got failed
        return null;
    }
}

export {uploadClouinary};