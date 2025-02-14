import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: "dzla66tsb",
  api_key: "332284628768572",
  api_secret: "KhngVEvUAtt-MphcquALOBuclOI",
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    console.log("Uploading to Cloudinary:", localFilePath);

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    if (response && response.secure_url) {
      fs.unlinkSync(localFilePath);
      return response;
    } else {
      console.error("Cloudinary upload failed:", response);
      return null;
    }
    
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }
    
  }
};


export { uploadOnCloudinary  };
