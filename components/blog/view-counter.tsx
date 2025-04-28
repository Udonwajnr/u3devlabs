"use client"

import { useState, useEffect } from "react"
import { Eye } from "lucide-react"

interface ViewCounterProps {
  slug: string
  trackView?: boolean
  className?: string
  iconSize?: number
}

export default function ViewCounter({ slug, trackView = true, className = "", iconSize = 16 }: ViewCounterProps) {
  const [views, setViews] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // useEffect(() => {
  //   // Function to fetch the current view count
  //   const fetchViews = async () => {
  //     try {
  //       const response = await fetch(`/api/blog/views?slug=${slug}`)

  //       if (!response.ok) {
  //         throw new Error("Failed to fetch view count")
  //       }

  //       const data = await response.json()
  //       setViews(data.views)
  //     } catch (err) {
  //       console.error("Error fetching view count:", err)
  //       setError("Failed to load view count")
  //     } finally {
  //       setIsLoading(false)
  //     }
  //   }

  //   // Function to increment the view count
  //   const incrementViews = async () => {
  //     try {
  //       const response = await fetch("/api/blog/views", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({ slug }),
  //       })

  //       if (!response.ok) {
  //         throw new Error("Failed to update view count")
  //       }

  //       const data = await response.json()
  //       setViews(data.views)
  //     } catch (err) {
  //       console.error("Error incrementing view count:", err)
  //       setError("Failed to update view count")

  //       // Fallback to just fetching the count if incrementing fails
  //       fetchViews()
  //     } finally {
  //       setIsLoading(false)
  //     }
  //   }

  //   // If trackView is true, increment the view count
  //   // Otherwise, just fetch the current count
  //   if (trackView) {
  //     incrementViews()
  //   } else {
  //     fetchViews()
  //   }
  // }, [slug, trackView])

  // if (isLoading) {
  //   return (
  //     <div className={`flex items-center gap-1 text-gray-400 ${className}`}>
  //       <Eye size={iconSize} />
  //       <span className="text-sm">...</span>
  //     </div>
  //   )
  // }

  // if (error) {
  //   return (
  //     <div className={`flex items-center gap-1 text-gray-400 ${className}`}>
  //       <Eye size={iconSize} />
  //       <span className="text-sm">--</span>
  //     </div>
  //   )
  // }

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <Eye size={iconSize} />
      {/* <span className="text-sm">{views?.toLocaleString() || 0} views</span> */}
    </div>
  )
}
