import { NextResponse } from "next/server"
import cloudinary from "@/lib/cloudinary"

export async function POST(request: Request) {
  try {
    const { data } = await request.json()

    // Upload to Cloudinary
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload(
        data,
        {
          folder: "u3devlab",
        },
        (error, result) => {
          if (error) reject(error)
          else resolve(result)
        },
      )
    })

    // Return the Cloudinary URL
    return NextResponse.json({
      url: (result as any).secure_url,
      public_id: (result as any).public_id,
    })
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error)
    return NextResponse.json({ error: "Failed to upload image" }, { status: 500 })
  }
}
