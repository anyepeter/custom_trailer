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

    // Set timeout for upload (5 minutes)
    const timeout = setTimeout(() => {
      reject(new Error("Upload timeout - please try again with a smaller image"));
    }, 300000); // 5 minutes in milliseconds

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "auto",
        public_id: `${Date.now()}-${nameWithoutExt}`,
        // Optimization settings
        quality: "auto:good", // Automatic quality optimization
        fetch_format: "auto", // Automatic format selection (WebP for supported browsers)
        format: "jpg", // Default format
        transformation: [
          {
            width: 1920,
            height: 1920,
            crop: "limit", // Don't upscale, only downscale if needed
            quality: "auto:good",
          },
        ],
        // Additional optimizations
        flags: ["progressive"], // Progressive JPEG loading
        use_filename: true,
        unique_filename: true,
        overwrite: false,
      },
      (error, result) => {
        clearTimeout(timeout); // Clear timeout on completion

        if (error) {
          console.error("Cloudinary upload error:", error);
          reject(error);
        } else {
          console.log(`✅ Uploaded to Cloudinary: ${result!.secure_url}`);
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
