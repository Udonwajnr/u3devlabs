"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import type { Product } from "@/lib/schemas"
import { BookOpen, DollarSign, Star, Search, Filter, X } from "lucide-react"

export default function EbooksPage() {
  const [ebooks, setEbooks] = useState<Product[]>([])
  const [filteredEbooks, setFilteredEbooks] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Filter states
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100])
  const [sortBy, setSortBy] = useState<string>("newest")
  const [showFilters, setShowFilters] = useState(false)

  // Categories
  const categories = ["All", "Fiction", "Non-Fiction", "Business", "Self-Help", "Technology", "Science", "History"]

  useEffect(() => {
    fetchEbooks()
  }, [])

  useEffect(() => {
    filterEbooks()
  }, [ebooks, searchQuery, selectedCategory, priceRange, sortBy])

  const fetchEbooks = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/products?productType=ebook")

      if (!response.ok) {
        throw new Error("Failed to fetch ebooks")
      }

      const data = await response.json()
      setEbooks(data)
      setFilteredEbooks(data)

      // Find max price for range
      if (data.length > 0) {
        const maxPrice = Math.max(...data.map((ebook: Product) => ebook.price))
        setPriceRange([0, maxPrice])
      }
    } catch (error) {
      console.error("Error fetching ebooks:", error)
      setError("Failed to load ebooks. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const filterEbooks = () => {
    let filtered = [...ebooks]

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (ebook) =>
          ebook.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          ebook.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          ebook.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
      )
    }

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter((ebook) => ebook.category === selectedCategory)
    }

    // Filter by price range
    filtered = filtered.filter((ebook) => {
      const price = ebook.salePrice ?? ebook.price
      return price >= priceRange[0] && price <= priceRange[1]
    })

    // Sort
    if (sortBy === "newest") {
      filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    } else if (sortBy === "oldest") {
      filtered.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
    } else if (sortBy === "priceLowHigh") {
      filtered.sort((a, b) => (a.salePrice ?? a.price) - (b.salePrice ?? b.price))
    } else if (sortBy === "priceHighLow") {
      filtered.sort((a, b) => (b.salePrice ?? b.price) - (a.salePrice ?? a.price))
    }

    setFilteredEbooks(filtered)
  }

  const resetFilters = () => {
    setSearchQuery("")
    setSelectedCategory("All")
    setPriceRange([0, Math.max(...ebooks.map((ebook) => ebook.price))])
    setSortBy("newest")
  }

  const handlePriceRangeChange = (value: number[]) => {
    setPriceRange([value[0], value[1]])
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-purple-100 to-white md:py-32">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge className="mb-4 px-3 py-1 bg-purple-200 text-purple-800 hover:bg-purple-300">Digital Reading</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Discover <span className="text-purple-600">Ebooks</span> That Will Change Your Life
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Expand your knowledge and fuel your imagination with our curated collection of premium ebooks.
            </p>
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                type="search"
                placeholder="Search for ebooks by title, author, or topic..."
                className="pl-10 pr-4 py-6 text-lg rounded-full shadow-md"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters (Desktop) */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full lg:w-1/4 hidden lg:block"
            >
              <div className="bg-white rounded-xl shadow-md p-6 sticky top-4">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold">Filters</h3>
                  <Button
                    onClick={resetFilters}
                    variant="ghost"
                    size="sm"
                    className="text-purple-600 hover:text-purple-800"
                  >
                    Reset All
                  </Button>
                </div>

                {/* Category Filter */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Categories</h4>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div key={category} className="flex items-center">
                        <input
                          type="radio"
                          id={`category-${category}`}
                          name="category"
                          className="h-4 w-4 text-purple-600 focus:ring-purple-500"
                          checked={selectedCategory === category}
                          onChange={() => setSelectedCategory(category)}
                        />
                        <label htmlFor={`category-${category}`} className="ml-2 text-gray-700">
                          {category}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price Range Filter */}
                <div className="mb-6">
                  <h4 className="font-medium mb-4">Price Range</h4>
                  <Slider
                    defaultValue={[0, 100]}
                    max={Math.max(...ebooks.map((ebook) => ebook.price))}
                    step={1}
                    value={[priceRange[0], priceRange[1]]}
                    onValueChange={handlePriceRangeChange}
                    className="my-6"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>

                {/* Format Filter */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Format</h4>
                  <div className="space-y-2">
                    {["PDF", "EPUB", "MOBI", "All Formats"].map((format) => (
                      <div key={format} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`format-${format}`}
                          className="h-4 w-4 text-purple-600 focus:ring-purple-500"
                        />
                        <label htmlFor={`format-${format}`} className="ml-2 text-gray-700">
                          {format}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Ebooks Grid */}
            <div className="w-full lg:w-3/4">
              {/* Mobile Filter Controls */}
              <div className="lg:hidden mb-6">
                <div className="flex justify-between items-center">
                  <Button
                    variant="outline"
                    className="flex items-center gap-2"
                    onClick={() => setShowFilters(!showFilters)}
                  >
                    <Filter className="h-4 w-4" />
                    Filters
                  </Button>

                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Newest</SelectItem>
                      <SelectItem value="oldest">Oldest</SelectItem>
                      <SelectItem value="priceLowHigh">Price: Low to High</SelectItem>
                      <SelectItem value="priceHighLow">Price: High to Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Mobile Filters Panel */}
                {showFilters && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 bg-white rounded-xl shadow-md p-6"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-bold">Filters</h3>
                      <Button variant="ghost" size="icon" onClick={() => setShowFilters(false)}>
                        <X className="h-5 w-5" />
                      </Button>
                    </div>

                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="category">
                        <AccordionTrigger>Categories</AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-2">
                            {categories.map((category) => (
                              <div key={category} className="flex items-center">
                                <input
                                  type="radio"
                                  id={`mobile-category-${category}`}
                                  name="mobile-category"
                                  className="h-4 w-4 text-purple-600 focus:ring-purple-500"
                                  checked={selectedCategory === category}
                                  onChange={() => setSelectedCategory(category)}
                                />
                                <label htmlFor={`mobile-category-${category}`} className="ml-2 text-gray-700">
                                  {category}
                                </label>
                              </div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="price">
                        <AccordionTrigger>Price Range</AccordionTrigger>
                        <AccordionContent>
                          <Slider
                            defaultValue={[0, 100]}
                            max={Math.max(...ebooks.map((ebook) => ebook.price))}
                            step={1}
                            value={[priceRange[0], priceRange[1]]}
                            onValueChange={handlePriceRangeChange}
                            className="my-6"
                          />
                          <div className="flex justify-between text-sm text-gray-600">
                            <span>${priceRange[0]}</span>
                            <span>${priceRange[1]}</span>
                          </div>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="format">
                        <AccordionTrigger>Format</AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-2">
                            {["PDF", "EPUB", "MOBI", "All Formats"].map((format) => (
                              <div key={format} className="flex items-center">
                                <input
                                  type="checkbox"
                                  id={`mobile-format-${format}`}
                                  className="h-4 w-4 text-purple-600 focus:ring-purple-500"
                                />
                                <label htmlFor={`mobile-format-${format}`} className="ml-2 text-gray-700">
                                  {format}
                                </label>
                              </div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>

                    <div className="mt-4 flex gap-3">
                      <Button className="w-full" onClick={() => setShowFilters(false)}>
                        Apply Filters
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => {
                          resetFilters()
                          setShowFilters(false)
                        }}
                      >
                        Reset
                      </Button>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Desktop Sort */}
              <div className="hidden lg:flex justify-between items-center mb-6">
                <div>
                  <p className="text-gray-600">
                    Showing <span className="font-medium">{filteredEbooks.length}</span> results
                  </p>
                </div>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[220px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="oldest">Oldest</SelectItem>
                    <SelectItem value="priceLowHigh">Price: Low to High</SelectItem>
                    <SelectItem value="priceHighLow">Price: High to Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Ebooks Grid */}
              {isLoading ? (
                <div className="flex justify-center items-center py-20">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
                </div>
              ) : error ? (
                <div className="text-center py-20">
                  <p className="text-red-500 mb-4">{error}</p>
                  <Button onClick={fetchEbooks}>Try Again</Button>
                </div>
              ) : filteredEbooks.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-xl shadow-sm p-10">
                  <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">No ebooks found</h3>
                  <p className="text-gray-500 mb-6">We couldn't find any ebooks matching your criteria.</p>
                  <Button onClick={resetFilters}>Clear Filters</Button>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredEbooks.map((ebook) => (
                    <motion.div
                      key={ebook.slug}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      whileHover={{ y: -8 }}
                      className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <Link href={`/ebooks/${ebook.slug}`}>
                        <div className="relative h-[320px] overflow-hidden">
                          <Image
                            src={ebook.mainImage || "/placeholder.svg?height=450&width=300"}
                            alt={ebook.title}
                            fill
                            className="object-cover transform transition-transform duration-500 hover:scale-110"
                          />

                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
                            <div className="absolute bottom-0 left-0 right-0 p-4">
                              <Badge className="bg-purple-600 hover:bg-purple-700">{ebook.category}</Badge>

                              <div className="flex items-center mt-2">
                                <div className="flex">
                                  {[1, 2, 3, 4, 5].map((star) => (
                                    <Star key={star} className="h-4 w-4 fill-amber-400 text-amber-400" />
                                  ))}
                                </div>
                                <span className="ml-1 text-xs text-white">(12 reviews)</span>
                              </div>
                            </div>
                          </div>

                          {ebook.salePrice && (
                            <div className="absolute top-3 right-3">
                              <Badge className="bg-red-500 text-white hover:bg-red-600">Sale</Badge>
                            </div>
                          )}
                        </div>
                      </Link>

                      <div className="p-5">
                        <Link href={`/ebooks/${ebook.slug}`}>
                          <h3 className="font-bold text-xl mb-2 hover:text-purple-600 transition-colors">
                            {ebook.title}
                          </h3>
                        </Link>

                        <p className="text-gray-600 mb-3 line-clamp-2">{ebook.description}</p>

                        <div className="flex justify-between items-center mb-4">
                          <div className="flex items-center">
                            {ebook.salePrice ? (
                              <div className="flex items-center">
                                <span className="line-through text-gray-400 mr-2">
                                  <DollarSign className="h-3 w-3 inline" />
                                  {ebook.price}
                                </span>
                                <span className="font-bold text-lg text-purple-600">
                                  <DollarSign className="h-4 w-4 inline" />
                                  {ebook.salePrice}
                                </span>
                              </div>
                            ) : (
                              <span className="font-bold text-lg text-purple-600">
                                <DollarSign className="h-4 w-4 inline" />
                                {ebook.price}
                              </span>
                            )}
                          </div>

                          <div className="flex items-center text-sm text-gray-500">
                            <BookOpen className="h-4 w-4 mr-1" />
                            <span>{ebook.pageCount || 0} pages</span>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button className="w-full bg-purple-600 hover:bg-purple-700">Buy Now</Button>
                          <Button variant="outline" className="border-purple-600 text-purple-600 hover:bg-purple-50">
                            Preview
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Pagination */}
              {filteredEbooks.length > 0 && (
                <div className="flex justify-center mt-12">
                  <nav className="flex items-center space-x-2">
                    <Button variant="outline" size="icon" disabled>
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
                        className="h-4 w-4"
                      >
                        <path d="m15 18-6-6 6-6" />
                      </svg>
                    </Button>
                    <Button variant="outline" size="icon" className="bg-purple-600 text-white">
                      1
                    </Button>
                    <Button variant="outline" size="icon">
                      2
                    </Button>
                    <Button variant="outline" size="icon">
                      3
                    </Button>
                    <Button variant="outline" size="icon">
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
                        className="h-4 w-4"
                      >
                        <path d="m9 18 6-6-6-6" />
                      </svg>
                    </Button>
                  </nav>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">What Our Readers Say</h2>
            <p className="text-gray-600">
              Join thousands of satisfied readers who have expanded their knowledge with our ebooks.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-md"
              >
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">
                  "The quality of content is exceptional. These ebooks have helped me advance in my career and expand my
                  knowledge."
                </p>
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full bg-gray-200 mr-4"></div>
                  <div>
                    <h4 className="font-bold">John Smith</h4>
                    <p className="text-gray-500 text-sm">Software Developer</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
