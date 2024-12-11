import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    cloud_key: process.env.CLOUDINARY_API_KEY,
    cloud_secret: process.env.CLOUDINARY_API_SECRET,
})

export const Cloudinary = cloudinary