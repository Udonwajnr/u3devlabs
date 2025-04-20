"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowLeft, ImageIcon, Loader2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Card, CardContent } from "@/components/ui/card"
import { uploadImage } from "@/lib/upload"
import { toast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"
import axios from "axios"

// Category options
const categoryOptions = [
  { id: "landing-page", name: "Landing Pages" },
  { id: "ecommerce", name: "E-commerce" },
  { id: "saas", name: "SaaS" },
  { id: "mobile-app", name: "Mobile Apps" },
  { id: "branding", name: "Branding" },
]

const maxImages = 2
export default function EditPortfolioProject() {
  const router = useRouter()
  const params = useParams()
  const slug = params?.slug as string

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
    coverImage: "",
    images: [] as string[],
    categories: [] as string[],
    tags: [] as string[],
    client: "",
    completedAt: "",
    technologies: [] as string[],
    website: "",
    isPublished: false,
    featured: false,
    views: 0,
    status: "draft",
  })
  const [newTag, setNewTag] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [imageUploading, setImageUploading] = useState(false)
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [success, setSuccess] = useState(false)

  // Fetch project data
  useEffect(() => {
    const fetchProjectData = async () => {
      if (!slug) return

      try {
        setIsLoading(true)
        const response = await axios.get(`/api/portfolio/${slug}`)
        const projectData = response.data

        setFormData({
          ...projectData,
          status: projectData.isPublished ? "published" : "draft",
          images: projectData.images || [],
          categories: projectData.categories || [],
          tags: projectData.tags || [],
          technologies: projectData.technologies || [],
        })
      } catch (err) {
        console.error("Failed to fetch project data:", err)
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load project data",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchProjectData()
  }, [slug])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleCategorySelect = (value: string) => {
    setSelectedCategory(value)
  }

  const addCategory = () => {
    if (selectedCategory && !formData.categories.includes(selectedCategory)) {
      setFormData({
        ...formData,
        categories: [...formData.categories, selectedCategory],
      })
      setSelectedCategory("")
    }
  }

  const removeCategory = (category: string) => {
    setFormData({
      ...formData,
      categories: formData.categories.filter((c) => c !== category),
    })
  }

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, newTag.trim()],
      })
      setNewTag("")
    }
  }

  const removeTag = (tag: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((t) => t !== tag),
    })
  }

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    try {
      setImageUploading(true)
      const file = files[0]

      // Check file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        toast({
          variant: "destructive",
          title: "File too large",
          description: "Image must be less than 2MB",
        })
        setImageUploading(false)
        return
      }

      const imageUrl = await uploadImage(file)

      // If no cover image is set, use this as cover image
      const newFormData = {
        ...formData,
        images: [...(formData.images || []), imageUrl],
      }

      if (!formData.coverImage) {
        newFormData.coverImage = imageUrl
      }

      setFormData(newFormData)

      toast({
        title: "Success",
        description: "Image uploaded successfully",
      })
    } catch (error) {
      console.error(error)
      toast({
        variant: "destructive",
        title: "Upload failed",
        description: "There was an error uploading your image",
      })
    } finally {
      setImageUploading(false)
      // Clear the input value to allow uploading the same file again
      if (e.target) e.target.value = ""
    }
  }

  const removeImage = (imageUrl: string) => {
    const newImages = (formData.images || []).filter((img: string) => img !== imageUrl)

    // Update form data
    const newFormData = {
      ...formData,
      images: newImages,
    }

    // If we're removing the cover image, set a new one or clear it
    if (formData.coverImage === imageUrl) {
      newFormData.coverImage = newImages.length > 0 ? newImages[0] : ""
    }

    setFormData(newFormData)

    toast({
      title: "Image removed",
      description: "Image has been removed successfully",
    })
  }

  const setCoverImage = (imageUrl: string) => {
    setFormData({
      ...formData,
      coverImage: imageUrl,
    })

    toast({
      title: "Cover image updated",
      description: "Cover image has been updated successfully",
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess(false)

    // Basic validation
    if (!formData.title.trim()) {
      setError("Project title is required")
      return
    }

    if (!formData.description.trim()) {
      setError("Project description is required")
      return
    }

    if (formData.categories.length === 0) {
      setError("At least one category is required")
      return
    }

    if (!formData.coverImage && !imagePreview) {
      setError("Project image is required")
      return
    }

    try {
      setIsSubmitting(true)

      // Send data to API using axios for updating
      const response = await axios.put(`/api/portfolio/${slug}`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .catch((error)=>{
          console.log(error)
      })


      setSuccess(true)

      toast({
        title: "Success",
        description: "Project updated successfully",
      })

      // Redirect after successful submission
      setTimeout(() => {
        router.push("/admin/portfolio")
      }, 2000)
    } catch (err) {
      console.error(err)

      // Axios error handling
      if (axios.isAxiosError(err)) {
        // Get the error message from the response if available
        const errorMessage = err.response?.data?.error || err.message || "Failed to update project"
        setError(errorMessage)
      } else if (err instanceof Error) {
        setError(err.message)
      } else {
        setError("An unknown error occurred")
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const images = formData.images || []
  const hasReachedMaxImages = images.length >= maxImages

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 px-4 max-w-5xl flex items-center justify-center min-h-[50vh]">
        <div className="flex flex-col items-center">
          <Loader2 className="h-10 w-10 text-purple-600 animate-spin mb-4" />
          <p className="text-lg">Loading project data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-5xl">
      <motion.div
        className="flex items-center gap-2 mb-8"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Button variant="ghost" size="icon" onClick={() => router.push("/admin/portfolio")}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold">Edit Portfolio Project</h1>
      </motion.div>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="mb-6 bg-green-50 border-green-200 text-green-800">
          <AlertDescription>Project updated successfully! Redirecting...</AlertDescription>
        </Alert>
      )}

      <Card className="shadow-md">
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-8">
            <motion.div
              className="grid gap-8 md:grid-cols-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-sm font-medium">
                    Project Title*
                  </Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="Enter project title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="border-gray-300 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-sm font-medium">
                    Project Description*
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Enter project description"
                    rows={5}
                    value={formData.description}
                    onChange={handleInputChange}
                    className="border-gray-300 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Categories*</Label>
                  <div className="flex gap-2">
                    <Select value={selectedCategory} onValueChange={handleCategorySelect}>
                      <SelectTrigger className="flex-1 border-gray-300 focus:ring-purple-500 focus:border-purple-500">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categoryOptions?.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button
                      type="button"
                      onClick={addCategory}
                      disabled={!selectedCategory}
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      Add
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.categories?.map((category) => (
                      <Badge key={category} className="bg-purple-100 text-purple-800 flex items-center gap-1 px-3 py-1">
                        {categoryOptions.find((c) => c.id === category)?.name || category}
                        <button type="button" onClick={() => removeCategory(category)} className="ml-1">
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Tags</Label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter tag"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault()
                          addTag()
                        }
                      }}
                      className="border-gray-300 focus:ring-purple-500 focus:border-purple-500"
                    />
                    <Button
                      type="button"
                      onClick={addTag}
                      disabled={!newTag.trim()}
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      Add
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.tags.map((tag) => (
                      <Badge key={tag} className="bg-gray-100 text-gray-800 flex items-center gap-1 px-3 py-1">
                        {tag}
                        <button type="button" onClick={() => removeTag(tag)} className="ml-1">
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="completedAt" className="text-sm font-medium">
                    Project Date
                  </Label>
                  <Input
                    id="completedAt"
                    name="completedAt"
                    type="date"
                    value={formData.completedAt}
                    onChange={handleInputChange}
                    className="border-gray-300 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Project Images*</Label>
                    <p className="text-xs text-muted-foreground">
                      Upload up to {maxImages} images. First image or selected image will be used as cover.
                    </p>
                  </div>

                  {/* Image Gallery */}
                  {images.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                      {images.map((imageUrl: string, index: number) => (
                        <div
                          key={index}
                          className={cn(
                            "relative rounded-md overflow-hidden border group",
                            formData.coverImage === imageUrl ? "ring-2 ring-primary" : "border-border",
                          )}
                        >
                          <img
                            src={imageUrl || "/placeholder.svg"}
                            alt={`Project image ${index + 1}`}
                            className="w-full h-40 object-cover"
                          />

                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <div className="flex gap-2">
                              {formData.coverImage !== imageUrl && (
                                <Button
                                  type="button"
                                  variant="secondary"
                                  size="sm"
                                  onClick={() => setCoverImage(imageUrl)}
                                  className="text-xs"
                                >
                                  Set as Cover
                                </Button>
                              )}
                              <Button
                                type="button"
                                variant="destructive"
                                size="sm"
                                onClick={() => removeImage(imageUrl)}
                                className="text-xs"
                              >
                                Remove
                              </Button>
                            </div>
                          </div>

                          {formData.coverImage === imageUrl && (
                            <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs py-1 px-2 rounded-md">
                              Cover
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Upload Area */}
                  {!hasReachedMaxImages && (
                    <div className="border-2 border-dashed border-border rounded-md p-6 flex flex-col items-center justify-center bg-muted/50 hover:bg-muted transition-colors">
                      {imageUploading ? (
                        <div className="flex flex-col items-center">
                          <Loader2 className="h-10 w-10 text-muted-foreground animate-spin mb-2" />
                          <p className="text-sm text-muted-foreground">Uploading image...</p>
                        </div>
                      ) : (
                        <>
                          <ImageIcon className="h-10 w-10 text-muted-foreground mb-2" />
                          <p className="text-sm text-muted-foreground mb-2">Click to upload or drag and drop</p>
                          <p className="text-xs text-muted-foreground mb-4">SVG, PNG, JPG or GIF (max. 2MB)</p>
                          <Input
                            id="image"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageChange}
                            disabled={imageUploading}
                          />
                          <Button
                            type="button"
                            onClick={() => document.getElementById("image")?.click()}
                            disabled={imageUploading}
                          >
                            Select Image
                          </Button>
                        </>
                      )}
                    </div>
                  )}

                  {hasReachedMaxImages && (
                    <p className="text-sm text-amber-600">
                      You've reached the maximum number of images ({maxImages}). Remove an image to upload a new one.
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Project Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) =>
                      setFormData({ ...formData, status: value, isPublished: value === "published" })
                    }
                  >
                    <SelectTrigger className="border-gray-300 focus:ring-purple-500 focus:border-purple-500">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <Switch
                    id="featured"
                    checked={formData.featured}
                    onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
                  />
                  <Label htmlFor="featured" className="text-sm font-medium">
                    Featured Project
                  </Label>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website" className="text-sm font-medium">
                    Project Website URL
                  </Label>
                  <Input
                    id="website"
                    name="website"
                    placeholder="https://example.com"
                    value={formData.website}
                    onChange={handleInputChange}
                    className="border-gray-300 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
              </div>
            </motion.div>

            <motion.div
              className="flex justify-end gap-4 pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/admin/portfolio")}
                className="border-gray-300 text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </Button>
              <Button type="submit" className="bg-purple-600 hover:bg-purple-700" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Update Project"}
              </Button>
            </motion.div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
