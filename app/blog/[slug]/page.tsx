"use client"

import { useEffect } from "react"
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

// Decorative SVG components
const StarIcon = ({ className, size = 24, fill = "#9333EA" }) => (
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

const CircleIcon = ({ className, size = 24, fill = "#9333EA" }) => (
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

// Blog categories
const categories = [
  { id: "design", name: "Design" },
  { id: "development", name: "Development" },
  { id: "business", name: "Business" },
  { id: "technology", name: "Technology" },
  { id: "tutorials", name: "Tutorials" },
]

// Blog posts data
const blogPosts = [
  {
    id: 1,
    title: "10 UI/UX Design Trends to Watch in 2024",
    excerpt:
      "Discover the latest design trends that are shaping the digital landscape and how you can incorporate them into your projects.",
    content: `
      <p>The world of UI/UX design is constantly evolving, with new trends emerging each year that shape how we interact with digital products. As we move through 2024, several key trends are defining the landscape of digital design.</p>
      
      <h2>1. Dark Mode Everywhere</h2>
      <p>Dark mode has moved beyond being just a feature to becoming a standard expectation. Users appreciate the reduced eye strain, especially in low-light environments, and the aesthetic appeal of dark interfaces. In 2024, we're seeing more sophisticated implementations of dark mode, with thoughtful color palettes that maintain accessibility while creating visually striking experiences.</p>
      
      <h2>2. Micro-interactions That Delight</h2>
      <p>Subtle animations and micro-interactions continue to gain importance as designers recognize their power to create emotional connections with users. These small moments of delight—a button that responds to pressure, a notification that appears with a playful animation—make interfaces feel more human and responsive.</p>
      
      <h2>3. 3D Elements and Depth</h2>
      <p>With advancements in browser capabilities and device processing power, 3D elements are becoming more prevalent in web and mobile design. These elements add depth and dimension to interfaces, creating immersive experiences that engage users on a deeper level.</p>
      
      <h2>4. Voice User Interfaces (VUI)</h2>
      <p>As voice assistants become more sophisticated, designers are paying increased attention to voice user interfaces. The challenge lies in creating seamless experiences that work well across both visual and voice interfaces, ensuring users can accomplish their goals regardless of how they choose to interact.</p>
      
      <h2>5. Augmented Reality Integration</h2>
      <p>AR is no longer just for gaming or specialized applications. In 2024, we're seeing more mainstream integration of AR elements in everyday apps, from virtual try-ons in e-commerce to interactive data visualizations in business applications.</p>
      
      <h2>6. Accessibility-First Design</h2>
      <p>Accessibility is finally getting the attention it deserves, with more designers adopting an accessibility-first approach. This shift recognizes that designing for users with disabilities ultimately creates better experiences for everyone.</p>
      
      <h2>7. Neumorphism Evolution</h2>
      <p>The neumorphic design trend has evolved from its initial soft, embossed look to more practical implementations that combine the tactile feel of neumorphism with the clarity and usability of flat design.</p>
      
      <h2>8. Data Visualization in Everyday Apps</h2>
      <p>As data becomes increasingly central to our digital experiences, designers are finding creative ways to visualize information in intuitive, engaging ways—even in applications that aren't traditionally data-focused.</p>
      
      <h2>9. Personalized UI Experiences</h2>
      <p>Leveraging AI and machine learning, interfaces are becoming more adaptive to individual user preferences and behaviors. From content recommendations to interface layouts that adjust based on usage patterns, personalization is creating more relevant experiences.</p>
      
      <h2>10. Sustainable and Ethical Design</h2>
      <p>There's growing awareness of the environmental impact of digital products, leading to more consideration of sustainable design practices—from energy-efficient dark modes to reducing unnecessary animations that consume battery power.</p>
      
      <p>As these trends continue to evolve, the most successful designs will be those that thoughtfully implement these elements in service of user needs, rather than simply following trends for their own sake. The future of UI/UX design remains focused on creating experiences that are not just visually appealing, but truly enhance how people interact with technology in their daily lives.</p>
    `,
    image: "/placeholder.svg?height=600&width=1200",
    date: "May 15, 2024",
    readTime: "8 min read",
    author: "Shahed Shahriar",
    authorImage: "/placeholder.svg?height=100&width=100",
    authorRole: "UI Designer",
    categories: ["design"],
    slug: "ui-ux-design-trends-2024",
    featured: true,
  },
  {
    id: 2,
    title: "The Future of Web Development: What to Expect in the Next 5 Years",
    excerpt:
      "From WebAssembly to AI-driven development, explore the technologies that will define the future of web development.",
    content: `
      <p>Web development has always been a rapidly evolving field, but the pace of innovation seems to be accelerating. Looking ahead to the next five years, several emerging technologies and approaches are poised to transform how we build for the web.</p>
      
      <h2>WebAssembly Will Become Mainstream</h2>
      <p>WebAssembly (Wasm) has been gaining traction as a way to run high-performance code in browsers. In the coming years, we expect to see Wasm move beyond specialized use cases to become a standard part of web development, enabling more complex applications to run efficiently in browsers.</p>
      
      <h2>AI-Assisted Development Will Transform Workflows</h2>
      <p>AI tools like GitHub Copilot are just the beginning. In the next five years, AI assistants will become sophisticated enough to handle increasingly complex aspects of development, from generating boilerplate code to suggesting optimizations and even debugging issues.</p>
      
      <h2>Edge Computing Will Reshape Application Architecture</h2>
      <p>As edge computing infrastructure matures, we'll see more applications leveraging edge functions to process data and logic closer to users. This shift will lead to faster, more resilient applications and new patterns for distributing application logic.</p>
      
      <h2>The Rise of "Headless" Everything</h2>
      <p>The headless approach—separating the frontend presentation layer from the backend logic—will extend beyond content management systems to virtually every type of application. This architecture provides greater flexibility and enables teams to choose the best tools for each layer.</p>
      
      <h2>Web Components Will Finally Fulfill Their Promise</h2>
      <p>After years of slow adoption, Web Components are reaching a tipping point of browser support and developer tooling. In the next five years, they'll become a more prominent part of the web development ecosystem, offering a standardized way to create reusable UI components.</p>
      
      <h2>Real-Time Collaboration Will Be Built Into Everything</h2>
      <p>Following the success of tools like Figma and Google Docs, real-time collaboration features will become expected in web applications across domains. Frameworks and libraries will emerge to make these features easier to implement.</p>
      
      <h2>The End of Traditional JavaScript Frameworks?</h2>
      <p>As browser capabilities advance and new approaches like Islands Architecture gain popularity, we may see a shift away from all-encompassing JavaScript frameworks toward more lightweight, specialized tools that leverage native browser features.</p>
      
      <h2>Privacy-First Development Will Become Non-Negotiable</h2>
      <p>With increasing regulation and user awareness around privacy, developers will need to adopt privacy-first approaches from the beginning of projects, rather than treating privacy as an afterthought.</p>
      
      <h2>Sustainability Will Enter the Conversation</h2>
      <p>The environmental impact of web applications will become a more significant consideration. Developers will optimize for energy efficiency, reducing unnecessary computations and data transfers to create more sustainable digital products. This shift will involve everything from image optimization to more efficient algorithms and server utilization.</p>
      
      <h2>Cross-Platform Development Will Continue to Evolve</h2>
      <p>The boundaries between web, mobile, and desktop development will continue to blur. Technologies that enable developers to build for multiple platforms from a single codebase will become more sophisticated, offering better performance and platform-specific optimizations.</p>
      
      <p>As these trends unfold, web developers will need to continuously adapt their skills and approaches. The most successful developers will be those who can balance embracing new technologies with maintaining a focus on fundamentals like performance, accessibility, and user experience. The future of web development promises to be both challenging and exciting, with unprecedented opportunities to create powerful, accessible applications that reach users wherever they are.</p>
    `,
    image: "/placeholder.svg?height=600&width=1200",
    date: "May 10, 2024",
    readTime: "10 min read",
    author: "Asif Rahman",
    authorImage: "/placeholder.svg?height=100&width=100",
    authorRole: "Senior Developer",
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
    readTime: "6 min read",
    author: "Asif Rahman",
    authorImage: "/placeholder.svg?height=100&width=100",
    authorRole: "Senior Developer",
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
    readTime: "12 min read",
    author: "Afia Nishat Kanta",
    authorImage: "/placeholder.svg?height=100&width=100",
    authorRole: "UX Researcher",
    categories: ["development", "design"],
    slug: "building-accessible-web-applications",
  },
]

export default function BlogDetailPage() {
  const params = useParams()
  const slug = params.slug as string

  // Find the current post
  const post = blogPosts.find((post) => post.slug === slug)

  // Find related posts (same category, excluding current post)
  const relatedPosts = post
    ? blogPosts
        .filter((p) => p.id !== post.id && p.categories.some((category) => post.categories.includes(category)))
        .slice(0, 3)
    : []

  // Get the current URL for sharing
  const currentUrl = typeof window !== "undefined" ? window.location.href : `https://u3devlab.com/blog/${slug}`

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

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
                {post.categories.map((category) => (
                  <Badge key={category} variant="outline" className="bg-purple-100 text-purple-800 hover:bg-purple-200">
                    {categories.find((c) => c.id === category)?.name}
                  </Badge>
                ))}
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">{post.title}</h1>

              <div className="flex flex-wrap items-center gap-4 mb-8">
                <div className="flex items-center gap-3">
                  <Image
                    src={post.authorImage || "/placeholder.svg"}
                    width={50}
                    height={50}
                    alt={post.author}
                    className="rounded-full"
                  />
                  <div>
                    <p className="font-medium">{post.author}</p>
                    <p className="text-sm text-gray-500">{post.authorRole}</p>
                  </div>
                </div>
                <div className="h-6 border-l border-gray-300 hidden sm:block"></div>
                <div className="flex items-center gap-1 text-gray-500">
                  <Calendar size={16} />
                  <span className="text-sm">{post.date}</span>
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
                src={post.image || "/placeholder.svg"}
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
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />

                {/* Tags */}
                <div className="mt-12 pt-8 border-t">
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
                </div>

                {/* Author Bio */}
                <div className="mt-12 bg-purple-50 p-6 rounded-xl">
                  <div className="flex items-start gap-4">
                    <Image
                      src={post.authorImage || "/placeholder.svg"}
                      width={80}
                      height={80}
                      alt={post.author}
                      className="rounded-full"
                    />
                    <div>
                      <h3 className="text-xl font-bold mb-2">About {post.author}</h3>
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
      <section className="py-8 border-t border-gray-100">
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
            {relatedPosts.map((relatedPost, index) => (
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
                        src={relatedPost.authorImage || "/placeholder.svg"}
                        width={30}
                        height={30}
                        alt={relatedPost.author}
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
                    src={post.authorImage || "/placeholder.svg"}
                    width={50}
                    height={50}
                    alt={post.author}
                    className="rounded-full"
                  />
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-bold">{post.author}</h4>
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
