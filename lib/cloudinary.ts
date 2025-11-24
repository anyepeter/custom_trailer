import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloudinary_url: process.env.CLOUDINARY_URL || "cloudinary://678763769254176:YctXRz0tgio0twtQYnjrt4GnkdE@dhvzfeomo",
});

/**
 * Upload an image file to Cloudinary
 * @param file - File object to upload
 * @param folder - Cloudinary folder (default: "trucks")
 * @returns Secure URL of the uploaded image
 */
export async function uploadToCloudinary(
  fileBuffer: Buffer,
  filename: string,
  folder: string = "trucks"
): Promise<string> {
  return new Promise((resolve, reject) => {
    // Remove file extension from filename to avoid double extensions
    const nameWithoutExt = filename.replace(/\.[^/.]+$/, "");

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "auto",
        public_id: `${Date.now()}-${nameWithoutExt}`,
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result!.secure_url);
        }
      }
    );

    uploadStream.end(fileBuffer);
  });
}

/**
 * Delete an image from Cloudinary by URL
 * @param imageUrl - Cloudinary URL to delete
 */
export async function deleteFromCloudinary(imageUrl: string): Promise<void> {
  try {
    // Extract public_id from URL
    const parts = imageUrl.split("/");
    const filename = parts[parts.length - 1];
    const publicId = filename.split(".")[0];
    const folder = parts[parts.length - 2];

    await cloudinary.uploader.destroy(`${folder}/${publicId}`);
  } catch (error) {
    console.error("Error deleting from Cloudinary:", error);
  }
}

export default cloudinary;
