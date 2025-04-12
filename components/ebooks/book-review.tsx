"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Star, User, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { toast } from "@/hooks/use-toast"
import type { Review } from "@/lib/schemas"

interface BookReviewProps {
  productId: string
  reviews: Review[]
  onReviewAdded: (review: Review) => void
}

export default function BookReview({ productId, reviews, onReviewAdded }: BookReviewProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [rating, setRating] = useState(5)
  const [hoverRating, setHoverRating] = useState(0)
  const [reviewTitle, setReviewTitle] = useState("")
  const [reviewComment, setReviewComment] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!reviewTitle || !reviewComment || !name || !email) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      })
      return
    }

    try {
      setIsSubmitting(true)

      const review = {
        productId,
        userName: name,
        userEmail: email,
        rating,
        title: reviewTitle,
        comment: reviewComment,
      }

      const response = await fetch("/api/products/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(review),
      })

      if (!response.ok) {
        throw new Error("Failed to submit review")
      }

      const data = await response.json()

      toast({
        title: "Success",
        description: "Your review has been submitted and is pending approval.",
      })

      onReviewAdded(data)

      // Reset form
      setRating(5)
      setReviewTitle("")
      setReviewComment("")
      setName("")
      setEmail("")
      setShowReviewForm(false)
    } catch (error) {
      console.error("Error submitting review:", error)
      toast({
        title: "Error",
        description: "Failed to submit review. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Calculate average rating
  const averageRating =
    reviews.length > 0 ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length : 0

  // Get rating counts
  const ratingCounts = [5, 4, 3, 2, 1].map((rating) => ({
    rating,
    count: reviews.filter((review) => review.rating === rating).length,
    percentage:
      reviews.length > 0 ? (reviews.filter((review) => review.rating === rating).length / reviews.length) * 100 : 0,
  }))

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Overall Rating */}
        <div className="w-full md:w-1/3">
          <div className="bg-gray-50 p-6 rounded-xl">
            <h3 className="text-xl font-bold mb-4">Customer Reviews</h3>

            <div className="flex items-baseline mb-4">
              <span className="text-4xl font-bold mr-2">{averageRating.toFixed(1)}</span>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-5 w-5 ${
                      star <= Math.round(averageRating) ? "fill-amber-400 text-amber-400" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>

            <p className="text-sm text-gray-500 mb-6">
              Based on {reviews.length} {reviews.length === 1 ? "review" : "reviews"}
            </p>

            {/* Rating Breakdown */}
            <div className="space-y-2">
              {ratingCounts.map((item) => (
                <div key={item.rating} className="flex items-center">
                  <div className="flex items-center w-16">
                    <span className="text-sm mr-1">{item.rating}</span>
                    <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                  </div>
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-400 rounded-full" style={{ width: `${item.percentage}%` }}></div>
                  </div>
                  <span className="text-sm ml-2 w-8">{item.count}</span>
                </div>
              ))}
            </div>
          </div>

          {!showReviewForm && (
            <Button onClick={() => setShowReviewForm(true)} className="w-full mt-4 bg-purple-600 hover:bg-purple-700">
              Write a Review
            </Button>
          )}
        </div>

        {/* Review Form or Reviews List */}
        <div className="w-full md:w-2/3">
          {showReviewForm ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Write a Review</h3>
                <Button variant="ghost" size="sm" onClick={() => setShowReviewForm(false)}>
                  Cancel
                </Button>
              </div>

              <form onSubmit={handleSubmitReview}>
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">Your Rating*</label>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="focus:outline-none"
                      >
                        <Star
                          className={`h-8 w-8 ${
                            star <= (hoverRating || rating) ? "fill-amber-400 text-amber-400" : "text-gray-300"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <label htmlFor="reviewTitle" className="block text-sm font-medium mb-2">
                    Review Title*
                  </label>
                  <Input
                    id="reviewTitle"
                    value={reviewTitle}
                    onChange={(e) => setReviewTitle(e.target.value)}
                    placeholder="Summarize your experience"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="reviewComment" className="block text-sm font-medium mb-2">
                    Review*
                  </label>
                  <Textarea
                    id="reviewComment"
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    placeholder="What did you like or dislike about this ebook?"
                    className="min-h-[120px]"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Your Name*
                    </label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="John Doe"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Your Email*
                    </label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="john@example.com"
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">Your email will not be published</p>
                  </div>
                </div>

                <Button type="submit" className="bg-purple-600 hover:bg-purple-700" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit Review"}
                </Button>
              </form>
            </motion.div>
          ) : (
            <div className="space-y-6">
              {reviews.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-xl">
                  <User className="h-12 w-12 mx-auto text-gray-300 mb-3" />
                  <h3 className="text-lg font-bold mb-2">No Reviews Yet</h3>
                  <p className="text-gray-500 mb-4">Be the first to review this ebook</p>
                  <Button onClick={() => setShowReviewForm(true)} className="bg-purple-600 hover:bg-purple-700">
                    Write a Review
                  </Button>
                </div>
              ) : (
                reviews.map((review, index) => (
                  <motion.div
                    key={review.id || index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm"
                  >
                    <div className="flex justify-between">
                      <div className="flex items-start">
                        <div className="bg-gray-100 h-10 w-10 rounded-full flex items-center justify-center mr-3">
                          <User className="h-5 w-5 text-gray-500" />
                        </div>
                        <div>
                          <h4 className="font-bold">{review.userName}</h4>
                          <div className="flex items-center">
                            <div className="flex mr-2">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`h-4 w-4 ${
                                    star <= review.rating ? "fill-amber-400 text-amber-400" : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-gray-500">
                              {new Date(review.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                      {review.isVerified && (
                        <div className="flex items-center text-green-600 text-sm">
                          <Check className="h-4 w-4 mr-1" /> Verified Purchase
                        </div>
                      )}
                    </div>

                    <div className="mt-4">
                      <h5 className="font-medium mb-2">{review.title}</h5>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
