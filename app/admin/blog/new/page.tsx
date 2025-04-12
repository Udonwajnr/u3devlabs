"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowLeft, Upload, X, Bold, Italic, Link, List, ListOrdered, ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Category options
const categoryOptions = [
  { id: "design", name: "Design" },
  { id: "development", name: "Development" },
  { id: "business", name: "Business" },
  { id: "technology", name: "Technology" },
  { id: "tutorials", name: "Tutorials" },
]

export default function NewBlogPost() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    categories: [] as string[],
    tags: [] as string[],
    date: "",
    status: "draft",
    featured: false,
    author: "Shahed Shahriar", // Default author
  })
  const [newTag, setNewTag] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [previewMode, setPreviewMode] = useState("edit")

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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setImagePreview(null)
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Validate form
    if (!formData.title) {
      setError("Post title is required")
      return
    }

    if (!formData.excerpt) {
      setError("Post excerpt is required")
      return
    }

    if (!formData.content) {
      setError("Post content is required")
      return
    }

    if (formData.categories.length === 0) {
      setError("At least one category is required")
      return
    }

    if (!imagePreview) {
      setError("Featured image is required")
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      // In a real app, this would be an API call to save the post
      console.log("Submitting post:", { ...formData, image: imagePreview })

      // Redirect to blog list
      router.push("/admin/blog")
    }, 1500)
  }

  return (
    <div className="space-y-6">
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

      <form onSubmit={handleSubmit} className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
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
              placeholder="Enter a brief summary of your post"
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
                  placeholder="Write your post content here..."
                  rows={15}
                  value={formData.content}
                  onChange={handleInputChange}
                  className="font-mono text-sm"
                />
                <p className="text-xs text-gray-500">
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
              <Label>Categories*</Label>
              <div className="flex gap-2">
                <Select value={selectedCategory} onValueChange={handleCategorySelect}>
                  <SelectTrigger className="flex-1">
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
                <Button type="button" onClick={addCategory} disabled={!selectedCategory}>
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.categories.map((category) => (
                  <Badge key={category} className="bg-purple-100 text-purple-800 flex items-center gap-1">
                    {categoryOptions.find((c) => c.id === category)?.name || category}
                    <button type="button" onClick={() => removeCategory(category)}>
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
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
              <Select value={formData.author} onValueChange={(value) => setFormData({ ...formData, author: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Shahed Shahriar">Shahed Shahriar</SelectItem>
                  <SelectItem value="Asif Rahman">Asif Rahman</SelectItem>
                  <SelectItem value="Afia Nishat Kanta">Afia Nishat Kanta</SelectItem>
                  <SelectItem value="Shihab Uddin">Shihab Uddin</SelectItem>
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
              <Label htmlFor="date">Publication Date</Label>
              <Input id="date" name="date" type="date" value={formData.date} onChange={handleInputChange} />
            </div>

            <div className="space-y-2">
              <Label>Featured Image*</Label>
              {imagePreview ? (
                <div className="relative rounded-md overflow-hidden">
                  <img src={imagePreview || "/placeholder.svg"} alt="Preview" className="w-full h-48 object-cover" />
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
                  <Input id="image" type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                  <Button type="button" onClick={() => document.getElementById("image")?.click()}>
                    Select Image
                  </Button>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label>Post Status</Label>
              <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <Switch
                id="featured"
                checked={formData.featured}
                onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
              />
              <Label htmlFor="featured">Featured Post</Label>
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
            {isSubmitting ? "Saving..." : "Save Post"}
          </Button>
        </motion.div>
      </form>
    </div>
  )
}
