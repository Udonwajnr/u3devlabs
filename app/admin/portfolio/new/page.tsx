"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowLeft, Upload, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Alert, AlertDescription } from "@/components/ui/alert"

// Category options
const categoryOptions = [
  { id: "landing-page", name: "Landing Pages" },
  { id: "ecommerce", name: "E-commerce" },
  { id: "saas", name: "SaaS" },
  { id: "mobile-app", name: "Mobile Apps" },
  { id: "branding", name: "Branding" },
]

export default function NewPortfolioProject() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    categories: [] as string[],
    tags: [] as string[],
    date: "",
    status: "draft",
    featured: false,
  })
  const [newTag, setNewTag] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Validate form
    if (!formData.title) {
      setError("Project title is required")
      return
    }

    if (formData.categories.length === 0) {
      setError("At least one category is required")
      return
    }

    if (!imagePreview) {
      setError("Project image is required")
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      // In a real app, this would be an API call to save the project
      console.log("Submitting project:", { ...formData, image: imagePreview })

      // Redirect to portfolio list
      router.push("/admin/portfolio")
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
        <Button variant="ghost" size="icon" onClick={() => router.push("/admin/portfolio")}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold">Add New Portfolio Project</h1>
      </motion.div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        <motion.div
          className="grid gap-6 md:grid-cols-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Project Title*</Label>
              <Input
                id="title"
                name="title"
                placeholder="Enter project title"
                value={formData.title}
                onChange={handleInputChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Project Description*</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Enter project description"
                rows={5}
                value={formData.description}
                onChange={handleInputChange}
              />
            </div>

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
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="date">Project Date</Label>
              <Input id="date" name="date" type="date" value={formData.date} onChange={handleInputChange} />
            </div>

            <div className="space-y-2">
              <Label>Project Image*</Label>
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
              <Label>Project Status</Label>
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
              <Label htmlFor="featured">Featured Project</Label>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="flex justify-end gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Button type="button" variant="outline" onClick={() => router.push("/admin/portfolio")}>
            Cancel
          </Button>
          <Button type="submit" className="bg-purple-600 hover:bg-purple-700" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Project"}
          </Button>
        </motion.div>
      </form>
    </div>
  )
}
