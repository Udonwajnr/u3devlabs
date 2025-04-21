"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, FileText, HelpCircle, MessageSquare, Book, Code, ShieldCheck, Zap, ArrowRight } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { StarIcon, CircleIcon, DotsPattern, WavePattern, BlobShape, HexagonGrid } from "@/components/decorative-svgs"

// Help categories
const categories = [
  { id: "getting-started", name: "Getting Started", icon: <Book className="h-5 w-5" /> },
  { id: "account", name: "Account & Billing", icon: <ShieldCheck className="h-5 w-5" /> },
  { id: "services", name: "Our Services", icon: <Zap className="h-5 w-5" /> },
  { id: "technical", name: "Technical Support", icon: <Code className="h-5 w-5" /> },
]

// Popular articles
const popularArticles = [
  {
    id: 1,
    title: "How to get started with U3DEVLAB",
    category: "getting-started",
    views: 1245,
    slug: "how-to-get-started",
  },
  {
    id: 2,
    title: "Understanding our pricing structure",
    category: "account",
    views: 987,
    slug: "pricing-structure",
  },
  {
    id: 3,
    title: "Website development process explained",
    category: "services",
    views: 876,
    slug: "website-development-process",
  },
  {
    id: 4,
    title: "Common technical issues and solutions",
    category: "technical",
    views: 765,
    slug: "common-technical-issues",
  },
  {
    id: 5,
    title: "How to request changes to your project",
    category: "services",
    views: 654,
    slug: "request-project-changes",
  },
  {
    id: 6,
    title: "Setting up your account and profile",
    category: "account",
    views: 543,
    slug: "setup-account-profile",
  },
]

// FAQ data by category
const faqData :any= {
  "getting-started": [
    {
      question: "What is the first step to working with U3DEVLAB?",
      answer:
        "The first step is to schedule a consultation through our contact form or by calling us directly. During this initial consultation, we'll discuss your project requirements, goals, and timeline to determine how we can best assist you.",
    },
    {
      question: "How long does a typical project take?",
      answer:
        "Project timelines vary based on complexity and scope. Simple websites may take 2-4 weeks, while more complex applications could take 2-3 months. We'll provide a detailed timeline during our initial consultation and keep you updated throughout the project.",
    },
    {
      question: "What information do I need to prepare before our first meeting?",
      answer:
        "It's helpful to have a clear idea of your project goals, target audience, any design preferences, and budget range. If you're redesigning an existing website or app, noting what you like and dislike about the current version is also valuable.",
    },
    {
      question: "Do you offer ongoing support after project completion?",
      answer:
        "Yes, we offer various support and maintenance packages to ensure your digital assets continue to perform optimally. These can include regular updates, security monitoring, performance optimization, and content updates.",
    },
  ],
  account: [
    {
      question: "How does your billing process work?",
      answer:
        "We typically work on a milestone-based payment schedule. This includes an initial deposit to begin work, followed by payments at key project milestones, and a final payment upon project completion. For ongoing services, we offer monthly or quarterly billing options.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept credit cards, bank transfers, and PayPal. For larger projects, we can also arrange custom payment schedules to accommodate your budget planning.",
    },
    {
      question: "How do I update my account information?",
      answer:
        "You can update your account information by logging into your client portal and navigating to the 'Account Settings' section. If you have any difficulties, our support team is available to assist you.",
    },
    {
      question: "Can I get a refund if I'm not satisfied with the service?",
      answer:
        "We work closely with our clients throughout the project to ensure satisfaction. If issues arise, we prioritize addressing them promptly. Our detailed contract outlines specific circumstances under which refunds may be applicable.",
    },
  ],
  services: [
    {
      question: "What services does U3DEVLAB offer?",
      answer:
        "We offer a comprehensive range of digital services including website development, mobile app development, UI/UX design, e-commerce solutions, digital marketing, and business technology consulting.",
    },
    {
      question: "Do you work with specific industries or businesses of certain sizes?",
      answer:
        "We work with businesses of all sizes across various industries. Our diverse portfolio includes projects for startups, small businesses, mid-sized companies, and enterprises in technology, healthcare, education, finance, e-commerce, and professional services.",
    },
    {
      question: "Can you help with both design and development?",
      answer:
        "Yes, we offer end-to-end solutions that cover both design and development. Our integrated approach ensures a seamless process from concept to completion, with consistent communication throughout.",
    },
    {
      question: "Do you provide content creation services?",
      answer:
        "Yes, we offer content creation services including copywriting, photography, video production, and graphic design. We can create compelling content that aligns with your brand voice and effectively communicates your message.",
    },
  ],
  technical: [
    {
      question: "What technologies do you specialize in?",
      answer:
        "We specialize in a wide range of technologies including React, Next.js, Node.js, Python, PHP, WordPress, Shopify, iOS and Android development, and various database systems. Our team stays current with the latest technological advancements to provide cutting-edge solutions.",
    },
    {
      question: "How do you handle website hosting and maintenance?",
      answer:
        "We offer secure and reliable hosting solutions with regular maintenance, including security updates, performance optimization, and content updates. We monitor your site 24/7 to ensure optimal performance and quick resolution of any issues.",
    },
    {
      question: "What security measures do you implement?",
      answer:
        "We implement comprehensive security measures including SSL certificates, secure authentication systems, regular security audits, data encryption, and protection against common vulnerabilities. We also provide guidance on best practices for maintaining security.",
    },
    {
      question: "Can you help with migrating my existing website or application?",
      answer:
        "Yes, we have extensive experience with migrations. We carefully plan and execute the migration process to minimize downtime and ensure data integrity. This includes thorough testing before, during, and after migration.",
    },
  ],
}

