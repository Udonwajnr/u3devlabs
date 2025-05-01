"use client"

import { useEffect,useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Twitter, Linkedin, Calendar, Clock, ChevronLeft, ChevronRight } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ShareButtons, { FloatingShareButton } from "@/components/blog/share-buttons"
import ViewCounter from "@/components/blog/view-counter"
import { format } from "date-fns";
import axios from "axios"
import dayjs from 'dayjs';
import { Skeleton } from "@/components/ui/skeleton";

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

export interface BlogPost {
  _id:string,
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: {
    name: string;
    avatar?: string;
    image:string // optional because in schema it's optional
  };
  authorRole:'',
  category: string;
  tags: string[];
  isPublished: boolean;
  publishedAt?: string; // optional
  createdAt: string;
  updatedAt: string;
  readTime:string;
  views: number;
}

// Blog categories
const categories = [
  { id: "design", name: "Design" },
  { id: "development", name: "Development" },
  { id: "business", name: "Business" },
  { id: "technology", name: "Technology" },
  { id: "tutorials", name: "Tutorials" },
]


export default function BlogDetailPage() {
  const params = useParams()
  const slug = params.slug as string

  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);

  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Find the current post
  const post = blogPosts.find((post:any) => post.slug === slug)

  console.log(post?.createdAt)
  // Find related posts (same category, excluding current post)
  const relatedPosts = post
    ? blogPosts
        .filter((p:any) => p._id !== post?._id)
        .slice(0, 3)
    : []

  // Get the current URL for sharing
  const currentUrl = typeof window !== "undefined" ? window.location.href : `https://u3devlab.com/blog/${slug}`

  // Scroll to top on page load

  const fetchBlogPost = async()=>{
    try{
      const response = await axios(`/api/blog`)
      setBlogPosts(response.data)
    }
    catch(error){
      console.log(error)
    }
    
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  useEffect(()=>{
    fetchBlogPost()
  },[slug])

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMMM d, yyyy");
    } catch {
      return "Invalid date";
    }
  };

  const formatRelatedPostDate = (dateString: string): string => {
    try {
      return dayjs(dateString).format('MMMM D, YYYY'); // e.g., April 30, 2025
    } catch (error) {
      return 'Invalid date';
    }
  };

  const calculateReadTimeFromHTML = (htmlContent: string, wordsPerMinute = 200): string => {
    // Strip HTML tags
    const textContent = htmlContent.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    const wordCount = textContent.split(' ').length;
    const minutes = Math.max(1, Math.ceil(wordCount / wordsPerMinute)); // always show at least 1 min
    return `${minutes} min read`;
  };

  if (!post) {
    return (
      <div className="flex flex-col min-h-screen justify-center items-center">
        <Navbar />
        <div className="w-full max-w-3xl px-4 space-y-4">
            <Skeleton className="h-10 w-2/3" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-[300px] w-full mt-6" />
    </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pb-20 relative bg-gradient-to-b from-purple-50 to-white">
        <div className="absolute top-20 right-10 animate-pulse">
          <StarIcon size={24} />
        </div>
        <div className="absolute bottom-10 left-10 animate-bounce-slow">
          <CircleIcon size={16} fill="#9333EA" className="opacity-30" />
        </div>

        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Link href="/blog" className="inline-flex items-center text-purple-600 hover:text-purple-700 mb-6">
              <ChevronLeft size={16} className="mr-1" />
              Back to Blog
            </Link>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="flex flex-wrap gap-2 mb-4">
                  <Badge  variant="outline" className="bg-purple-100 text-purple-800 hover:bg-purple-200">
                    {post.category}
                  </Badge>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">{post.title}</h1>

              <div className="flex flex-wrap items-center gap-4 mb-8">
                <div className="flex items-center gap-3">
                  <Image
                    src={post.author.image || "/placeholder.svg"}
                    width={50}
                    height={50}
                    alt={post.author.name}
                    className="rounded-full"
                  />
                  <div>
                    <p className="font-medium">{post.author.name}</p>
                    {/* <p className="text-sm text-gray-500">{post.authorRole}</p> */}
                  </div>
                </div>
                <div className="h-6 border-l border-gray-300 hidden sm:block"></div>
                <div className="flex items-center gap-1 text-gray-500">
                  <Calendar size={16} />
                  <span className="text-sm">{formatDate(post.createdAt)}</span>
                </div>
                <div className="flex items-center gap-1 text-gray-500">
                  <Clock size={16} />
                  <span className="text-sm">{ calculateReadTimeFromHTML(post.content)}</span>
                </div>
                {/* <div className="h-6 border-l border-gray-300 hidden sm:block"></div> */}
                {/* Add view counter here */}
                {/* <ViewCounter slug={slug} className="text-gray-500" /> */}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="rounded-xl overflow-hidden shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Image
                src={post.coverImage || "/placeholder.svg"}
                width={1200}
                height={600}
                alt={post.title}
                className="w-full h-auto"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Social Share Sidebar */}
              <motion.div
                className="md:w-16 flex md:flex-col items-center gap-4 md:sticky md:top-32 h-fit"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <ShareButtons title={post.title} url={currentUrl} excerpt={post.excerpt} direction="vertical" />
              </motion.div>

              {/* Article Content */}
              <motion.div
                className="flex-1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div
                  className="prose prose-lg max-w-none prose-headings:text-purple-900 prose-a:text-purple-600 prose-a:no-underline hover:prose-a:underline"
                  dangerouslySetInnerHTML={{ __html: post.content as string }}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      <section className="py-16 bg-gray-50 relative">
        <div className="absolute top-10 right-10 animate-pulse">
          <StarIcon size={20} />
        </div>
        <div className="absolute bottom-10 left-10 animate-bounce-slow">
          <CircleIcon size={16} />
        </div>

        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl font-bold mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Related Articles
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {relatedPosts.map((relatedPost:any, index) => (
              <motion.div
                key={relatedPost.id}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={`/blog/${relatedPost.slug}`} className="block">
                  <Image
                    src={relatedPost.coverImage}
                    width={400}
                    height={250}
                    alt={relatedPost.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-lg font-bold mb-2 hover:text-purple-600 transition-colors">
                      {relatedPost.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{relatedPost.excerpt}</p>
                    <div className="flex items-center gap-2">
                      <Image
                        src={relatedPost.author.avatar || "/placeholder.svg"}
                        width={30}
                        height={30}
                        alt={relatedPost.author.name}
                        className="rounded-full"
                      />
                      <span className="text-sm text-gray-500">{formatRelatedPostDate(relatedPost.createdAt)}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Mobile floating share button */}
      <FloatingShareButton title={post.title} url={currentUrl} excerpt={post.excerpt} />

      <Footer />
    </div>
  )
}
