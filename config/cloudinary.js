import { v2 as cloudinary } from "cloudinary";

export const getCloudinaryInstance = (index) => {
  const cloudName = process.env[`CLOUD_NAME_${index}`];
  const apiKey = process.env[`CLOUD_API_KEY_${index}`];
  const apiSecret = process.env[`CLOUD_API_SECRET_${index}`];

  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error(`Cloudinary storage #${index} غير معرف في .env`);
  }

  const cloud = cloudinary;
  cloud.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
  });

  return cloud;
};