export default function HelpCenterPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("getting-started")

  // Filter articles based on search query
  const filteredArticles = searchQuery
    ? popularArticles.filter((article) => article.title.toLowerCase().includes(searchQuery.toLowerCase()))
    : popularArticles

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 md:py-24 relative bg-gradient-to-b from-purple-50 to-white">
        {/* Decorative elements */}
        <div className="absolute top-20 right-10">
          <StarIcon size={24} />
        </div>
        <div className="absolute bottom-10 left-10">
          <CircleIcon size={16} fill="#9333EA" opacity={0.3} />
        </div>
        <div className="absolute top-1/3 left-0 hidden md:block">
          <DotsPattern opacity={0.2} />
        </div>
        <div className="absolute top-1/4 right-0 hidden md:block">
          <BlobShape opacity={0.1} />
        </div>
        <div className="absolute bottom-0 left-0 w-full">
          <WavePattern opacity={0.1} />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <motion.h1
              className="text-4xl md:text-5xl font-bold mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              How can we help you?
            </motion.h1>
            <motion.p
              className="text-xl text-gray-600 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Find answers to common questions or contact our support team
            </motion.p>

            <motion.div
              className="relative max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                type="text"
                placeholder="Search for answers..."
                className="pl-12 py-6 text-lg rounded-full shadow-md"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Help Categories */}
      <section className="py-16 relative">
        <div className="absolute top-1/4 right-0 hidden md:block">
          <HexagonGrid opacity={0.1} />
        </div>

        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl font-bold text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Browse Help Topics
          </motion.h2>

          <div className="grid md:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card
                  className={`cursor-pointer hover:shadow-md transition-all duration-300 ${
                    activeCategory === category.id ? "border-purple-600 bg-purple-50" : ""
                  }`}
                  onClick={() => setActiveCategory(category.id)}
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <div className="bg-purple-100 p-2 rounded-full text-purple-600">{category.icon}</div>
                      <CardTitle className="text-lg">{category.name}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      {category.id === "getting-started" && "Learn how to get started with our services"}
                      {category.id === "account" && "Manage your account and billing information"}
                      {category.id === "services" && "Explore our range of services and solutions"}
                      {category.id === "technical" && "Technical support and troubleshooting"}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50 relative">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl font-bold text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Frequently Asked Questions
          </motion.h2>

          <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-8">
              {categories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
                >
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {categories.map((category) => (
              <TabsContent key={category.id} value={category.id}>
                <Card>
                  <CardHeader>
                    <CardTitle>{category.name} FAQs</CardTitle>
                    <CardDescription>Common questions about {category.name.toLowerCase()}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      {faqData[category.id].map((faq:any, index:number) => (
                        <AccordionItem key={index} value={`faq-${index}`}>
                          <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                          <AccordionContent>
                            <p className="text-gray-600">{faq.answer}</p>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Popular Articles */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl font-bold text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {searchQuery ? "Search Results" : "Popular Articles"}
          </motion.h2>

          {filteredArticles.length === 0 ? (
            <div className="text-center py-12">
              <HelpCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">No results found</h3>
              <p className="text-gray-600 mb-6">
                We couldn't find any articles matching your search. Try different keywords or browse our categories.
              </p>
              <Button className="bg-purple-600 hover:bg-purple-700" onClick={() => setSearchQuery("")}>
                Clear Search
              </Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link href={`/help-center/articles/${article.slug}`}>
                    <Card className="h-full hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-2">
                            <FileText className="h-5 w-5 text-purple-600" />
                            <CardTitle className="text-lg">{article.title}</CardTitle>
                          </div>
                          <Badge variant="outline" className="bg-purple-100 text-purple-800">
                            {categories.find((c) => c.id === article.category)?.name}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <span>{article.views} views</span>
                          <div className="flex items-center gap-1 text-purple-600">
                            <span>Read article</span>
                            <ArrowRight className="h-4 w-4" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-16 bg-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h2 className="text-3xl font-bold mb-6">Still Need Help?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Our support team is ready to assist you with any questions or issues you may have.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="bg-white text-purple-600 hover:bg-gray-100">
                  <MessageSquare className="mr-2 h-5 w-5" />
                  Contact Support
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" className="border-white text-white hover:bg-purple-700">
                  <HelpCircle className="mr-2 h-5 w-5" />
                  Schedule a Call
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
