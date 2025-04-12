"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ShareButtons from "@/components/blog/share-buttons"

// Blog posts data (same as in the blog detail page)
const blogPosts = [
  {
    id: 1,
    title: "The Art of Minimalist Design",
    slug: "the-art-of-minimalist-design",
    date: "2024-01-15",
    author: "Jane Doe",
    excerpt: "Explore the principles of minimalist design and how it can transform your living space.",
    image: "/images/blog/minimalist-design.jpg",
    category: "Design",
    tags: ["minimalism", "design", "interior"],
    content: "Detailed content about minimalist design...",
  },
  {
    id: 2,
    title: "Sustainable Living: A Beginner's Guide",
    slug: "sustainable-living-a-beginners-guide",
    date: "2024-02-01",
    author: "John Smith",
    excerpt: "Learn practical tips for adopting a sustainable lifestyle and reducing your environmental impact.",
    image: "/images/blog/sustainable-living.jpg",
    category: "Lifestyle",
    tags: ["sustainability", "eco-friendly", "lifestyle"],
    content: "Detailed content about sustainable living...",
  },
  {
    id: 3,
    title: "The Power of Meditation",
    slug: "the-power-of-meditation",
    date: "2024-02-15",
    author: "Emily White",
    excerpt: "Discover the benefits of meditation for mental health and well-being.",
    image: "/images/blog/meditation.jpg",
    category: "Wellness",
    tags: ["meditation", "mindfulness", "wellness"],
    content: "Detailed content about the power of meditation...",
  },
  {
    id: 4,
    title: "Mastering the Art of Photography",
    slug: "mastering-the-art-of-photography",
    date: "2024-03-01",
    author: "David Brown",
    excerpt: "A comprehensive guide to improving your photography skills and capturing stunning images.",
    image: "/images/blog/photography.jpg",
    category: "Photography",
    tags: ["photography", "art", "camera"],
    content: "Detailed content about mastering photography...",
  },
]

const featuredPosts = blogPosts.slice(0, 2)

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredPosts, setFilteredPosts] = useState(blogPosts)

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value
    setSearchTerm(term)
    const filtered = blogPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(term.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(term.toLowerCase()),
    )
    setFilteredPosts(filtered)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 py-16 md:py-24 relative bg-gradient-to-b from-purple-50 to-white">
        <div className="container mx-auto text-center">
          <motion.h1
            className="text-4xl md:text-6xl font-bold text-gray-800 mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75 }}
          >
            Explore Our Latest Insights
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-gray-600 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.2 }}
          >
            Dive deep into the world of technology, design, and innovation.
          </motion.p>

          {/* Search Bar */}
          <div className="max-w-md mx-auto">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search articles..."
                className="w-full rounded-full py-3 pl-5 pr-12 shadow-md focus:ring-2 focus:ring-purple-500"
                value={searchTerm}
                onChange={handleSearch}
              />
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-16 relative">
        <div className="container mx-auto">
          <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">Featured Posts</h2>

          {/* Add share buttons to each featured post card */}
          <div className="grid md:grid-cols-2 gap-8">
            {featuredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={`/blog/${post.slug}`} className="block relative">
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    width={800}
                    height={400}
                    className="w-full h-56 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-2">{post.title}</h3>
                    <p className="text-gray-600">{post.excerpt}</p>
                    <div className="mt-4 flex justify-between items-center">
                      <span className="text-gray-500 text-sm">
                        {post.author} - {new Date(post.date).toLocaleDateString()}
                      </span>
                      <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-200">{post.category}</Badge>
                    </div>
                  </div>
                </Link>

                {/* Add share buttons at the bottom of each card */}
                <div className="px-6 pb-6 pt-2 flex justify-between items-center border-t mt-4">
                  <span className="text-sm text-gray-500">Share this article</span>
                  <ShareButtons
                    title={post.title}
                    url={`https://u3devlab.com/blog/${post.slug}`}
                    excerpt={post.excerpt}
                    direction="horizontal"
                    size="sm"
                    variant="ghost"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* All Posts */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">All Posts</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Link href={`/blog/${post.slug}`} className="block">
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    width={800}
                    height={400}
                    className="w-full h-56 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{post.title}</h3>
                    <p className="text-gray-600">{post.excerpt}</p>
                    <div className="mt-4 flex justify-between items-center">
                      <span className="text-gray-500 text-sm">
                        {post.author} - {new Date(post.date).toLocaleDateString()}
                      </span>
                      <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-200">{post.category}</Badge>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
