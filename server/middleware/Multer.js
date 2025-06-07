import multer from "multer"
import fs from "fs"
import path from "path"

// Use memory storage in production, disk storage in development
const isProduction = process.env.NODE_ENV === 'production';

let storage;

if (isProduction) {
    // Memory storage for production (Vercel)
    console.log("Using memory storage for production");
    storage = multer.memoryStorage();
} else {
    // Disk storage for development
    console.log("Using disk storage for development");
    
    // Ensure uploads directory exists
    const uploadsDir = "uploads";
    if (!fs.existsSync(uploadsDir)) {
        try {
            fs.mkdirSync(uploadsDir, { recursive: true });
            console.log("Created uploads directory");
        } catch (error) {
            console.log("Could not create uploads directory:", error.message);
        }
    }

    storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, "uploads/")
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + "-" + file.originalname)
        },
    });
}

const uploadStorage = multer({ storage: storage })

export default uploadStorage