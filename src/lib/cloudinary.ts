import { v2 as cloudinary } from "cloudinary"

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export default cloudinary

export const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData()
  formData.append("file", file)
  formData.append("upload_preset", "ml_default") // You can create a custom upload preset
  formData.append("folder", process.env.CLOUDINARY_FOLDER || "nextjs-app") // Folder from env

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  )

  const data = await response.json()
  return data.secure_url
}

export const deleteImage = async (publicId: string) => {
  return await cloudinary.uploader.destroy(publicId)
} 