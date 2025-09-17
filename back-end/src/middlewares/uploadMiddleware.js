
import multer from "multer";
import cloudinary from "../config/cloudinary.js"; 
import {CloudinaryStorage} from "multer-storage-cloudinary"

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'management',
        allowed_formats:  ['jpg', 'png', 'jpeg', 'webp', 'avif'],
    },
});

const upload = multer({ storage });

export default upload