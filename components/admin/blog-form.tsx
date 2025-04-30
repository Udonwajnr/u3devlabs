"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { X, Save, Trash2, ImageIcon, Eye } from "lucide-react"
import dynamic from "next/dynamic"
import type { BlogPost } from "@/lib/schemas"
import { uploadImage } from "@/lib/upload"

import ViewCounter from "@/components/blog/view-counter"
import RichTextEditor from "@/components/admin/rich-text-editor"

// Dynamically import the rich text editor to avoid server-side rendering issues
const DynamicEditor = dynamic(() => import("@/components/admin/rich-text-editor"), {
  ssr: false,
  loading: () => <div className="h-64 w-full bg-gray-100 animate-pulse rounded-md" />,
})

interface BlogFormProps {
  initialData?: Partial<BlogPost>
  isEditing?: boolean
}

export default function BlogForm({ initialData, isEditing = false }: BlogFormProps) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("content")
  const [formData, setFormData] = useState<Partial<BlogPost>>(
    initialData || {
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      coverImage: "",
      author: {
        name: "Admin", // Default author
      },
      category: "",
      tags: [],
      isPublished: false,
      views: 0, // Initialize views to 0
    },
  )
  const [availableCategories, setAvailableCategories] = useState<{ name: string; slug: string }[]>([])
  const [availableTags, setAvailableTags] = useState<{ name: string; slug: string }[]>([])
  const [newTag, setNewTag] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

  // Fetch categories and tags
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesRes, tagsRes] = await Promise.all([
          fetch("/api/categories?type=blog"),
          fetch("/api/tags?type=blog"),
        ])

        if (categoriesRes.ok && tagsRes.ok) {
          const categories = await categoriesRes.json()
          const tags = await tagsRes.json()

          setAvailableCategories(categories)
          setAvailableTags(tags)
        }
      } catch (error) {
        console.error("Error fetching categories and tags:", error)
      }
    }

    fetchData()
  }, [])

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  // Handle rich text editor changes
  const handleEditorChange = (content: string) => {
    setFormData({ ...formData, content })
  }

  // Handle select changes
  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value })
  }

  // Generate slug from title
  const generateSlug = () => {
    if (formData.title) {
      const slug = formData.title
        .toLowerCase()
        .replace(/[^\w\s]/gi, "")
        .replace(/\s+/g, "-")

      setFormData({ ...formData, slug })
    }
  }

  // Handle tag addition
  const addTag = () => {
    if (newTag && !formData.tags?.includes(newTag)) {
      setFormData({
        ...formData,
        tags: [...(formData.tags || []), newTag],
      })
      setNewTag("")
    }
  }

  // Handle tag removal
  const removeTag = (tag: string) => {
    setFormData({
      ...formData,
      tags: formData.tags?.filter((t) => t !== tag),
    })
  }

  // Handle cover image upload
  const handleCoverImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setIsUploading(true)
      try {
        const imageUrl = await uploadImage(file)
        setFormData({ ...formData, coverImage: imageUrl })
      } catch (error) {
        console.error("Error uploading image:", error)
        setError("Failed to upload image. Please try again.")
      } finally {
        setIsUploading(false)
      }
    }
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccessMessage("")

    // Basic validation
    if (!formData.title || !formData.content || !formData.category) {
      setError("Please fill in all required fields")
      return
    }

    setIsSaving(true)

    try {
      const url = isEditing ? `/api/blog/${initialData?.slug}` : "/api/blog"
      const method = isEditing ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Failed to save blog post")
      }

      setSuccessMessage(isEditing ? "Blog post updated successfully!" : "Blog post created successfully!")

      // Redirect after a short delay
      setTimeout(() => {
        router.push("/admin/blog")
        router.refresh()
      }, 1500)
    } catch (error) {
      console.error("Error saving blog post:", error)
      setError(error instanceof Error ? error.message : "An unknown error occurred")
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-6">
      <RichTextEditor value="hello" onChange={handleEditorChange}/>
        <Card>
          <CardHeader>
            <CardTitle>{isEditing ? "Edit Blog Post" : "Create New Blog Post"}</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="content">Content</TabsTrigger>
                <TabsTrigger value="seo">SEO & Meta</TabsTrigger>
                <TabsTrigger value="media">Media</TabsTrigger>
                <TabsTrigger value="publish">Publishing</TabsTrigger>
                <TabsTrigger value="stats">Statistics</TabsTrigger>
              </TabsList>

              {/* Error or success messages */}
              {error && (
                <Alert variant="destructive" className="mb-4">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {successMessage && (
                <Alert className="mb-4 bg-green-50 border-green-200 text-green-800">
                  <AlertDescription>{successMessage}</AlertDescription>
                </Alert>
              )}

              {/* Content Tab */}
              <TabsContent value="content">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title" className="block text-sm font-medium mb-1">
                      Post Title*
                    </Label>
                    <div className="flex">
                      <Input
                        id="title"
                        name="title"
                        value={formData.title || ""}
                        onChange={handleInputChange}
                        placeholder="Enter post title"
                        className="flex-1"
                      />
                      <Button type="button" variant="outline" className="ml-2" onClick={generateSlug}>
                        Generate Slug
                      </Button>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="slug" className="block text-sm font-medium mb-1">
                      Slug*
                    </Label>
                    <Input
                      id="slug"
                      name="slug"
                      value={formData.slug || ""}
                      onChange={handleInputChange}
                      placeholder="post-slug"
                    />
                  </div>

                  <div>
                    <Label htmlFor="excerpt" className="block text-sm font-medium mb-1">
                      Excerpt*
                    </Label>
                    <Textarea
                      id="excerpt"
                      name="excerpt"
                      value={formData.excerpt || ""}
                      onChange={handleInputChange}
                      placeholder="Brief summary of the post"
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="content" className="block text-sm font-medium mb-1">
                      Content*
                    </Label>
                    <DynamicEditor value={formData.content || ""} onChange={handleEditorChange} />
                  </div>
                </div>
              </TabsContent>

              {/* SEO Tab */}
              <TabsContent value="seo">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="category" className="block text-sm font-medium mb-1">
                      Category*
                    </Label>
                    <Select
                      value={formData.category || ""}
                      onValueChange={(value) => handleSelectChange("category", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableCategories.map((category) => (
                          <SelectItem key={category.slug} value={category.slug}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="block text-sm font-medium mb-1">Tags</Label>
                    <div className="flex mb-2">
                      <Input
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        placeholder="Add a tag"
                        className="flex-1"
                      />
                      <Button type="button" variant="outline" className="ml-2" onClick={addTag}>
                        Add
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {formData.tags?.map((tag) => (
                        <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                          {tag}
                          <X className="h-3 w-3 cursor-pointer" onClick={() => removeTag(tag)} />
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Media Tab */}
              <TabsContent value="media">
                <div className="space-y-4">
                  <div>
                    <Label className="block text-sm font-medium mb-1">Cover Image</Label>
                    <div className="mt-2">
                      {formData.coverImage ? (
                        <div className="relative">
                          <img
                            src={formData.coverImage || "/placeholder.svg"}
                            alt="Cover"
                            className="w-full h-48 object-cover rounded-md"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            className="absolute top-2 right-2"
                            onClick={() => setFormData({ ...formData, coverImage: "" })}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center h-48 bg-gray-100 rounded-md">
                          <div className="text-center">
                            <ImageIcon className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                            <Button type="button" variant="outline" disabled={isUploading} className="relative">
                              {isUploading ? "Uploading..." : "Upload Cover Image"}
                              <input
                                type="file"
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                onChange={handleCoverImageUpload}
                                accept="image/*"
                                disabled={isUploading}
                              />
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="author" className="block text-sm font-medium mb-1">
                      Author Name
                    </Label>
                    <Input
                      id="author"
                      name="author.name"
                      value={formData.author?.name || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          author: { ...formData.author, name: e.target.value },
                        })
                      }
                      placeholder="Author name"
                    />
                  </div>
                </div>
              </TabsContent>

              {/* Publishing Tab */}
              <TabsContent value="publish">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="published" className="text-base">
                        Published Status
                      </Label>
                      <p className="text-sm text-gray-500">Toggle to publish or unpublish this post</p>
                    </div>
                    <Switch
                      id="published"
                      checked={formData.isPublished || false}
                      onCheckedChange={(checked) => setFormData({ ...formData, isPublished: checked })}
                    />
                  </div>

                  {formData.publishedAt && (
                    <div>
                      <Label className="block text-sm font-medium mb-1">Published Date</Label>
                      <div className="text-sm text-gray-700">{new Date(formData.publishedAt).toLocaleString()}</div>
                    </div>
                  )}
                </div>
              </TabsContent>

              {/* Statistics Tab */}
              <TabsContent value="stats">
                <div className="space-y-6">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-medium mb-4">Post Statistics</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-1">View Count</h4>
                        <div className="flex items-center gap-2">
                          <Eye className="h-5 w-5 text-purple-600" />
                          <div className="text-2xl font-bold">
                            {formData.slug ? (
                              <ViewCounter slug={formData.slug} trackView={false} className="text-gray-800" />
                            ) : (
                              <span>0 views</span>
                            )}
                          </div>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">Total number of times this post has been viewed</p>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-1">Manual View Count Adjustment</h4>
                        <div className="flex items-center gap-2">
                          <Input
                            type="number"
                            min="0"
                            value={formData.views || 0}
                            onChange={(e) => setFormData({ ...formData, views: Number.parseInt(e.target.value) || 0 })}
                            className="w-32"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => setFormData({ ...formData, views: 0 })}
                          >
                            Reset
                          </Button>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">Manually adjust the view count if needed</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                    <p className="text-yellow-800 text-sm">
                      <strong>Note:</strong> View counts are automatically tracked when visitors view your blog posts.
                      Only adjust the count manually if absolutely necessary.
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="button" variant="outline" onClick={() => router.push("/admin/blog")}>
              Cancel
            </Button>
            <div className="flex gap-2">
              <Button type="button" variant="outline" onClick={() => setActiveTab("content")}>
                Preview
              </Button>
              <Button type="submit" disabled={isSaving} className="bg-purple-600 hover:bg-purple-700">
                {isSaving ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Saving...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <Save className="mr-2 h-4 w-4" />
                    Save Post
                  </span>
                )}
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>

      
    </form>
  )
}
