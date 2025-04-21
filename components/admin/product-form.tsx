"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { X, Plus, Upload, Trash2, DollarSign, Tag, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/hooks/use-toast"
import { uploadImage } from "@/lib/upload"
import type { Product } from "@/lib/schemas"
import axios from "axios"

interface ProductFormProps {
  initialData?: Product
  isEditing?: boolean
}

export default function ProductForm({ initialData, isEditing = false }: ProductFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  // Replace with this to properly initialize with initialData when available
  const [product, setProduct] = useState<Partial<Product>>(() => {
    if (isEditing && initialData) {
      console.log("Initializing form with data:", initialData)
      return { ...initialData }
    }

    return {
      title: "",
      slug: "",
      description: "",
      price: 0,
      salePrice: undefined,
      category: "HTML Templates", // Default category
      tags: [],
      features: [],
      images: [],
      mainImage: "",
      isPublished: false,
      isFeatured: false,
      stock: 10,
      demoUrl: "",
    }
  })
  const [newTag, setNewTag] = useState("")
  const [newFeature, setNewFeature] = useState("")
  const [imageUploading, setImageUploading] = useState(false)

  // Generate slug from title
  useEffect(() => {
    if (!isEditing && product.title && !product.slug) {
      setProduct((prevProduct:any) => ({
        ...prevProduct,
        slug: prevProduct.title
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^a-z0-9-]/g, ""),
      }))
    }
  }, [product.title, isEditing])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target

    if (name === "price" || name === "salePrice" || name === "stock") {
      setProduct({
        ...product,
        [name]: Number.parseFloat(value) || 0,
      })
    } else {
      setProduct({
        ...product,
        [name]: value,
      })
    }
  }

  const handleSwitchChange = (name: string, checked: boolean) => {
    setProduct({
      ...product,
      [name]: checked,
    })
  }

  const handleAddTag = () => {
    if (newTag.trim() && !product.tags?.includes(newTag.trim())) {
      setProduct({
        ...product,
        tags: [...(product.tags || []), newTag.trim()],
      })
      setNewTag("")
    }
  }

  const handleRemoveTag = (tag: string) => {
    setProduct({
      ...product,
      tags: product.tags?.filter((t) => t !== tag) || [],
    })
  }

  const handleAddFeature = () => {
    if (newFeature.trim() && !product.features?.includes(newFeature.trim())) {
      setProduct({
        ...product,
        features: [...(product.features || []), newFeature.trim()],
      })
      setNewFeature("")
    }
  }

  const handleRemoveFeature = (feature: string) => {
    setProduct({
      ...product,
      features: product.features?.filter((f) => f !== feature) || [],
    })
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    try {
      setImageUploading(true)
      const file = files[0]
      const imageUrl = await uploadImage(file)

      if (!product.mainImage) {
        setProduct({
          ...product,
          mainImage: imageUrl,
          images: [...(product.images || []), imageUrl],
        })
      } else {
        setProduct({
          ...product,
          images: [...(product.images || []), imageUrl],
        })
      }

      toast({
        title: "Success",
        description: "Image uploaded successfully",
      })
    } catch (error) {
      console.error("Error uploading image:", error)
      toast({
        title: "Error",
        description: "Failed to upload image. Please try again.",
        variant: "destructive",
      })
    } finally {
      setImageUploading(false)
    }
  }

  const handleRemoveImage = (imageUrl: string) => {
    const updatedImages = product.images?.filter((img) => img !== imageUrl) || []

    setProduct({
      ...product,
      images: updatedImages,
      mainImage:
        product.mainImage === imageUrl ? (updatedImages.length > 0 ? updatedImages[0] : "") : product.mainImage,
    })
  }

  const setAsMainImage = (imageUrl: string) => {
    setProduct({
      ...product,
      mainImage: imageUrl,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!product.title || !product.slug || !product.description || !product.mainImage) {
      toast({
        title: "Error",
        description: "Please fill in all required fields and upload at least one image.",
        variant: "destructive",
      })
      return
    }

    try {
      setIsSubmitting(true)

      const url = isEditing ? `/api/products/${initialData?.slug}` : "/api/products"
      const method = isEditing ? "put" : "post"

      // Using axios instead of fetch
      const response = await axios({
        method,
        url,
        data: product, // Axios uses 'data' instead of 'body'
        headers: {
          "Content-Type": "application/json",
        },
      })

      // Axios automatically parses JSON and puts the response in .data
      toast({
        title: "Success",
        description: isEditing ? "Product updated successfully" : "Product created successfully",
      })

      router.push("/admin/shop")
    } catch (error: any) {
      console.error("Error saving product:", error)

      // Axios error handling is different
      const errorMessage = error.response?.data?.error || error.message || "Failed to save product. Please try again."

      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Basic Information */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="title">Product Title *</Label>
            <Input
              id="title"
              name="title"
              value={product.title}
              onChange={handleChange}
              placeholder="Enter product title"
              required
            />
          </div>

          <div>
            <Label htmlFor="slug">Slug *</Label>
            <Input
              id="slug"
              name="slug"
              value={product.slug}
              onChange={handleChange}
              placeholder="product-url-slug"
              required
            />
            <p className="text-sm text-gray-500 mt-1">This will be used in the product URL</p>
          </div>

          <div>
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              name="description"
              value={product.description}
              onChange={handleChange}
              placeholder="Enter product description"
              rows={4}
              required
            />
          </div>

          <div>
            <Label htmlFor="category">Category *</Label>
            <select
              id="category"
              name="category"
              value={product.category}
              onChange={handleChange}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              required
            >
              <option value="HTML Templates">HTML Templates</option>
              <option value="UI Kits">UI Kits</option>
              <option value="WordPress Themes">WordPress Themes</option>
              <option value="Graphics">Graphics</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="price">Price ($) *</Label>
              <div className="relative">
                <DollarSign className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  id="price"
                  name="price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={product.price}
                  onChange={handleChange}
                  className="pl-8"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="salePrice">Sale Price ($)</Label>
              <div className="relative">
                <DollarSign className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  id="salePrice"
                  name="salePrice"
                  type="number"
                  min="0"
                  step="0.01"
                  value={product.salePrice || ""}
                  onChange={handleChange}
                  className="pl-8"
                  placeholder="Optional"
                />
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="stock">Stock Quantity *</Label>
            <Input
              id="stock"
              name="stock"
              type="number"
              min="0"
              value={product.stock}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="demoUrl">Demo URL</Label>
            <Input
              id="demoUrl"
              name="demoUrl"
              type="url"
              value={product.demoUrl || ""}
              onChange={handleChange}
              placeholder="https://example.com/demo"
            />
          </div>
        </div>

        {/* Images, Tags, Features */}
        <div className="space-y-6">
          <div>
            <Label>Product Images *</Label>
            <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-4">
              {product.images?.map((image, index) => (
                <div key={index} className="relative group">
                  <div
                    className={`aspect-square rounded-md overflow-hidden border-2 ${product.mainImage === image ? "border-purple-600" : "border-gray-200"}`}
                  >
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`Product image ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="mr-2"
                      onClick={() => handleRemoveImage(image)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    {product.mainImage !== image && (
                      <Button type="button" variant="secondary" size="sm" onClick={() => setAsMainImage(image)}>
                        <Check className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  {product.mainImage === image && <Badge className="absolute top-2 left-2 bg-purple-600">Main</Badge>}
                </div>
              ))}

              <div className="aspect-square rounded-md border-2 border-dashed border-gray-300 flex items-center justify-center">
                <Label
                  htmlFor="image-upload"
                  className="flex flex-col items-center justify-center cursor-pointer w-full h-full"
                >
                  <Upload className="h-6 w-6 text-gray-400 mb-2" />
                  <span className="text-sm text-gray-500">Upload</span>
                  <Input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    disabled={imageUploading}
                  />
                </Label>
              </div>
            </div>
            {imageUploading && (
              <div className="mt-2 flex items-center text-sm text-gray-500">
                <svg
                  className="animate-spin h-4 w-4 text-purple-600 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Uploading image...
              </div>
            )}
          </div>

          <div>
            <Label>Tags</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {product.tags?.map((tag, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="flex items-center gap-1 bg-purple-100 text-purple-800"
                >
                  <Tag className="h-3 w-3" />
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-1 text-purple-800 hover:text-purple-900"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
            <div className="flex mt-2">
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Add a tag"
                className="mr-2"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    handleAddTag()
                  }
                }}
              />
              <Button type="button" variant="outline" onClick={handleAddTag} disabled={!newTag.trim()}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div>
            <Label>Features</Label>
            <div className="space-y-2 mt-2">
              {product.features?.map((feature, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded-md">
                  <span>{feature}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveFeature(feature)}
                    className="text-gray-500 hover:text-red-500"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex mt-2">
              <Input
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                placeholder="Add a feature"
                className="mr-2"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    handleAddFeature()
                  }
                }}
              />
              <Button type="button" variant="outline" onClick={handleAddFeature} disabled={!newFeature.trim()}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="isPublished" className="cursor-pointer">
                Publish Product
              </Label>
              <Switch
                id="isPublished"
                checked={product.isPublished}
                onCheckedChange={(checked) => handleSwitchChange("isPublished", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="isFeatured" className="cursor-pointer">
                Feature on Homepage
              </Label>
              <Switch
                id="isFeatured"
                checked={product.isFeatured}
                onCheckedChange={(checked) => handleSwitchChange("isFeatured", checked)}
              />
            </div>
          </div>
        </div>
      </motion.div>

      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={() => router.push("/admin/shop")}>
          Cancel
        </Button>
        <Button type="submit" className="bg-purple-600 hover:bg-purple-700" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Saving...
            </>
          ) : (
            <>{isEditing ? "Update" : "Create"} Product</>
          )}
        </Button>
      </div>
    </form>
  )
}
