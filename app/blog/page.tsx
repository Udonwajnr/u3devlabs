"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ShareButtons from "@/components/blog/share-buttons"
import ViewCounter from "@/components/blog/view-counter"

// Decorative SVG components
const StarIcon = ({ className, size = 24, fill = "#9333EA" }: { className?: string; size?: number; fill?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path d="M12 0L14.59 8.41L23 11L14.59 13.59L12 22L9.41 13.59L1 11L9.41 8.41L12 0Z" fill={fill} />
  </svg>
)

const CircleIcon = ({ className, size = 24, fill = "#9333EA" }: { className?: string; size?: number; fill?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <circle cx="12" cy="12" r="12" fill={fill} />
  </svg>
)

const DotsPattern = ({ className }: { className?: string}) => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="4" cy="4" r="4" fill="#9333EA" fillOpacity="0.3" />
    <circle cx="4" cy="24" r="4" fill="#9333EA" fillOpacity="0.3" />
    <circle cx="4" cy="44" r="4" fill="#9333EA" fillOpacity="0.3" />
    <circle cx="4" cy="64" r="4" fill="#9333EA" fillOpacity="0.3" />
    <circle cx="24" cy="4" r="4" fill="#9333EA" fillOpacity="0.3" />
    <circle cx="24" cy="24" r="4" fill="#9333EA" fillOpacity="0.3" />
    <circle cx="24" cy="44" r="4" fill="#9333EA" fillOpacity="0.3" />
    <circle cx="24" cy="64" r="4" fill="#9333EA" fillOpacity="0.3" />
    <circle cx="44" cy="4" r="4" fill="#9333EA" fillOpacity="0.3" />
    <circle cx="44" cy="24" r="4" fill="#9333EA" fillOpacity="0.3" />
    <circle cx="44" cy="44" r="4" fill="#9333EA" fillOpacity="0.3" />
    <circle cx="44" cy="64" r="4" fill="#9333EA" fillOpacity="0.3" />
    <circle cx="64" cy="4" r="4" fill="#9333EA" fillOpacity="0.3" />
    <circle cx="64" cy="24" r="4" fill="#9333EA" fillOpacity="0.3" />
    <circle cx="64" cy="44" r="4" fill="#9333EA" fillOpacity="0.3" />
    <circle cx="64" cy="64" r="4" fill="#9333EA" fillOpacity="0.3" />
  </svg>
)

// Blog posts data (same as in the blog detail page)
const blogPosts = [
  {
    id: 1,
    title: "10 UI/UX Design Trends to Watch in 2024",
    excerpt:
      "Discover the latest design trends that are shaping the digital landscape and how you can incorporate them into your projects.",
    image: "/placeholder.svg?height=600&width=1200",
    date: "May 15, 2024",
    author: "Shahed Shahriar",
    authorImage: "/placeholder.svg?height=100&width=100",
    categories: ["design"],
    slug: "ui-ux-design-trends-2024",
    featured: true,
  },
  {
    id: 2,
    title: "The Future of Web Development: What to Expect in the Next 5 Years",
    excerpt:
      "From WebAssembly to AI-driven development, explore the technologies that will define the future of web development.",
    image: "/placeholder.svg?height=600&width=1200",
    date: "May 10, 2024",
    author: "Asif Rahman",
    authorImage: "/placeholder.svg?height=100&width=100",
    categories: ["development", "technology"],
    slug: "future-of-web-development",
    featured: true,
  },
  {
    id: 3,
    title: "How to Optimize Your Website for Better Performance",
    excerpt:
      "Learn practical techniques to improve your website's loading speed and overall performance for better user experience.",
    image: "/placeholder.svg?height=400&width=600",
    date: "May 5, 2024",
    author: "Asif Rahman",
    authorImage: "/placeholder.svg?height=100&width=100",
    categories: ["development", "tutorials"],
    slug: "optimize-website-performance",
  },
  {
    id: 4,
    title: "Building Accessible Web Applications: A Comprehensive Guide",
    excerpt:
      "Discover how to create web applications that are accessible to all users, including those with disabilities.",
    image: "/placeholder.svg?height=400&width=600",
    date: "April 28, 2024",
    author: "Afia Nishat Kanta",
    authorImage: "/placeholder.svg?height=100&width=100",
    categories: ["development", "design"],
    slug: "building-accessible-web-applications",
  },
]

const featuredPosts = blogPosts.slice(0, 2)

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredPosts, setFilteredPosts] = useState(blogPosts)

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setSearchQuery(query)

    if (query.trim() === "") {
      setFilteredPosts(blogPosts)
    } else {
      const filtered = blogPosts.filter(
        (post) =>
          post.title.toLowerCase().includes(query.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(query.toLowerCase()),
      )
      setFilteredPosts(filtered)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 md:py-24 relative bg-gradient-to-b from-purple-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Blog</h1>
            <p className="text-xl text-gray-600 mb-8">
              Insights, tutorials, and updates from our team of experts to help you stay ahead in the digital world.
            </p>

            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                type="text"
                placeholder="Search articles..."
                className="pl-10 py-6 text-base"
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl font-bold text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Featured Articles
          </motion.h2>

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
                    width={600}
                    height={400}
                    alt={post.title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3 hover:text-purple-600 transition-colors">{post.title}</h3>
                    <p className="text-gray-600 mb-4">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Image
                          src={post.authorImage || "/placeholder.svg"}
                          width={30}
                          height={30}
                          alt={post.author}
                          className="rounded-full"
                        />
                        <span className="text-sm text-gray-500">{post.date}</span>
                      </div>
                      <ViewCounter slug={post.slug} trackView={false} />
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
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl font-bold text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Latest Articles
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={`/blog/${post.slug}`} className="block">
                  <Image
                    src={post.image || "/placeholder.svg"}
                    width={400}
                    height={250}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.categories.map((category) => (
                        <Badge
                          key={category}
                          variant="outline"
                          className="bg-purple-100 text-purple-800 hover:bg-purple-200"
                        >
                          {category}
                        </Badge>
                      ))}
                    </div>
                    <h3 className="text-lg font-bold mb-2 hover:text-purple-600 transition-colors">{post.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Image
                          src={post.authorImage || "/placeholder.svg"}
                          width={30}
                          height={30}
                          alt={post.author}
                          className="rounded-full"
                        />
                        <span className="text-sm text-gray-500">{post.date}</span>
                      </div>
                      <ViewCounter slug={post.slug} trackView={false} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No articles found matching your search.</p>
              <Button className="mt-4 bg-purple-600 hover:bg-purple-700" onClick={() => setFilteredPosts(blogPosts)}>
                Clear Search
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            className="bg-purple-600 text-white p-8 md:p-12 rounded-xl text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter to receive the latest articles, tutorials, and updates directly in your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input type="email" placeholder="Your email address" className="bg-white text-gray-800 border-none" />
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="bg-white text-purple-600 hover:bg-gray-100 transition-all duration-300 whitespace-nowrap">
                  Subscribe
                </Button>
              </motion.div>
            </div>
            <p className="text-sm mt-4 text-purple-200">We respect your privacy. Unsubscribe at any time.</p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
