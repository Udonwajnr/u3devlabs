"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import axios from "axios";
import dayjs from "dayjs";
// Project categories
const categories = [
  { id: "all", name: "All Projects" },
  { id: "landing-page", name: "Landing Pages" },
  { id: "ecommerce", name: "E-commerce" },
  { id: "saas", name: "SaaS" },
  { id: "mobile-app", name: "Mobile Apps" },
  { id: "branding", name: "Branding" },
];

export default function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [projects, setprojects] = useState([]);

  // Fetch data on mount
useEffect(() => {
  getPortfolioData();
}, []);

const getPortfolioData = async () => {
  try {
    const res = await axios.get("/api/portfolio");
    setprojects(res.data);
  } catch (error) {
    console.error("Error fetching portfolio data", error);
  }
};

// Filter logic
useEffect(() => {
  if (selectedCategory === "all") {
    setFilteredProjects(projects);
  } else {
    setFilteredProjects(
      projects.filter((project: any) =>
        project.categories.includes(selectedCategory)
      )
    );
  }
}, [selectedCategory, projects]); // 🔁 Watch both

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Showcasing Our Craft
            </h1>
            <p className="text-gray-600 text-center max-w-2xl mx-auto mb-16">
              Explore a selection of our best work across diverse industries.
              Each project reflects our commitment to creativity and
              functionality.
            </p>
          </motion.div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category, index) => (
              <motion.button
                key={index}
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
          <div className="grid md:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredProjects.map((project: any, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  layout
                >
                  <div className="relative">
                    <Image
                      src={project.coverImage || "/placeholder.svg"}
                      width={600}
                      height={400}
                      alt={project.title}
                      className="w-full h-[300px]"
                    />
                    <motion.div
                      className="absolute bottom-4 right-4"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button className="bg-purple-600 hover:bg-purple-700">
                        Explore
                      </Button>
                    </motion.div>
                  </div>
                  <div className="p-6">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {project.tags.map((tag: any, index: number) => (
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
                    <div className="text-sm text-gray-500">
                      Date: {dayjs(project.completedAt).format("MMMM D, YYYY")}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No projects found in this category.
              </p>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
}
