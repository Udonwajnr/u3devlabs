"use client"

import { useState, useEffect, use } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import BookPreview from "@/components/ebooks/book-preview"
import BookReview from "@/components/ebooks/book-review"
import type { Product, Review } from "@/lib/schemas"
import { BookOpen, DollarSign, Star, Calendar, FileText, Download, ShoppingCart, Eye, Globe, Clock } from "lucide-react"

export default function EbookDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const {slug} = use(params)
  const router = useRouter()
  const [ebook, setEbook] = useState<Product | null>(null)
  const [reviews, setReviews] = useState<Review[]>([])
  const [relatedEbooks, setRelatedEbooks] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showPreview, setShowPreview] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")
  useEffect(() => {
    const fetchEbookAndReviews = async () => {
      try {
        setIsLoading(true)

        // Fetch ebook
        const response = await fetch(`/api/products/${slug}`)
        if (!response.ok) {
          throw new Error("Failed to fetch ebook")
        }
        const data = await response.json()
        setEbook(data)

        // Fetch reviews for this ebook
        if (data.id) {
          const reviewsResponse = await fetch(`/api/products/reviews?productId=${data.id}`)
          if (reviewsResponse.ok) {
            const reviewsData = await reviewsResponse.json()
            setReviews(reviewsData)
          }
        }

        // Fetch related ebooks
        const relatedResponse = await fetch(
          `/api/products?category=${encodeURIComponent(data.category)}&productType=ebook&limit=3`,
        )
        if (relatedResponse.ok) {
          const relatedData = await relatedResponse.json()
          setRelatedEbooks(relatedData.filter((p: Product) => p.slug !== slug).slice(0, 3))
        }
      } catch (error) {
        console.error("Error fetching ebook:", error)
        setError("Failed to load ebook. Please try again.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchEbookAndReviews()
  }, [slug])

  const handleReviewAdded = (newReview: Review) => {
    setReviews([newReview, ...reviews])
  }

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

  if (error || !ebook) {
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
          <h2 className="text-2xl font-bold mb-2">Ebook Not Found</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <Button onClick={() => router.push("/ebooks")}>Return to Ebooks</Button>
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
                  <Link href="/ebooks" className="text-gray-600 hover:text-purple-600">
                    Ebooks
                  </Link>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <span className="mx-2 text-gray-400">/</span>
                  <span className="text-gray-500">{ebook.title}</span>
                </div>
              </li>
            </ol>
          </nav>
        </div>

        {/* Ebook Detail */}
        <div className="grid md:grid-cols-3 gap-12">
          {/* Ebook Cover */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <div className="relative aspect-[2/3] rounded-lg overflow-hidden shadow-lg border border-gray-200">
              <Image
                src={ebook.mainImage || "/placeholder.svg?height=600&width=400"}
                alt={ebook.title}
                fill
                className="object-cover"
              />
            </div>

            <div className="mt-6 space-y-3">
              <Button
                onClick={() => setShowPreview(true)}
                variant="outline"
                className="w-full border-purple-600 text-purple-600 hover:bg-purple-50"
              >
                <Eye className="h-4 w-4 mr-2" />
                Preview Ebook
              </Button>

              <Button className="w-full bg-purple-600 hover:bg-purple-700">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add to Cart
              </Button>

              <Button className="w-full bg-green-600 hover:bg-green-700">
                <Download className="h-4 w-4 mr-2" />
                Buy Now
              </Button>
            </div>
          </motion.div>

          {/* Ebook Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="md:col-span-2 space-y-6"
          >
            <div>
              <div className="flex flex-wrap gap-2 mb-3">
                <Badge className="bg-purple-600 hover:bg-purple-700">{ebook.category}</Badge>
                {ebook.tags?.map((tag, index) => (
                  <Badge key={index} variant="outline" className="bg-gray-100 text-gray-800 hover:bg-gray-200">
                    {tag}
                  </Badge>
                ))}
              </div>

              <h1 className="text-3xl md:text-4xl font-bold mb-2">{ebook.title}</h1>

              <div className="flex items-center mb-4">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-5 w-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <Link href="#reviews" className="ml-2 text-gray-600 hover:text-purple-600">
                  ({reviews.length} {reviews.length === 1 ? "review" : "reviews"})
                </Link>
              </div>

              <div className="mb-6">
                {ebook.salePrice ? (
                  <div className="flex items-baseline">
                    <span className="line-through text-gray-400 text-xl mr-2">${ebook.price}</span>
                    <span className="font-bold text-3xl text-purple-600">${ebook.salePrice}</span>
                    <span className="ml-2 bg-red-100 text-red-800 text-sm px-2 py-1 rounded">
                      Save ${(ebook.price - (ebook.salePrice || 0)).toFixed(2)}
                    </span>
                  </div>
                ) : (
                  <div className="font-bold text-3xl text-purple-600">${ebook.price}</div>
                )}
              </div>

              <p className="text-gray-700 mb-6">{ebook.description}</p>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                <div className="flex items-center">
                  <BookOpen className="h-5 w-5 text-purple-600 mr-2" />
                  <span className="text-gray-700">{ebook.pageCount || 0} Pages</span>
                </div>

                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-purple-600 mr-2" />
                  <span className="text-gray-700">
                    {ebook.publishDate ? new Date(ebook.publishDate).toLocaleDateString() : "Published Recently"}
                  </span>
                </div>

                <div className="flex items-center">
                  <Globe className="h-5 w-5 text-purple-600 mr-2" />
                  <span className="text-gray-700">{ebook.language || "English"}</span>
                </div>

                <div className="flex items-center">
                  <FileText className="h-5 w-5 text-purple-600 mr-2" />
                  <span className="text-gray-700">{ebook.fileFormat?.join(", ") || "PDF, EPUB"}</span>
                </div>

                <div className="flex items-center">
                  <Download className="h-5 w-5 text-purple-600 mr-2" />
                  <span className="text-gray-700">Instant Download</span>
                </div>

                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-purple-600 mr-2" />
                  <span className="text-gray-700">Lifetime Access</span>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-8">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6">
                <div className="prose max-w-none">
                  <h3 className="text-xl font-bold mb-4">About This Ebook</h3>
                  <p className="mb-4">{ebook.description}</p>

                  {ebook.features && ebook.features.length > 0 && (
                    <div className="mt-6">
                      <h4 className="text-lg font-bold mb-3">What You'll Learn</h4>
                      <ul className="space-y-2">
                        {ebook.features.map((feature, index) => (
                          <li key={index} className="flex items-start">
                            <svg
                              className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="details" className="mt-6">
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-4">Product Details</h3>
                  <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                    <div>
                      <dt className="text-sm text-gray-500">Title</dt>
                      <dd className="font-medium">{ebook.title}</dd>
                    </div>

                    <div>
                      <dt className="text-sm text-gray-500">Author</dt>
                      <dd className="font-medium">John Doe</dd>
                    </div>

                    <div>
                      <dt className="text-sm text-gray-500">Publisher</dt>
                      <dd className="font-medium">{ebook.publisher || "Self-published"}</dd>
                    </div>

                    <div>
                      <dt className="text-sm text-gray-500">Publication Date</dt>
                      <dd className="font-medium">
                        {ebook.publishDate
                          ? new Date(ebook.publishDate).toLocaleDateString()
                          : new Date(ebook.createdAt).toLocaleDateString()}
                      </dd>
                    </div>

                    <div>
                      <dt className="text-sm text-gray-500">Language</dt>
                      <dd className="font-medium">{ebook.language || "English"}</dd>
                    </div>

                    <div>
                      <dt className="text-sm text-gray-500">Pages</dt>
                      <dd className="font-medium">{ebook.pageCount || 0}</dd>
                    </div>

                    <div>
                      <dt className="text-sm text-gray-500">File Size</dt>
                      <dd className="font-medium">{ebook.fileSize || "10MB"}</dd>
                    </div>

                    <div>
                      <dt className="text-sm text-gray-500">Format</dt>
                      <dd className="font-medium">{ebook.fileFormat?.join(", ") || "PDF, EPUB"}</dd>
                    </div>

                    <div>
                      <dt className="text-sm text-gray-500">ISBN</dt>
                      <dd className="font-medium">{ebook.isbn || "N/A"}</dd>
                    </div>

                    <div>
                      <dt className="text-sm text-gray-500">Category</dt>
                      <dd className="font-medium">{ebook.category}</dd>
                    </div>
                  </dl>
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="mt-6" id="reviews">
                <BookReview productId={ebook.id || ""} reviews={reviews} onReviewAdded={handleReviewAdded} />
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>

        {/* Related Ebooks */}
        {relatedEbooks.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-16"
          >
            <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedEbooks.map((relatedEbook) => (
                <motion.div
                  key={relatedEbook.slug}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                  whileHover={{ y: -8 }}
                >
                  <Link href={`/ebooks/${relatedEbook.slug}`}>
                    <div className="relative h-[260px] w-full overflow-hidden">
                      <Image
                        src={relatedEbook.mainImage || "/placeholder.svg?height=400&width=260"}
                        fill
                        alt={relatedEbook.title}
                        className="object-cover"
                      />
                      {relatedEbook.salePrice && (
                        <div className="absolute top-2 right-2">
                          <Badge className="bg-red-500 text-white">Sale</Badge>
                        </div>
                      )}
                    </div>
                  </Link>
                  <div className="p-4">
                    <Link href={`/ebooks/${relatedEbook.slug}`}>
                      <h3 className="font-bold hover:text-purple-600 transition-colors">{relatedEbook.title}</h3>
                    </Link>
                    <div className="mt-2">
                      {relatedEbook.salePrice ? (
                        <div className="flex items-center">
                          <span className="line-through text-gray-400 mr-2">
                            <DollarSign className="h-3 w-3 inline" />
                            {relatedEbook.price}
                          </span>
                          <span className="font-bold text-purple-600">
                            <DollarSign className="h-4 w-4 inline" />
                            {relatedEbook.salePrice}
                          </span>
                        </div>
                      ) : (
                        <span className="font-bold text-purple-600">
                          <DollarSign className="h-4 w-4 inline" />
                          {relatedEbook.price}
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

      {/* Preview Modal */}
      {showPreview && ebook.previewPages && ebook.previewPages.length > 0 && (
        <BookPreview pages={ebook.previewPages} title={ebook.title} onClose={() => setShowPreview(false)} />
      )}

      <Footer />
    </div>
  )
}
