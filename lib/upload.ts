export const uploadImage = async (file: File): Promise<string> => {
    // Convert file to base64 string
    const base64data = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = (error) => reject(error)
    })
   
    // Upload to Cloudinary
    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: base64data }),
      })
  
      const data = await response.json()
      return data.url
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error)
      throw new Error("Failed to upload image")
    }
  }
  