import { v2 as cloudinary } from "cloudinary";
import "dotenv/config";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

console.log(cloudinary.config());

try {
    const result = await cloudinary.uploader.upload("./uploads/1783524749094.png", {
        folder: "test"
    });
    console.log(result);
} catch (err) {
    console.log(err);
    console.log(err.error);
}