"use client";

import type React from "react";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ShareButtons from "@/components/blog/share-buttons";
import ViewCounter from "@/components/blog/view-counter";
import axios from "axios";
// Decorative SVG components
const StarIcon = ({
  className,
  size = 24,
  fill = "#9333EA",
}: {
  className?: string;
  size?: number;
  fill?: string;
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M12 0L14.59 8.41L23 11L14.59 13.59L12 22L9.41 13.59L1 11L9.41 8.41L12 0Z"
      fill={fill}
    />
  </svg>
);

const CircleIcon = ({
  className,
  size = 24,
  fill = "#9333EA",
}: {
  className?: string;
  size?: number;
  fill?: string;
}) => (
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
);

const DotsPattern = ({ className }: { className?: string }) => (
  <svg
    width="80"
    height="80"
    viewBox="0 0 80 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
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
);


export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getBlogData();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
  
    if (query.trim() === "") {
      setFilteredPosts(blogPosts);
    } else {
      const filtered = blogPosts.filter(
        (post:any) =>
          post.title.toLowerCase().includes(query.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredPosts(filtered);
    }
  };
  

  const getBlogData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("/api/blog");
      setBlogPosts(response.data);
      setFilteredPosts(response.data);
      setFeaturedPosts(response.data);
    } catch (error) {
      console.log(error);
      setError("Failed to load blog posts");
    } finally {
      setIsLoading(false);
    }
  };
  

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
              Insights, tutorials, and updates from our team of experts to help
              you stay ahead in the digital world.
            </p>

            <div className="relative max-w-xl mx-auto">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
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

      {/* All Posts */}
      <section className="py-16 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl font-bold text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Latest Articles
          </motion.h2>

          <div className="grid md:grid-cols-4 lg:grid-cols-4 gap-8">
            {filteredPosts?.map((post: any, index) => (
              <motion.div
                key={post._id}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={`/blog/${post.slug}`} className="block">
                  <Image
                    src={post.coverImage || "/placeholder.svg"}
                    width={400}
                    height={250}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex flex-wrap gap-2 mb-3">
                      <Badge
                        variant="outline"
                        className="bg-purple-100 text-purple-800 hover:bg-purple-200"
                      >
                        {post.category}
                      </Badge>
                    </div>
                    <h3 className="text-lg font-bold mb-2 hover:text-purple-600 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      {/* Author Info */}
                      <div className="flex items-center gap-3">
                        <Image
                          src={post.author.avatar || "/placeholder.svg"}
                          width={36}
                          height={36}
                          alt={post.author.name}
                          className="rounded-full object-cover"
                        />
                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-gray-800">
                            {post.author.name}
                          </span>
                          <span className="text-xs text-gray-500">
                            {post.date}
                          </span>
                        </div>
                      </div>

                      {/* Views */}
                      <ViewCounter slug={post.slug} trackView={false} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* {filteredPosts?.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No articles found matching your search.</p>
              <Button className="mt-4 bg-purple-600 hover:bg-purple-700" onClick={() => setFilteredPosts(blogPosts)}>
                Clear Search
              </Button>
            </div>
          )} */}
        </div>
      </section>
      <Footer />
    </div>
  );
}
