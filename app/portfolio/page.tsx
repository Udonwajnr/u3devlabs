"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

// Project categories
const categories = [
  { id: "all", name: "All Projects" },
  { id: "landing-page", name: "Landing Pages" },
  { id: "ecommerce", name: "E-commerce" },
  { id: "saas", name: "SaaS" },
  { id: "mobile-app", name: "Mobile Apps" },
  { id: "branding", name: "Branding" },
]

// Project data
const projects = [
  {
    id: 1,
    title: "Astha | Real Estate Platform",
    categories: ["landing-page", "saas"],
    image: "/placeholder.svg?height=400&width=600",
    date: "05/10/2024",
    tags: ["UI/UX", "Case Study", "Product Design"],
  },
  {
    id: 2,
    title: "Dripkicks | Sneaker Marketplace",
    categories: ["ecommerce"],
    image: "/placeholder.svg?height=400&width=600",
    date: "12/05/2024",
    tags: ["UI/UX", "Case Study", "Product Design"],
  },
  {
    id: 3,
    title: "imelody | Music Brand",
    categories: ["branding"],
    image: "/placeholder.svg?height=400&width=600",
    date: "18/04/2024",
    tags: ["Brand Design", "Case Study", "Logo"],
  },
  {
    id: 4,
    title: "Solmart | A Supershop Brand",
    categories: ["ecommerce", "branding"],
    image: "/placeholder.svg?height=400&width=600",
    date: "20/03/2024",
    tags: ["Brand Design", "Stationary", "Logo"],
  },
  {
    id: 5,
    title: "TechFlow | SaaS Dashboard",
    categories: ["saas"],
    image: "/placeholder.svg?height=400&width=600",
    date: "15/02/2024",
    tags: ["UI/UX", "Web App", "Dashboard"],
  },
  {
    id: 6,
    title: "FitTrack | Fitness Mobile App",
    categories: ["mobile-app"],
    image: "/placeholder.svg?height=400&width=600",
    date: "10/01/2024",
    tags: ["Mobile Design", "UI/UX", "App Development"],
  },
]

export default function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [filteredProjects, setFilteredProjects] = useState(projects)

  useEffect(() => {
    if (selectedCategory === "all") {
      setFilteredProjects(projects)
    } else {
      setFilteredProjects(projects.filter((project) => project.categories.includes(selectedCategory)))
    }
  }, [selectedCategory])

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">Showcasing Our Craft</h1>
            <p className="text-gray-600 text-center max-w-2xl mx-auto mb-16">
              Explore a selection of our best work across diverse industries. Each project reflects our commitment to
              creativity and functionality.
            </p>
          </motion.div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full transition-all duration-300 ${
                  selectedCategory === category.id
                    ? "bg-purple-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category.name}
              </motion.button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            <AnimatePresence>
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  layout
                >
                  <div className="relative">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      width={600}
                      height={400}
                      alt={project.title}
                      className="w-full h-[300px] object-cover"
                    />
                    <motion.div
                      className="absolute bottom-4 right-4"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button className="bg-purple-600 hover:bg-purple-700">Explore</Button>
                    </motion.div>
                  </div>
                  <div className="p-6">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {project.tags.map((tag, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="bg-purple-100 text-purple-800 hover:bg-purple-200"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="mb-2">
                      <h3 className="text-xl font-bold">{project.title}</h3>
                    </div>
                    <div className="text-sm text-gray-500">Date: {project.date}</div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No projects found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl font-bold text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Trusted By
          </motion.h2>

          <motion.div
            className="flex flex-wrap justify-center items-center gap-8 md:gap-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="w-32 h-16 flex items-center justify-center">
              <Image
                src="/placeholder.svg?height=60&width=120"
                width={120}
                height={60}
                alt="LinkedIn"
                className="max-w-full h-auto"
              />
            </div>
            <div className="w-32 h-16 flex items-center justify-center">
              <Image
                src="/placeholder.svg?height=60&width=120"
                width={120}
                height={60}
                alt="The North Face"
                className="max-w-full h-auto"
              />
            </div>
            <div className="w-32 h-16 flex items-center justify-center">
              <Image
                src="/placeholder.svg?height=60&width=120"
                width={120}
                height={60}
                alt="GoPro"
                className="max-w-full h-auto"
              />
            </div>
            <div className="w-32 h-16 flex items-center justify-center">
              <Image
                src="/placeholder.svg?height=60&width=120"
                width={120}
                height={60}
                alt="Belle"
                className="max-w-full h-auto"
              />
            </div>
            <div className="w-32 h-16 flex items-center justify-center">
              <Image
                src="/placeholder.svg?height=60&width=120"
                width={120}
                height={60}
                alt="Medium"
                className="max-w-full h-auto"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-purple-600 py-12">
        <div className="container mx-auto px-4 text-center text-white">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h2 className="text-2xl font-bold mb-4">Have A Project in Mind?</h2>
            <div className="text-4xl md:text-6xl font-bold mb-6">LET'S CONNECT</div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className="bg-white text-purple-600 hover:bg-gray-100 transition-all duration-300">
                Contact Us
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
