"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import type { Product } from "@/lib/schemas"
import { Tag, DollarSign, Eye, ShoppingCart, ExternalLink } from "lucide-react"

// Product categories
const categories = ["All", "HTML Templates", "UI Kits", "WordPress Themes", "Graphics"]

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchProducts()
  }, [selectedCategory])

  const fetchProducts = async () => {
    try {
      setIsLoading(true)
      const url = selectedCategory === "All" 
        ? "/api/products" 
        : `/api/products?category=${encodeURIComponent(selectedCategory)}`
      
      const response = await fetch(url)
      
      if (!response.ok) {
        throw new Error("Failed to fetch products")
      }
      
      const data = await response.json()
      setProducts(data)
    } catch (error) {
      console.error("Error fetching products:", error)
      setError("Failed to load products. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-purple-50 to-white pt-32 md:py-25">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Digital Products Shop</h1>
            <p className="text-xl text-gray-600 mb-8">
              Premium templates, themes, and digital assets to accelerate your projects.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Shop Section */}
      <section className="py-16 ">
        <div className="container mx-auto px-4">
          {/* Category Tabs */}
          <Tabs defaultValue="All" value={selectedCategory} onValueChange={setSelectedCategory} className="mb-12">
            <div className="flex justify-center">
              <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-2">
                {categories.map((category) => (
                  <TabsTrigger
                    key={category}
                    value={category}
                    className="data-[state=active]:bg-purple-600 data-[state=active]:text-white transition-all duration-300"
                  >
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
          </Tabs>

          {/* Products Grid */}
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-red-500 mb-4">{error}</p>
              <Button onClick={fetchProducts}>Try Again</Button>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg mb-4">No products found in this category.</p>
              <Button onClick={() => setSelectedCategory("All")}>View All Products</Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <motion.div
                  key={product.slug}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ y: -8 }}
                >
                  <div className="relative">
                    <Link href={`/shop/${product.slug}`}>
                      <div className="relative h-[250px] w-full overflow-hidden group">
                        <Image
                          src={product.mainImage || "/placeholder.svg?height=400&width=600"}
                          width={600}
                          height={400}
                          alt={product.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                          <div className="bg-white rounded-full p-2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                            <Eye className="h-5 w-5 text-purple-600" />
                          </div>
                        </div>
                      </div>
                    </Link>
                    <div className="absolute top-4 right-4 flex flex-col gap-2">
                      {product.salePrice ? (
                        <Badge className="bg-red-500 text-white hover:bg-red-600">
                          Sale
                        </Badge>
                      ) : null}
                      {product.isFeatured && (
                        <Badge className="bg-amber-500 text-white hover:bg-amber-600">
                          Featured
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex flex-wrap gap-2 mb-3">
                      <Badge
                        variant="outline"
                        className="bg-purple-100 text-purple-800 hover:bg-purple-200"
                      >
                        <Tag className="h-3 w-3 mr-1" />
                        {product.category}
                      </Badge>
                      {product.tags?.slice(0, 2).map((tag, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="bg-gray-100 text-gray-800 hover:bg-gray-200"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <Link href={`/shop/${product.slug}`}>
                      <h3 className="text-xl font-bold mb-2 hover:text-purple-600 transition-colors">
                        {product.title}
                      </h3>
                    </Link>
                    <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center">
                        {product.salePrice ? (
                          <div className="flex items-center">
                            <span className="line-through text-gray-400 mr-2">
                              <DollarSign className="h-3 w-3 inline" />
                              {product.price}
                            </span>
                            <span className="font-bold text-lg text-purple-600">
                              <DollarSign className="h-4 w-4 inline" />
                              {product.salePrice}
                            </span>
                          </div>
                        ) : (
                          <span className="font-bold text-lg text-purple-600">
                            <DollarSign className="h-4 w-4 inline" />
                            {product.price}
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-gray-500">
                        {product.stock > 0 ? (
                          <span className="text-green-600">In Stock</span>
                        ) : (
                          <span className="text-red-500">Out of Stock</span>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button className="bg-purple-600 hover:bg-purple-700 transition-all duration-300 w-full">
                          <ShoppingCart className="h-4 w-4 mr-2" /> Buy Now
                        </Button>
                      </motion.div>
                      {product.demoUrl && (
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button
                            variant="outline"
                            className="border-purple-600 text-purple-600 hover:bg-purple-50"
                            asChild
                          >
                            <Link href={product.demoUrl} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-4 w-4 mr-2" /> Demo
                            </Link>
                          </Button>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-4">Why Choose Our Products</h2>
            <p className="text-gray-600">
              Our digital products are crafted with attention to detail and designed to help you succeed.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              className="bg-white p-6 rounded-xl shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="bg-purple-100 p-3 rounded-full w-fit mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L15 8L21 9L16.5 14L18 20L12 17L6 20L7.5 14L3 9L9 8L12 2Z" fill="#9333EA" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Premium Quality</h3>
              <p className="text-gray-600">
                All our products are meticulously crafted with clean code and modern design principles.
              </p>
            </motion.div>

            <motion.div
              className="bg-white p-6 rounded-xl shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="bg-purple-100 p-3 rounded-full w-fit mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path  viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"/>
                  <path
                    d="M19 8L15 12H18C18 15.31 15.31 18 12 18C10.99 18 10.03 17.75 9.2 17.3L7.74 18.76C8.97 19.54 10.43 20 12 20C16.42 20 20 16.42 20 12H23L19 8ZM6 12C6 8.69 8.69 6 12 6C13.01 6 13.97 6.25 14.8 6.7L16.26 5.24C15.03 4.46 13.57 4 12 4C7.58 4 4 7.58 4 12H1L5 16L9 12H6Z"
                    fill="#9333EA"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Regular Updates</h3>
              <p className="text-gray-600">
                We continuously improve our products with new features and security updates.
              </p>
            </motion.div>

            <motion.div
              className="bg-white p-6 rounded-xl shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="bg-purple-100 p-3 rounded-full w-fit mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M11.5 2C6.81 2 3 5.81 3 10.5C3 15.19 6.81 19 11.5 19H12V22C16.86 19.66 20 15 20 10.5C20 5.81 16.19 2 11.5 2ZM12.5 16.5H10.5V14.5H12.5V16.5ZM12.5 13H10.5C10.5 9.75 13.5 10 13.5 8C13.5 6.9 12.6 6 11.5 6C10.4 6 9.5 6.9 9.5 8H7.5C7.5 5.79 9.29 4 11.5 4C13.71 4 15.5 5.79 15.5 8C15.5 10.5 12.5 10.75 12.5 13Z"
                    fill="#9333EA"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Dedicated Support</h3>
              <p className="text-gray-600">
                Our team is ready to assist you with any questions or issues you may encounter.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            className="bg-purple-600 text-white p-8 md:p-12 rounded-xl text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-4">Need a Custom Solution?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              We also offer custom development services tailored to your specific requirements.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className="bg-white text-purple-600 hover:bg-gray-100 transition-all duration-300">
                Contact Us for Custom Work
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
