"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Globe,
  Smartphone,
  Palette,
  ShoppingCart,
  Layout,
  Settings,
  RefreshCw,
  PenTool,
  Search,
  Instagram,
  Bot,
  MessageSquare,
  Headphones,
  Briefcase,
  Server,
  Mail,
  AtSign,
  BarChart,
  MapPin,
  FileText,
  FileImage,
  MessageCircle,
  Code,
  Calendar,
} from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

const services = [
  {
    category: "Web Development",
    items: [
      {
        title: "Website Development",
        icon: <Globe className="h-6 w-6" />,
        description: "Custom websites built with modern technologies to deliver exceptional user experiences.",
      },
      {
        title: "E-commerce Website Setup",
        icon: <ShoppingCart className="h-6 w-6" />,
        description: "Complete online stores with secure payment processing and inventory management.",
      },
      {
        title: "Landing Page Design",
        icon: <Layout className="h-6 w-6" />,
        description: "High-converting landing pages designed to capture leads and drive conversions.",
      },
      {
        title: "Website Maintenance",
        icon: <Settings className="h-6 w-6" />,
        description: "Regular updates, security patches, and performance optimization for your website.",
      },
      {
        title: "Website Redesign",
        icon: <RefreshCw className="h-6 w-6" />,
        description: "Refresh your online presence with a modern, user-friendly website redesign.",
      },
      {
        title: "Content Management System Setup",
        icon: <FileText className="h-6 w-6" />,
        description: "WordPress, Shopify, and other CMS platforms configured for your specific needs.",
      },
    ],
  },
  {
    category: "Mobile & Apps",
    items: [
      {
        title: "Mobile App Development",
        icon: <Smartphone className="h-6 w-6" />,
        description: "Native and cross-platform mobile applications for iOS and Android.",
      },
      {
        title: "API Integration",
        icon: <Code className="h-6 w-6" />,
        description: "Seamless integration with third-party APIs and services to extend functionality.",
      },
      {
        title: "Chatbot Integration",
        icon: <MessageCircle className="h-6 w-6" />,
        description: "AI-powered chatbots to improve customer service and engagement.",
      },
    ],
  },
  {
    category: "Design & Branding",
    items: [
      {
        title: "Product Design (UI/UX)",
        icon: <Palette className="h-6 w-6" />,
        description: "User-centered design that creates intuitive, engaging, and effective digital experiences.",
      },
      {
        title: "Logo & Branding Design",
        icon: <PenTool className="h-6 w-6" />,
        description: "Professional logo design and brand identity development to establish your visual presence.",
      },
      {
        title: "Digital Flyers & Poster Design",
        icon: <FileImage className="h-6 w-6" />,
        description: "Eye-catching digital marketing materials designed to promote your business.",
      },
      {
        title: "Online Portfolio Creation",
        icon: <Briefcase className="h-6 w-6" />,
        description: "Showcase your work with a professionally designed online portfolio.",
      },
    ],
  },
  {
    category: "Digital Marketing",
    items: [
      {
        title: "Search Engine Optimization (SEO)",
        icon: <Search className="h-6 w-6" />,
        description: "Improve your website's visibility in search engine results to drive organic traffic.",
      },
      {
        title: "Social Media Management",
        icon: <Instagram className="h-6 w-6" />,
        description: "Strategic social media management to build your brand and engage your audience.",
      },
      {
        title: "Social Media Automation",
        icon: <Bot className="h-6 w-6" />,
        description: "Automated social media posting and engagement to save time and maintain consistency.",
      },
      {
        title: "Email Marketing Setup",
        icon: <Mail className="h-6 w-6" />,
        description: "Email marketing campaigns designed to nurture leads and drive conversions.",
      },
      {
        title: "Google My Business Setup",
        icon: <MapPin className="h-6 w-6" />,
        description: "Optimize your local business presence with a properly configured Google Business Profile.",
      },
    ],
  },
  {
    category: "Business Solutions",
    items: [
      {
        title: "WhatsApp Business Setup",
        icon: <MessageSquare className="h-6 w-6" />,
        description: "Configure WhatsApp Business to streamline customer communication and support.",
      },
      {
        title: "Tech Support for Small Businesses",
        icon: <Headphones className="h-6 w-6" />,
        description: "Ongoing technical support to keep your digital assets running smoothly.",
      },
      {
        title: "Web Hosting & Domain Setup",
        icon: <Server className="h-6 w-6" />,
        description: "Secure and reliable hosting solutions with domain registration and management.",
      },
      {
        title: "Business Email Setup",
        icon: <AtSign className="h-6 w-6" />,
        description: "Professional email addresses with your business domain for a credible online presence.",
      },
      {
        title: "CRM Integration",
        icon: <BarChart className="h-6 w-6" />,
        description: "HubSpot, Brevo, and other CRM platforms integrated with your business systems.",
      },
      {
        title: "Booking/Appointment System Setup",
        icon: <Calendar className="h-6 w-6" />,
        description: "Online booking systems to streamline appointment scheduling and management.",
      },
    ],
  },
]

export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState("Web Development")

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-50 via-purple-50 to-pink-100 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Services</h1>
            <p className="text-xl text-gray-600 mb-8">
              Comprehensive digital solutions to help your business thrive in the digital landscape.
            </p>
            <div className="flex justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="bg-purple-600 hover:bg-purple-700 transition-all duration-300">Get a Quote</Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Tabs */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="Web Development" value={activeCategory} onValueChange={setActiveCategory}>
            <div className="flex justify-center mb-12">
              <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-2">
                {services.map((category) => (
                  <TabsTrigger
                    key={category.category}
                    value={category.category}
                    className="data-[state=active]:bg-purple-600 data-[state=active]:text-white transition-all duration-300"
                  >
                    {category.category}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {services.map((category) => (
              <TabsContent key={category.category} value={category.category}>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.items.map((service, index) => (
                    <motion.div
                      key={service.title}
                      className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-2 border border-gray-100"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <div className="bg-purple-100 p-3 rounded-full w-fit mb-4">
                        <div className="text-purple-600">{service.icon}</div>
                      </div>
                      <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                      <p className="text-gray-600 mb-4">{service.description}</p>
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button variant="outline" className="border-purple-600 text-purple-600 hover:bg-purple-50">
                          Learn More
                        </Button>
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-4">Our Process</h2>
            <p className="text-gray-600">
              We follow a structured approach to deliver exceptional results for every project.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="bg-purple-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold">01</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Discovery</h3>
              <p className="text-gray-600">
                We learn about your business, goals, and requirements to create a tailored solution.
              </p>
            </motion.div>

            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="bg-purple-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold">02</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Planning</h3>
              <p className="text-gray-600">
                We create a detailed project plan with timelines, deliverables, and milestones.
              </p>
            </motion.div>

            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="bg-purple-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold">03</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Execution</h3>
              <p className="text-gray-600">
                Our team works diligently to develop and implement your solution with regular updates.
              </p>
            </motion.div>

            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="bg-purple-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold">04</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Launch & Support</h3>
              <p className="text-gray-600">
                We ensure a smooth launch and provide ongoing support to help you succeed.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            className="bg-purple-600 text-white p-8 md:p-12 rounded-xl text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Let's discuss how our services can help your business grow in the digital world.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="bg-white text-purple-600 hover:bg-gray-100 transition-all duration-300">
                  Schedule a Consultation
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  className="bg-white text-purple-600 hover:bg-gray-100 transition-all duration-300"
                >
                  View Our Portfolio
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
