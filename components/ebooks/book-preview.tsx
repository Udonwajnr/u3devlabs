"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, X, Download } from "lucide-react"
import { Button } from "@/components/ui/button"

interface BookPreviewProps {
  pages: string[]
  title: string
  onClose: () => void
}

export default function BookPreview({ pages, title, onClose }: BookPreviewProps) {
  const [currentPage, setCurrentPage] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        nextPage()
      } else if (e.key === "ArrowLeft") {
        prevPage()
      } else if (e.key === "Escape") {
        onClose()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [currentPage, pages.length])

  const nextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1)
    }
  }

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1)
    }
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4 ${isFullscreen ? "p-0" : ""}`}
    >
      <div
        className={`relative flex flex-col bg-white rounded-lg shadow-lg ${isFullscreen ? "w-full h-full" : "max-w-4xl w-full max-h-[90vh]"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-bold">Preview: {title}</h3>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={toggleFullscreen}>
              {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
            </Button>
            <Button variant="outline" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Book viewer */}
        <div className="flex-1 overflow-hidden relative flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
              className="relative h-full w-full flex items-center justify-center"
            >
              <div className="relative max-h-full max-w-full">
                <Image
                  src={pages[currentPage] || "/placeholder.svg"}
                  alt={`Page ${currentPage + 1}`}
                  width={800}
                  height={1200}
                  className="object-contain max-h-[70vh]"
                />
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation controls */}
          <div className="absolute inset-x-0 bottom-0 flex justify-between px-4 py-6">
            <Button
              variant="outline"
              size="icon"
              onClick={prevPage}
              disabled={currentPage === 0}
              className="bg-white rounded-full"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <div className="bg-black bg-opacity-60 text-white px-3 py-1 rounded-full text-sm">
              Page {currentPage + 1} of {pages.length}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={nextPage}
              disabled={currentPage === pages.length - 1}
              className="bg-white rounded-full"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500">
              Previewing {currentPage + 1} of {pages.length} pages
            </div>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Download className="h-4 w-4 mr-2" /> Buy Now to Download
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
