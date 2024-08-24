import { v2 as cloudinary } from "cloudinary"
import fs from "fs"
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath, subfolderName) => {
    try {
        if (!localFilePath || !subfolderName) return null;

        const options = {
            resource_type: "auto",
            folder: `fooddelivery/${subfolderName}`
        };

        const response = await cloudinary.uploader.upload(localFilePath, options);

        fs.unlinkSync(localFilePath);
        return response;

    } catch (error) {
        console.log("Error uploading file to Cloudinary", error);
        fs.unlinkSync(localFilePath);
        return null;
    }
}

const deleteImageFromCloudinary = async (url) => {
    try {
        const parts = url.split("/")
        const last = parts[parts.length - 1].split(".")
        const publicId = parts[parts.length - 3] + "/" + parts[parts.length - 2] + "/" + last[0]
        const response = await cloudinary.uploader.destroy(publicId);
        return response;
    } catch (error) {
        console.log("Error deleting file from Cloudinary", error);
        return null;
    }
}

export { uploadOnCloudinary, deleteImageFromCloudinary }