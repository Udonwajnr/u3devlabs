"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

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

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 py-16 md:py-20 relative">
        <div className="absolute top-20 right-10 animate-pulse">
          <StarIcon size={24} />
        </div>
        <div className="absolute bottom-10 left-10 animate-bounce-slow">
          <CircleIcon size={16} fill="#9333EA" className="opacity-30" />
        </div>

        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center">
            <motion.h1
              className="text-4xl md:text-5xl font-bold leading-tight mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Your Partner in Digital Innovation
            </motion.h1>

            <motion.p
              className="text-gray-600 text-lg md:text-xl mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              At U3DEVLAB, we craft designs that go beyond aesthetics — blending
              user-centered principles with striking visuals to create
              intuitive, engaging digital experiences.
            </motion.p>

            <motion.div
              className="relative rounded-2xl overflow-hidden shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Image
                src="/img8.jpg" // your uploaded image
                width={1200}
                height={600}
                alt="Team collaboration"
                className="w-full h-auto object-cover"
                priority
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h3 className="text-3xl font-bold text-purple-600">5+</h3>
              <p className="text-sm text-gray-600">Years of Experience</p>
            </motion.div>
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-3xl font-bold text-purple-600">300</h3>
              <p className="text-sm text-gray-600">Projects Completed</p>
            </motion.div>
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h3 className="text-3xl font-bold text-purple-600">1k+</h3>
              <p className="text-sm text-gray-600">Happy Customers</p>
            </motion.div>
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h3 className="text-3xl font-bold text-purple-600">100+</h3>
              <p className="text-sm text-gray-600">Revenue Generated</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What Drives Us */}
      <section className="py-16 md:py-24 relative">
        <div className="absolute -left-10 top-1/4 animate-pulse">
          <StarIcon size={40} />
        </div>
        <div className="absolute right-10 bottom-1/4 animate-bounce-slow">
          <CircleIcon size={20} fill="#9333EA" className="opacity-30" />
        </div>

        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl font-bold text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            What Drives Us
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-10">
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="creativity">
                  <AccordionTrigger className="flex items-center">
                    <div className="flex items-center gap-3">
                      <div className="bg-purple-100 p-2 rounded-md">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12 2L15 8L21 9L16.5 14L18 20L12 17L6 20L7.5 14L3 9L9 8L12 2Z"
                            fill="#9333EA"
                          />
                        </svg>
                      </div>
                      <span className="font-semibold">Creativity</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-gray-600 pl-10">
                      We approach every project, every problem, and every
                      interaction with a creative mindset.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="user-centricity">
                  <AccordionTrigger className="flex items-center">
                    <div className="flex items-center gap-3">
                      <div className="bg-purple-100 p-2 rounded-md">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z"
                            fill="#9333EA"
                          />
                        </svg>
                      </div>
                      <span className="font-semibold">User-Centricity</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-gray-600 pl-10">
                      We design for people, not platforms. Understanding user
                      needs is at the core of everything we do.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="collaboration">
                  <AccordionTrigger className="flex items-center">
                    <div className="flex items-center gap-3">
                      <div className="bg-purple-100 p-2 rounded-md">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M16 11C17.66 11 18.99 9.66 18.99 8C18.99 6.34 17.66 5 16 5C14.34 5 13 6.34 13 8C13 9.66 14.34 11 16 11ZM8 11C9.66 11 10.99 9.66 10.99 8C10.99 6.34 9.66 5 8 5C6.34 5 5 6.34 5 8C5 9.66 6.34 11 8 11ZM8 13C5.67 13 1 14.17 1 16.5V19H15V16.5C15 14.17 10.33 13 8 13ZM16 13C15.71 13 15.38 13.02 15.03 13.05C16.19 13.89 17 15.02 17 16.5V19H23V16.5C23 14.17 18.33 13 16 13Z"
                            fill="#9333EA"
                          />
                        </svg>
                      </div>
                      <span className="font-semibold">Collaboration</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-gray-600 pl-10">
                      Great work happens when diverse minds come together. We
                      value teamwork and partnership.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="integrity">
                  <AccordionTrigger className="flex items-center">
                    <div className="flex items-center gap-3">
                      <div className="bg-purple-100 p-2 rounded-md">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1ZM10 17L6 13L7.41 11.59L10 14.17L16.59 7.58L18 9L10 17Z"
                            fill="#9333EA"
                          />
                        </svg>
                      </div>
                      <span className="font-semibold">Integrity</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-gray-600 pl-10">
                      We believe in honest communication, transparent processes,
                      and ethical business practices.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="growth">
                  <AccordionTrigger className="flex items-center">
                    <div className="flex items-center gap-3">
                      <div className="bg-purple-100 p-2 rounded-md">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M16 6L18.29 8.29L13.41 13.17L9.41 9.17L2 16.59L3.41 18L9.41 12L13.41 16L19.71 9.71L22 12V6H16Z"
                            fill="#9333EA"
                          />
                        </svg>
                      </div>
                      <span className="font-semibold">Growth</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-gray-600 pl-10">
                      We're committed to continuous learning and improvement,
                      both for ourselves and our clients.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </motion.div>

            <motion.div
              className="grid grid-cols-2 gap-6"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="rounded-lg overflow-hidden h-full">
                <Image
                  src="/placeholder.svg?height=400&width=300"
                  width={300}
                  height={400}
                  alt="Team collaboration"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-lg overflow-hidden h-full">
                <Image
                  src="/placeholder.svg?height=400&width=300"
                  width={300}
                  height={400}
                  alt="Creative process"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl font-bold mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            The Minds Behind <span className="text-purple-600">U3DEVLAB</span>
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            <motion.div
              className="border border-purple-200 rounded-lg p-4 bg-purple-50 hover:shadow-lg transition-all duration-300 hover:-translate-y-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="mb-4 relative">
                <div className="absolute -top-2 -right-2 animate-pulse">
                  <StarIcon size={16} />
                </div>
                <Image
                  src="/placeholder.svg?height=200&width=200"
                  width={200}
                  height={200}
                  alt="Shihab Uddin"
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <h3 className="font-bold text-lg">Shihab Uddin</h3>
              <p className="text-gray-600">Product Manager</p>
            </motion.div>

            <motion.div
              className="border border-purple-200 rounded-lg p-4 bg-purple-50 hover:shadow-lg transition-all duration-300 hover:-translate-y-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="mb-4 relative">
                <div
                  className="absolute -top-2 -right-2 animate-pulse"
                  style={{ animationDelay: "0.5s" }}
                >
                  <StarIcon size={16} />
                </div>
                <Image
                  src="/placeholder.svg?height=200&width=200"
                  width={200}
                  height={200}
                  alt="Asif Rahman"
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <h3 className="font-bold text-lg">Asif Rahman</h3>
              <p className="text-gray-600">Developer</p>
            </motion.div>

            <motion.div
              className="border border-purple-200 rounded-lg p-4 bg-purple-50 hover:shadow-lg transition-all duration-300 hover:-translate-y-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="mb-4 relative">
                <div
                  className="absolute -top-2 -right-2 animate-pulse"
                  style={{ animationDelay: "1s" }}
                >
                  <StarIcon size={16} />
                </div>
                <Image
                  src="/placeholder.svg?height=200&width=200"
                  width={200}
                  height={200}
                  alt="Shahed Shahriar"
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <h3 className="font-bold text-lg">Shahed Shahriar</h3>
              <p className="text-gray-600">UI Designer</p>
            </motion.div>

            <motion.div
              className="border border-purple-200 rounded-lg p-4 bg-purple-50 hover:shadow-lg transition-all duration-300 hover:-translate-y-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="mb-4 relative">
                <div
                  className="absolute -top-2 -right-2 animate-pulse"
                  style={{ animationDelay: "1.5s" }}
                >
                  <StarIcon size={16} />
                </div>
                <Image
                  src="/placeholder.svg?height=200&width=200"
                  width={200}
                  height={200}
                  alt="Afia Nishat Kanta"
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <h3 className="font-bold text-lg">Afia Nishat Kanta</h3>
              <p className="text-gray-600">UX Researcher</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Journey Section - Masonry Layout */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl font-bold text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Our Journey
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-6">
              <motion.div
                className="bg-white p-6 rounded-lg shadow-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <h3 className="font-bold text-purple-600 mb-2">
                  Company Founded
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Started with a small team of 3 passionate designers
                </p>
                <div className="relative">
                  <div className="absolute -top-2 -right-2 animate-pulse">
                    <StarIcon size={16} />
                  </div>
                  <Image
                    src="/placeholder.svg?height=200&width=300"
                    width={300}
                    height={200}
                    alt="Company founding"
                    className="w-full h-auto rounded-lg"
                  />
                </div>
              </motion.div>

              <motion.div
                className="bg-purple-600 text-white p-6 rounded-lg shadow-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <h3 className="font-bold mb-2">Today & Beyond</h3>
                <p className="text-sm text-purple-100 mb-4">
                  Continuing to innovate and deliver exceptional digital
                  experiences
                </p>
                <div className="relative">
                  <Image
                    src="/placeholder.svg?height=300&width=300"
                    width={300}
                    height={300}
                    alt="Future vision"
                    className="w-full h-auto rounded-lg"
                  />
                </div>
              </motion.div>
            </div>

            <div className="space-y-6">
              <motion.div
                className="bg-purple-100 p-6 rounded-lg shadow-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h3 className="font-bold text-purple-600 mb-2">
                  First Major Client
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Landed our first enterprise client and expanded our services
                </p>
                <div className="relative">
                  <Image
                    src="/placeholder.svg?height=400&width=300"
                    width={300}
                    height={400}
                    alt="First client"
                    className="w-full h-auto rounded-lg"
                  />
                </div>
              </motion.div>
            </div>

            <div className="space-y-6">
              <motion.div
                className="bg-white p-6 rounded-lg shadow-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <h3 className="font-bold text-purple-600 mb-2">
                  Global Expansion
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Expanded our team and opened our first international office
                </p>
                <div className="relative">
                  <div className="absolute -bottom-2 -right-2 animate-pulse">
                    <StarIcon size={16} />
                  </div>
                  <Image
                    src="/placeholder.svg?height=250&width=300"
                    width={300}
                    height={250}
                    alt="Global expansion"
                    className="w-full h-auto rounded-lg"
                  />
                </div>
              </motion.div>

              <motion.div
                className="bg-purple-600 text-white p-6 rounded-lg shadow-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <h3 className="font-bold mb-2">Award Winning Projects</h3>
                <p className="text-sm text-purple-100 mb-4">
                  Recognized for excellence in design and development
                </p>
                <div className="relative">
                  <Image
                    src="/placeholder.svg?height=150&width=300"
                    width={300}
                    height={150}
                    alt="Awards"
                    className="w-full h-auto rounded-lg"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 text-center relative">
        <div className="absolute top-10 left-10 animate-pulse">
          <StarIcon size={24} />
        </div>
        <div className="absolute bottom-10 right-10 animate-bounce-slow">
          <StarIcon size={20} />
        </div>

        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Ready to Bring Your Vision to Life?
          </motion.h2>
          <motion.div
            className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            LET'S START
            <br />
            Your BUSINESS
          </motion.div>
          <motion.div
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className="bg-purple-600 hover:bg-purple-700 transition-all duration-300">
                Start Your Project
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                className="border-purple-600 text-purple-600 transition-all duration-300"
              >
                Free Consultation
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
