"use client"

import { useState, useEffect,use } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Loader2 } from "lucide-react"
import ProductForm from "@/components/admin/product-form"
import type { Product } from "@/lib/schemas"
import { toast } from "@/hooks/use-toast"

export default function EditProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const router = useRouter()
  const [product, setProduct] = useState<Product | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const {slug} = use(params)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(`/api/products/${slug}`)

        if (!response.ok) {
          throw new Error("Failed to fetch product")
        }

        const data = await response.json()
        setProduct(data)
      } catch (error) {
        console.error("Error fetching product:", error)
        setError("Failed to load product. Please try again.")
        toast({
          title: "Error",
          description: "Failed to load product. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchProduct()
  }, [slug])

 
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-purple-600 mb-4" />
        <p className="text-gray-500">Loading product...</p>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <div className="text-red-500 mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mx-auto h-8 w-8"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>
        <p className="text-gray-700 font-medium mb-2">Failed to load product</p>
        <p className="text-gray-500 mb-4">{error}</p>
        <button
          onClick={() => router.push("/admin/shop")}
          className="text-purple-600 hover:text-purple-700 font-medium"
        >
          Return to Shop Management
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-2xl font-bold">Edit Product</h1>
        <p className="text-gray-500">Update product information</p>
      </motion.div>

      <ProductForm initialData={product} isEditing={true} />
    </div>
  )
}
