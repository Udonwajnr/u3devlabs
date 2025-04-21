"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowLeft, Upload, X, Bold, Italic, Link, List, ListOrdered, ImageIcon, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { uploadImage } from "@/lib/upload"
import { toast } from "@/hooks/use-toast"
import axios from "axios"
import RichTextEditor from "@/components/admin/rich-text-editor"

// Category options
const categoryOptions = [
  { id: "design", name: "Design" },
  { id: "development", name: "Development" },
  { id: "business", name: "Business" },
  { id: "technology", name: "Technology" },
  { id: "tutorials", name: "Tutorials" },
]

// Author options
const authorOptions = [
  { id: "shahed", name: "Shahed Shahriar", avatar: "/avatars/shahed.jpg" },
  { id: "asif", name: "Asif Rahman", avatar: "/avatars/asif.jpg" },
  { id: "afia", name: "Afia Nishat Kanta", avatar: "/avatars/afia.jpg" },
  { id: "shihab", name: "Shihab Uddin", avatar: "/avatars/shihab.jpg" },
]

export default function NewBlogPost() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    coverImage: "",
    category: "",
    tags: [] as string[],
    isPublished: false,
    author: {
      name: "Shahed Shahriar",
      avatar: "/avatars/shahed.jpg",
    },
  })

  const [newTag, setNewTag] = useState("")
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [imageUploading, setImageUploading] = useState(false)
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [previewMode, setPreviewMode] = useState("edit")
  const [success, setSuccess] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })

    // Auto-generate slug from title if slug field is empty
    if (name === "title" && !formData.slug) {
      const slug = value
        .toLowerCase()
        .replace(/[^\w\s]/gi, "")
        .replace(/\s+/g, "-")

      setFormData((prev) => ({ ...prev, slug }))
    }
  }

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
      .toLowerCase()
      .replace(/[^\w\s-]/gi, "")
      .replace(/\s+/g, "-")

    setFormData({ ...formData, slug: value })
  }

  const handleCategoryChange = (value: string) => {
    setFormData({ ...formData, category: value })
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

  const handleAuthorChange = (authorName: string) => {
    const author = authorOptions.find((a) => a.name === authorName)
    if (author) {
      setFormData({
        ...formData,
        author: {
          name: author.name,
          avatar: author.avatar,
        },
      })
    }
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
  
      // Preview the image locally
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
  
      // Upload the image to get a URL
      const imageUrl = await uploadImage(file)
  
      // Set the cover image directly
      setFormData({
        ...formData,
        coverImage: imageUrl,
      })
  
      toast({
        title: "Success",
        description: "Cover image uploaded successfully",
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

  const removeImage = () => {
    setImagePreview(null)
    setFormData({ ...formData, coverImage: "" })
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const insertTextFormat = (format: string) => {
    const textarea = document.getElementById("content") as HTMLTextAreaElement
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = formData.content.substring(start, end)
    let formattedText = ""

    switch (format) {
      case "bold":
        formattedText = `<strong>${selectedText}</strong>`
        break
      case "italic":
        formattedText = `<em>${selectedText}</em>`
        break
      case "link":
        formattedText = `<a href="url">${selectedText}</a>`
        break
      case "ul":
        formattedText = `<ul>\n  <li>${selectedText}</li>\n</ul>`
        break
      case "ol":
        formattedText = `<ol>\n  <li>${selectedText}</li>\n</ol>`
        break
      case "image":
        formattedText = `<img src="image-url" alt="Image description" />`
        break
      default:
        formattedText = selectedText
    }

    const newContent = formData.content.substring(0, start) + formattedText + formData.content.substring(end)
    setFormData({ ...formData, content: newContent })

    // Set focus back to textarea
    setTimeout(() => {
      textarea.focus()
      textarea.selectionStart = start + formattedText.length
      textarea.selectionEnd = start + formattedText.length
    }, 0)
  }

  const validateForm = () => {
    if (!formData.title || formData.title.length < 3) {
      setError("Title must be at least 3 characters long")
      return false
    }

    if (!formData.slug || formData.slug.length < 3) {
      setError("Slug must be at least 3 characters long")
      return false
    }

    if (!formData.excerpt || formData.excerpt.length < 10) {
      setError("Excerpt must be at least 10 characters long")
      return false
    }

    if (!formData.content || formData.content.length < 50) {
      setError("Content must be at least 50 characters long")
      return false
    }

    if (!formData.coverImage) {
      setError("Cover image is required")
      return false
    }

    if (!formData.category) {
      setError("Category is required")
      return false
    }

    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess(false)

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Prepare the post data according to the schema
      const postData = {
        title: formData.title,
        slug: formData.slug,
        excerpt: formData.excerpt,
        content: formData.content,
        coverImage: formData.coverImage,
        author: formData.author,
        category: formData.category,
        tags: formData.tags,
        isPublished: formData.isPublished,
        publishedAt: formData.isPublished ? new Date().toISOString() : undefined,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        views: 0,
      }

      // Send the data to the API
      const response = await axios.post("/api/blog", postData)

      setSuccess(true)

      // Redirect after a short delay
      setTimeout(() => {
        router.push("/admin/blog")
      }, 2000)
    } catch (error) {
      console.error("Error creating blog post:", error)

      if (axios.isAxiosError(error) && error.response) {
        setError(error.response.data.error || "Failed to create blog post")
      } else {
        setError("An unexpected error occurred")
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto py-8 px-4">
      <motion.div
        className="flex items-center gap-2"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Button variant="ghost" size="icon" onClick={() => router.push("/admin/blog")}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold">Create New Blog Post</h1>
      </motion.div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="bg-green-50 border-green-200 text-green-800">
          <AlertDescription>Blog post created successfully! Redirecting...</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid gap-6 md:grid-cols-2"
        >
          <div className="space-y-2">
            <Label htmlFor="title">Post Title*</Label>
            <Input
              id="title"
              name="title"
              placeholder="Enter post title"
              value={formData.title}
              onChange={handleInputChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">Post Slug*</Label>
            <Input
              id="slug"
              name="slug"
              placeholder="post-url-slug"
              value={formData.slug}
              onChange={handleSlugChange}
            />
            <p className="text-xs text-muted-foreground">
              This will be used in the URL: /blog/{formData.slug || "post-slug"}
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="space-y-2">
            <Label htmlFor="excerpt">Post Excerpt*</Label>
            <Textarea
              id="excerpt"
              name="excerpt"
              placeholder="Enter a brief summary of your post (at least 10 characters)"
              rows={3}
              value={formData.excerpt}
              onChange={handleInputChange}
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="space-y-2">
            <Label htmlFor="content">Post Content*</Label>
            <Tabs value={previewMode} onValueChange={setPreviewMode} className="w-full">
              <TabsList className="mb-2">
                <TabsTrigger value="edit">Edit</TabsTrigger>
                <TabsTrigger value="preview">Preview</TabsTrigger>
              </TabsList>
              <TabsContent value="edit" className="space-y-2">
                <div className="flex flex-wrap gap-2 mb-2">
                  <Button type="button" variant="outline" size="icon" onClick={() => insertTextFormat("bold")}>
                    <Bold className="h-4 w-4" />
                  </Button>
                  <Button type="button" variant="outline" size="icon" onClick={() => insertTextFormat("italic")}>
                    <Italic className="h-4 w-4" />
                  </Button>
                  <Button type="button" variant="outline" size="icon" onClick={() => insertTextFormat("link")}>
                    <Link className="h-4 w-4" />
                  </Button>
                  <Button type="button" variant="outline" size="icon" onClick={() => insertTextFormat("ul")}>
                    <List className="h-4 w-4" />
                  </Button>
                  <Button type="button" variant="outline" size="icon" onClick={() => insertTextFormat("ol")}>
                    <ListOrdered className="h-4 w-4" />
                  </Button>
                  <Button type="button" variant="outline" size="icon" onClick={() => insertTextFormat("image")}>
                    <ImageIcon className="h-4 w-4" />
                  </Button>
                </div>
                <Textarea
                  id="content"
                  name="content"
                  placeholder="Write your post content here (at least 50 characters)..."
                  rows={15}
                  value={formData.content}
                  onChange={handleInputChange}
                  className="font-mono text-sm"
                />
                <p className="text-xs text-muted-foreground">
                  You can use HTML tags for formatting. Use the toolbar above for common formatting options.
                </p>
              </TabsContent>
              <TabsContent value="preview">
                <div className="border rounded-md p-4 min-h-[400px] prose max-w-none">
                  {formData.content ? (
                    <div dangerouslySetInnerHTML={{ __html: formData.content }} />
                  ) : (
                    <p className="text-gray-400">No content to preview</p>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="space-y-2">
              <Label>Category*</Label>
              <Select value={formData.category} onValueChange={handleCategoryChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categoryOptions.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Tags</Label>
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
                />
                <Button type="button" onClick={addTag} disabled={!newTag.trim()}>
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.tags.map((tag) => (
                  <Badge key={tag} className="bg-gray-100 text-gray-800 flex items-center gap-1">
                    {tag}
                    <button type="button" onClick={() => removeTag(tag)}>
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="author">Author</Label>
              <Select value={formData.author.name} onValueChange={handleAuthorChange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {authorOptions.map((author) => (
                    <SelectItem key={author.id} value={author.name}>
                      {author.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </motion.div>

          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <div className="space-y-2">
              <Label>Featured Image*</Label>
              {imageUploading ? (
                <div className="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center">
                  <Loader2 className="h-10 w-10 text-gray-400 mb-2 animate-spin" />
                  <p className="text-sm text-gray-500">Uploading image...</p>
                </div>
              ) : imagePreview || formData.coverImage ? (
                <div className="relative rounded-md overflow-hidden">
                  <img src={imagePreview || formData.coverImage} alt="Preview" className="w-full h-48 object-cover" />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={removeImage}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center">
                  <Upload className="h-10 w-10 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500 mb-2">Click to upload or drag and drop</p>
                  <p className="text-xs text-gray-400 mb-4">SVG, PNG, JPG or GIF (max. 2MB)</p>
                  <Input
                    id="image"
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                  <Button type="button" onClick={() => fileInputRef.current?.click()}>
                    Select Image
                  </Button>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label>Publication Status</Label>
              <div className="flex items-center gap-2">
                <Switch
                  id="isPublished"
                  checked={formData.isPublished}
                  onCheckedChange={(checked) => setFormData({ ...formData, isPublished: checked })}
                />
                <Label htmlFor="isPublished">{formData.isPublished ? "Published" : "Draft"}</Label>
              </div>
              <p className="text-xs text-muted-foreground">
                {formData.isPublished
                  ? "This post will be visible to the public immediately."
                  : "This post will be saved as a draft and won't be visible to the public."}
              </p>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="flex justify-end gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Button type="button" variant="outline" onClick={() => router.push("/admin/blog")}>
            Cancel
          </Button>
          <Button type="submit" className="bg-purple-600 hover:bg-purple-700" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Post"
            )}
          </Button>
        </motion.div>
      </form>
    </div>
  )
}
