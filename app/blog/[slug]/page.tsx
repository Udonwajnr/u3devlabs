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
import axios from "axios"

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

  // Find related posts (same category, excluding current post)
  const relatedPosts = post
    ? blogPosts
        .filter((p:any) => p._id !== post?._id)
        .slice(0, 3)
    : []

    console.log(relatedPosts)
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

  console.log(blogPosts)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  useEffect(()=>{
    fetchBlogPost()
  },[slug])

  if (!post) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Article Not Found</h1>
            <p className="text-gray-600 mb-6">The article you're looking for doesn't exist or has been moved.</p>
            <Link href="/blog">
              <Button className="bg-purple-600 hover:bg-purple-700">Back to Blog</Button>
            </Link>
          </div>
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
                  <span className="text-sm">{post.createdAt}</span>
                </div>
                <div className="flex items-center gap-1 text-gray-500">
                  <Clock size={16} />
                  <span className="text-sm">{post.readTime}</span>
                </div>
                <div className="h-6 border-l border-gray-300 hidden sm:block"></div>
                {/* Add view counter here */}
                <ViewCounter slug={slug} className="text-gray-500" />
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

                {/* Tags */}
                {/* <div className="mt-12 pt-8 border-t">
                  <div className="flex flex-wrap gap-2">
                    {post.categories.map((category) => (
                      <Badge
                        key={category}
                        variant="outline"
                        className="bg-purple-100 text-purple-800 hover:bg-purple-200"
                      >
                        {categories.find((c) => c.id === category)?.name}
                      </Badge>
                    ))}
                  </div>
                </div> */}

                {/* Author Bio */}
                <div className="mt-12 bg-purple-50 p-6 rounded-xl">
                  <div className="flex items-start gap-4">
                    <Image
                      src={post.author.image || "/placeholder.svg"}
                      width={80}
                      height={80}
                      alt={post.author.name}
                      className="rounded-full"
                    />
                    <div>
                      <h3 className="text-xl font-bold mb-2">About {post.author.name}</h3>
                      <p className="text-gray-600 mb-4">
                        {post.authorRole} at U3DEVLAB with over 8 years of experience in digital product design and
                        development. Passionate about creating user-centered experiences that solve real problems.
                      </p>
                      <div className="flex gap-3">
                        <button className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors">
                          <Twitter size={16} className="text-gray-700" />
                        </button>
                        <button className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors">
                          <Linkedin size={16} className="text-gray-700" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Post Navigation */}
      {/* <section className="py-8 border-t border-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <Link
                href={`/blog/${blogPosts[1].slug}`}
                className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors"
              >
                <ChevronLeft size={20} />
                <span>Previous Article</span>
              </Link>
              <Link
                href={`/blog/${blogPosts[2].slug}`}
                className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors"
              >
                <span>Next Article</span>
                <ChevronRight size={20} />
              </Link>
            </div>
          </div>
        </div>
      </section> */}

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
                    src={relatedPost.image || "/placeholder.svg"}
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
                      <span className="text-sm text-gray-500">{relatedPost.date}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comments Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.h2
              className="text-3xl font-bold mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Comments (3)
            </motion.h2>

            <div className="space-y-8 mb-12">
              <motion.div
                className="bg-gray-50 p-6 rounded-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="flex items-start gap-4">
                  <Image
                    src="/placeholder.svg?height=50&width=50"
                    width={50}
                    height={50}
                    alt="John Doe"
                    className="rounded-full"
                  />
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-bold">John Doe</h4>
                      <span className="text-sm text-gray-500">2 days ago</span>
                    </div>
                    <p className="text-gray-700">
                      Great article! I especially liked the point about micro-interactions. They really do make a
                      difference in how users perceive and interact with digital products.
                    </p>
                    <button className="text-purple-600 text-sm mt-2 hover:text-purple-700">Reply</button>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="bg-gray-50 p-6 rounded-xl ml-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="flex items-start gap-4">
                  <Image
                    src={post.author.image || "/placeholder.svg"}
                    width={50}
                    height={50}
                    alt={post.author.name}
                    className="rounded-full"
                  />
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-bold">{post.author.name}</h4>
                      <span className="text-sm text-gray-500">1 day ago</span>
                      <Badge className="bg-purple-100 text-purple-800">Author</Badge>
                    </div>
                    <p className="text-gray-700">
                      Thanks, John! I agree - micro-interactions are often overlooked but they can significantly enhance
                      the user experience when implemented thoughtfully.
                    </p>
                    <button className="text-purple-600 text-sm mt-2 hover:text-purple-700">Reply</button>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="bg-gray-50 p-6 rounded-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="flex items-start gap-4">
                  <Image
                    src="/placeholder.svg?height=50&width=50"
                    width={50}
                    height={50}
                    alt="Sarah Johnson"
                    className="rounded-full"
                  />
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-bold">Sarah Johnson</h4>
                      <span className="text-sm text-gray-500">12 hours ago</span>
                    </div>
                    <p className="text-gray-700">
                      I've been implementing some of these trends in my recent projects and the feedback has been
                      overwhelmingly positive. The section on accessibility-first design is particularly important -
                      it's great to see it getting more attention.
                    </p>
                    <button className="text-purple-600 text-sm mt-2 hover:text-purple-700">Reply</button>
                  </div>
                </div>
              </motion.div>
            </div>

            <motion.div
              className="bg-white p-6 rounded-xl border border-gray-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h3 className="text-xl font-bold mb-4">Leave a Comment</h3>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Name*
                    </label>
                    <Input id="name" placeholder="Your name" required />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email*
                    </label>
                    <Input id="email" type="email" placeholder="Your email" required />
                  </div>
                </div>
                <div>
                  <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
                    Comment*
                  </label>
                  <Textarea id="comment" placeholder="Your comment" rows={5} required />
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="saveInfo" className="rounded text-purple-600" />
                  <label htmlFor="saveInfo" className="text-sm text-gray-700">
                    Save my name and email for the next time I comment
                  </label>
                </div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button className="bg-purple-600 hover:bg-purple-700">Post Comment</Button>
                </motion.div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="bg-purple-600 text-white p-8 md:p-12 rounded-xl text-center relative overflow-hidden max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute top-5 right-5 animate-spin-slow">
              <StarIcon size={24} fill="white" />
            </div>
            <div className="absolute bottom-5 left-5 animate-pulse">
              <CircleIcon size={16} fill="white" className="opacity-30" />
            </div>

            <h2 className="text-3xl font-bold mb-4">Enjoyed this article?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter to receive more insights and tutorials directly in your inbox.
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

      {/* Mobile floating share button */}
      <FloatingShareButton title={post.title} url={currentUrl} excerpt={post.excerpt} />

      <Footer />
    </div>
  )
}
