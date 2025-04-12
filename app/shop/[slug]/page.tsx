"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import type { Product } from "@/lib/schemas"
import { Tag, DollarSign, ShoppingCart, ExternalLink, Check, Star, Package, RefreshCw, Shield } from "lucide-react"

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const router = useRouter()
  const [product, setProduct] = useState<Product | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(`/api/products/${params.slug}`)

        if (!response.ok) {
          throw new Error("Failed to fetch product")
        }

        const data = await response.json()
        setProduct(data)
        setSelectedImage(data.mainImage)

        // Fetch related products
        const relatedResponse = await fetch(`/api/products?category=${encodeURIComponent(data.category)}&limit=3`)
        if (relatedResponse.ok) {
          const relatedData = await relatedResponse.json()
          setRelatedProducts(relatedData.filter((p: Product) => p.slug !== params.slug).slice(0, 3))
        }
      } catch (error) {
        console.error("Error fetching product:", error)
        setError("Failed to load product. Please try again.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchProduct()
  }, [params.slug])

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        </div>
        <Footer />
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow flex flex-col justify-center items-center py-20">
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
              className="mx-auto h-12 w-12"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-2">Product Not Found</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <Button onClick={() => router.push("/shop")}>Return to Shop</Button>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="container mx-auto px-4 py-12 flex-grow">
        {/* Breadcrumb */}
        <div className="mb-8">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <Link href="/" className="text-gray-600 hover:text-purple-600">
                  Home
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <span className="mx-2 text-gray-400">/</span>
                  <Link href="/shop" className="text-gray-600 hover:text-purple-600">
                    Shop
                  </Link>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <span className="mx-2 text-gray-400">/</span>
                  <Link
                    href={`/shop?category=${encodeURIComponent(product.category)}`}
                    className="text-gray-600 hover:text-purple-600"
                  >
                    {product.category}
                  </Link>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <span className="mx-2 text-gray-400">/</span>
                  <span className="text-gray-500">{product.title}</span>
                </div>
              </li>
            </ol>
          </nav>
        </div>

        {/* Product Detail */}
        <div className="grid md:grid-cols-2 gap-12">
          {/* Product Images */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <div className="relative aspect-square rounded-lg overflow-hidden border border-gray-200">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full"
                >
                  <Image
                    src={selectedImage || "/placeholder.svg?height=600&width=600"}
                    alt={product.title}
                    fill
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>

              {product.demoUrl && (
                <div className="absolute bottom-4 right-4">
                  <Button asChild className="bg-purple-600 hover:bg-purple-700">
                    <Link href={product.demoUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" /> Live Preview
                    </Link>
                  </Button>
                </div>
              )}
            </div>

            {/* Thumbnail Gallery */}
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {product.images?.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(image)}
                  className={`relative w-20 h-20 rounded-md overflow-hidden border-2 transition-all ${
                    selectedImage === image ? "border-purple-600" : "border-gray-200 hover:border-purple-300"
                  }`}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${product.title} - Image ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div>
              <div className="flex flex-wrap gap-2 mb-3">
                <Badge variant="outline" className="bg-purple-100 text-purple-800 hover:bg-purple-200">
                  <Tag className="h-3 w-3 mr-1" />
                  {product.category}
                </Badge>
                {product.isFeatured && <Badge className="bg-amber-500 text-white hover:bg-amber-600">Featured</Badge>}
                {product.salePrice && <Badge className="bg-red-500 text-white hover:bg-red-600">Sale</Badge>}
              </div>

              <h1 className="text-3xl md:text-4xl font-bold mb-2">{product.title}</h1>

              <div className="flex items-center mb-4">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-5 w-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="ml-2 text-gray-600">(24 reviews)</span>
              </div>

              <div className="mb-6">
                {product.salePrice ? (
                  <div className="flex items-baseline">
                    <span className="line-through text-gray-400 text-xl mr-2">
                      <DollarSign className="h-4 w-4 inline" />
                      {product.price}
                    </span>
                    <span className="font-bold text-3xl text-purple-600">
                      <DollarSign className="h-6 w-6 inline" />
                      {product.salePrice}
                    </span>
                    <span className="ml-2 bg-red-100 text-red-800 text-sm px-2 py-1 rounded">
                      Save ${(product.price - (product.salePrice || 0)).toFixed(2)}
                    </span>
                  </div>
                ) : (
                  <div className="font-bold text-3xl text-purple-600">
                    <DollarSign className="h-6 w-6 inline" />
                    {product.price}
                  </div>
                )}
              </div>

              <p className="text-gray-700 mb-6">{product.description}</p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-gray-700">{product.stock > 0 ? "In Stock" : "Out of Stock"}</span>
                </div>

                <div className="flex items-center">
                  <Package className="h-5 w-5 text-purple-600 mr-2" />
                  <span className="text-gray-700">Digital Download</span>
                </div>

                <div className="flex items-center">
                  <RefreshCw className="h-5 w-5 text-purple-600 mr-2" />
                  <span className="text-gray-700">Free Updates</span>
                </div>

                <div className="flex items-center">
                  <Shield className="h-5 w-5 text-purple-600 mr-2" />
                  <span className="text-gray-700">6 Months Support</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <motion.div className="flex-1" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Button className="w-full bg-purple-600 hover:bg-purple-700 text-lg py-6">
                    <ShoppingCart className="h-5 w-5 mr-2" /> Add to Cart
                  </Button>
                </motion.div>

                <motion.div className="flex-1" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-lg py-6">Buy Now</Button>
                </motion.div>
              </div>

              {/* Tags */}
              {product.tags && product.tags.length > 0 && (
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="bg-gray-100 text-gray-800 hover:bg-gray-200">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Product Features */}
        {product.features && product.features.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-16"
          >
            <h2 className="text-2xl font-bold mb-6">Features</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {product.features.map((feature, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <Check className="h-5 w-5 text-green-500" />
                  </div>
                  <p className="ml-3 text-gray-700">{feature}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-16"
          >
            <h2 className="text-2xl font-bold mb-6">Related Products</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <motion.div
                  key={relatedProduct.slug}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                  whileHover={{ y: -8 }}
                >
                  <Link href={`/shop/${relatedProduct.slug}`}>
                    <div className="relative h-[200px] w-full overflow-hidden">
                      <Image
                        src={relatedProduct.mainImage || "/placeholder.svg?height=400&width=600"}
                        width={400}
                        height={200}
                        alt={relatedProduct.title}
                        className="w-full h-full object-cover"
                      />
                      {relatedProduct.salePrice && (
                        <div className="absolute top-2 right-2">
                          <Badge className="bg-red-500 text-white">Sale</Badge>
                        </div>
                      )}
                    </div>
                  </Link>
                  <div className="p-4">
                    <Link href={`/shop/${relatedProduct.slug}`}>
                      <h3 className="font-bold hover:text-purple-600 transition-colors">{relatedProduct.title}</h3>
                    </Link>
                    <div className="mt-2">
                      {relatedProduct.salePrice ? (
                        <div className="flex items-center">
                          <span className="line-through text-gray-400 mr-2">
                            <DollarSign className="h-3 w-3 inline" />
                            {relatedProduct.price}
                          </span>
                          <span className="font-bold text-purple-600">
                            <DollarSign className="h-4 w-4 inline" />
                            {relatedProduct.salePrice}
                          </span>
                        </div>
                      ) : (
                        <span className="font-bold text-purple-600">
                          <DollarSign className="h-4 w-4 inline" />
                          {relatedProduct.price}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      <Footer />
    </div>
  )
}
