"use client";
import Image from "next/image";
import {
  Play,
  ArrowRight,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

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

const DotsPattern = ({ className }: { className?: any }) => (
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

// Testimonial data
const testimonials = [
  {
    id: 1,
    content:
      "The U3DEVLAB team is exceptional. Their website redesign completely transformed our online presence and the results speak for themselves - our conversion rate has increased by 40%.",
    author: "Michael Chen",
    role: "CEO, TechGrowth Inc.",
    image: "/client1.png",
  },
  {
    id: 2,
    content:
      "U3DEVLAB's mobile app development service exceeded our expectations. They delivered on time, on budget, and the app has received outstanding feedback from our users.",
    author: "Johnson james",
    role: "Product Manager, MobileFirst",
    image: "/client2.png",
  },
  {
    id: 3,
    content:
      "Working with U3DEVLAB was a game-changer for our business. Their attention to detail and strategic approach to our e-commerce platform resulted in a 65% increase in sales within the first month.",
    author: "David Rodriguez",
    role: "Founder, StyleShop",
    image: "/client3.png",
  },
];

export default function Home() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 md:py-32 relative bg-gradient-to-r from-blue-50 via-purple-50 to-pink-100">
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 md:left-20 animate-pulse">
          <StarIcon size={32} />
        </div>
        <div
          className="absolute bottom-20 right-10 md:right-32 animate-pulse"
          style={{ animationDelay: "1s" }}
        >
          <StarIcon size={24} />
        </div>
        <div className="absolute top-1/3 right-10 md:right-40">
          <CircleIcon size={16} fill="#9333EA" className="opacity-30" />
        </div>
        <div className="absolute bottom-1/4 left-1/4 hidden md:block">
          <DotsPattern className="opacity-30" />
        </div>

        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
          <motion.div
            className="space-y-6 relative"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute -top-10 -left-10 md:-left-5 md:-top-5 animate-spin-slow">
              <StarIcon size={20} fill="#9333EA" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              <span className="text-purple-600">Solutions</span> that
              Revolutionize
              {/* <span className="relative inline-block ml-2">
                <span className="absolute -top-6 -right-6">
                  <StarIcon size={24} />
                </span>
              </span> */}
              <br />
              <span>Experiences that </span>
              <span className="text-purple-600">Transform</span>
              <span className="relative inline-block ml-2">
                <span className="absolute -top-2 -right-6">
                  <StarIcon size={24} />
                </span>
              </span>
            </h1>
            <p className="text-gray-600 text-lg">
              U3DEVLAB specializes in cutting-edge digital solutions that
              elevate your business presence and transform user experiences.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button className="bg-purple-600 hover:bg-purple-700 transition-all duration-300 transform hover:scale-105">
                Get Started
              </Button>
              <Button
                variant="outline"
                className="border-purple-600 text-purple-600 transition-all duration-300 transform hover:scale-105"
              >
                Our Work
              </Button>
            </div>
            <div className="flex items-center gap-2 pt-4">
              <div className="flex -space-x-2">
                <Image
                  src="/client1.png"
                  width={40}
                  height={40}
                  className="rounded-full border-2 border-white"
                  alt="Client"
                />
                <Image
                  src="/client2.png"
                  width={40}
                  height={40}
                  className="rounded-full border-2 border-white"
                  alt="Client"
                />
                <Image
                  src="/client3.png"
                  width={40}
                  height={40}
                  className="rounded-full border-2 border-white"
                  alt="Client"
                />
              </div>
              <span className="text-sm text-gray-500">
                Trusted by industry leaders
              </span>
            </div>
          </motion.div>
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="absolute -top-10 -right-10 animate-bounce-slow">
              <StarIcon size={20} fill="#9333EA" />
            </div>
            <div className="absolute -bottom-5 -left-5 animate-pulse">
              <CircleIcon size={16} fill="#9333EA" />
            </div>
            <div className="relative rounded-lg overflow-hidden shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-transparent z-10"></div>
              <Image
                src="/img2.jpg"
                width={600}
                height={400}
                alt="Digital Solutions"
                className="w-full h-auto"
              />
              {/* <div className="absolute inset-0 flex items-center justify-center z-20">
                <motion.button
                  className="bg-white/90 rounded-full p-4 shadow-lg"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Play className="h-8 w-8 text-purple-600" />
                </motion.button>
              </div> */}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-12 border-t border-gray-100">
        <div className="container mx-auto px-4">
          <motion.div
            className="flex flex-wrap justify-center items-center gap-8 md:gap-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Image
              src="/logos/company-logo-1.png"
              width={100}
              height={30}
              alt="Partner logo"
              className="opacity-70 hover:opacity-100 transition-opacity"
            />

            <Image
              src="/logos/company-logo-2.png"
              width={100}
              height={30}
              alt="Partner logo"
              className="opacity-70 hover:opacity-100 transition-opacity"
            />

            <Image
              src="/logos/company-logo-3.png"
              width={100}
              height={30}
              alt="Partner logo"
              className="opacity-70 hover:opacity-100 transition-opacity"
            />

            <Image
              src="/logos/company-logo-4.png"
              width={100}
              height={30}
              alt="Partner logo"
              className="opacity-70 hover:opacity-100 transition-opacity"
            />

            <Image
              src="/logos/company-logo-5.png"
              width={100}
              height={30}
              alt="Partner logo"
              className="opacity-70 hover:opacity-100 transition-opacity"
            />
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 md:py-24 relative">
        <div className="absolute top-10 right-10 animate-pulse">
          <StarIcon size={20} />
        </div>
        <div className="absolute bottom-20 left-10 animate-bounce-slow">
          <CircleIcon size={12} />
        </div>
        <div className="absolute top-1/3 left-0 hidden md:block">
          <DotsPattern className="opacity-20" />
        </div>

        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl font-bold text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Our Expertise
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div
              className="bg-purple-600 text-white p-8 rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="flex justify-between items-start mb-6">
                <span className="text-xl font-bold">01</span>
                <ArrowRight className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-bold mb-4">Website Development</h3>
              <p className="text-purple-100">
                Custom websites built with modern technologies to deliver
                exceptional user experiences.
              </p>
            </motion.div>
            <motion.div
              className="bg-purple-600 text-white p-8 rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex justify-between items-start mb-6">
                <span className="text-xl font-bold">02</span>
                <ArrowRight className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-bold mb-4">Mobile App Development</h3>
              <p className="text-purple-100">
                Native and cross-platform mobile applications that engage users
                and drive business growth.
              </p>
            </motion.div>
            <motion.div
              className="bg-purple-600 text-white p-8 rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="flex justify-between items-start mb-6">
                <span className="text-xl font-bold">03</span>
                <ArrowRight className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-bold mb-4">Product Design (UI/UX)</h3>
              <p className="text-purple-100">
                User-centered design that creates intuitive, engaging, and
                effective digital experiences.
              </p>
            </motion.div>
            <motion.div
              className="bg-purple-600 text-white p-8 rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="flex justify-between items-start mb-6">
                <span className="text-xl font-bold">04</span>
                <ArrowRight className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-bold mb-4">E-commerce Solutions</h3>
              <p className="text-purple-100">
                Complete e-commerce websites with secure payment processing and
                inventory management.
              </p>
            </motion.div>
          </div>

          <motion.div
            className="mt-12 bg-purple-600 text-white p-8 rounded-xl hover:shadow-lg transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <div className="md:flex items-center justify-between">
              <div className="mb-6 md:mb-0">
                <h3 className="text-2xl font-bold mb-2">
                  Innovative Digital Solutions
                </h3>
                <p className="text-purple-100 max-w-xl">
                  We combine technical expertise and creative insights to
                  deliver digital solutions that transform your business
                  presence.
                </p>
              </div>
              <motion.div
                className="flex items-center gap-2 bg-white text-purple-600 px-6 py-3 rounded-full cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="font-medium">Free Consultation (30 min)</span>
                <div className="bg-purple-600 text-white p-1 rounded-full">
                  <ArrowRight className="h-4 w-4" />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Portfolio */}
      <section className="py-16 md:py-24 bg-gray-50 relative">
        <div className="absolute top-20 left-10 animate-pulse">
          <StarIcon size={16} />
        </div>
        <div className="absolute bottom-10 right-10 animate-bounce-slow">
          <StarIcon size={20} />
        </div>

        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl font-bold text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Our Recent Work
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Card 1 - Branded Kicks */}
            <motion.div
              className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Image
                src="/img4.png"
                width={400}
                height={250}
                alt="Branded Kicks eCommerce Website"
                className="w-full h-72 object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <h3 className="font-bold text-xl mb-2">Branded Kicks</h3>
                <p className="text-sm opacity-80">
                  An eCommerce platform selling premium shoe brands for every
                  style and season.
                </p>
              </div>
            </motion.div>

            {/* Card 2 - TixMart */}
            <motion.div
              className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Image
                src="/img6.png"
                width={400}
                height={250}
                alt="TixMart Ticket Marketplace"
                className="w-full h-72 object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <h3 className="font-bold text-xl mb-2">TixMart</h3>
                <p className="text-sm opacity-80">
                  A smart ticket marketplace where users can easily buy and sell
                  event tickets.
                </p>
              </div>
            </motion.div>

            {/* Card 3 - DeutschDiva */}
            <motion.div
              className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Image
                src="/img5.png"
                width={400}
                height={250}
                alt="DutchDiva German Learning Platform"
                className="w-full h-72 object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <h3 className="font-bold text-xl mb-2">DeutschDiva</h3>
                <p className="text-sm opacity-80">
                  An online platform empowering women to confidently learn and
                  master the German language.
                </p>
              </div>
            </motion.div>
          </div>

          <div className="text-center mt-10">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className="bg-purple-600 hover:bg-purple-700 transition-all duration-300">
                View All Projects
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-24 relative">
        <div className="absolute top-1/4 right-0 hidden md:block">
          <DotsPattern className="opacity-20" />
        </div>
        <div className="absolute bottom-10 left-10 animate-pulse">
          <CircleIcon size={16} />
        </div>

        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl font-bold text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Why Choose U3DEVLAB
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              className="flex gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="bg-purple-600 text-white p-2 h-fit rounded">
                <CheckCircle className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">User-Centric Design</h3>
                <p className="text-gray-600">
                  We design with purpose—crafting intuitive, engaging, and
                  seamless user experiences that keep your audience coming back.
                </p>
              </div>
            </motion.div>

            <motion.div
              className="flex gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="bg-purple-600 text-white p-2 h-fit rounded">
                <CheckCircle className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Expert Team</h3>
                <p className="text-gray-600">
                  Our experienced developers, designers, and strategists bring
                  deep industry knowledge and technical expertise to every
                  project.
                </p>
              </div>
            </motion.div>

            <motion.div
              className="flex gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="bg-purple-600 text-white p-2 h-fit rounded">
                <CheckCircle className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Proven Track Record</h3>
                <p className="text-gray-600">
                  We have consistently delivered measurable growth and digital
                  success for businesses of all sizes across diverse industries.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section className="py-16 md:py-24 bg-gray-50 relative">
        <div className="absolute top-10 left-10 animate-bounce-slow">
          <StarIcon size={16} />
        </div>
        <div className="absolute bottom-20 right-10 animate-pulse">
          <StarIcon size={20} />
        </div>

        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl font-bold text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            What Our Clients Say
          </motion.h2>

          <div className="relative max-w-4xl mx-auto">
            <div className="overflow-hidden">
              <div className="flex items-center justify-center">
                <motion.div
                  key={currentTestimonial}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className={cn(
                    "bg-purple-600 text-white p-8 md:p-10 rounded-xl shadow-lg",
                    currentTestimonial % 2 === 1 &&
                      "bg-white text-gray-700 border border-purple-100"
                  )}
                >
                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10 0L12.9389 6.56434L20 7.63932L14.6447 12.7639L16.1803 20L10 16.5643L3.81966 20L5.35534 12.7639L0 7.63932L7.06107 6.56434L10 0Z"
                          fill={
                            currentTestimonial % 2 === 0 ? "white" : "#FBBF24"
                          }
                        />
                      </svg>
                    ))}
                  </div>
                  <p className="text-lg md:text-xl mb-8">
                    {testimonials[currentTestimonial].content}
                  </p>
                  <div className="flex items-center gap-3">
                    <Image
                      src={
                        testimonials[currentTestimonial].image ||
                        "/placeholder.svg"
                      }
                      width={60}
                      height={60}
                      alt={testimonials[currentTestimonial].author}
                      className="rounded-full"
                    />
                    <div>
                      <p className="font-bold">
                        {testimonials[currentTestimonial].author}
                      </p>
                      <p
                        className={cn(
                          "text-sm",
                          currentTestimonial % 2 === 0
                            ? "text-purple-200"
                            : "text-gray-500"
                        )}
                      >
                        {testimonials[currentTestimonial].role}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            <div className="flex justify-center mt-8 gap-4">
              <button
                onClick={prevTestimonial}
                className="p-2 rounded-full bg-white border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors"
              >
                <ChevronLeft className="h-5 w-5 text-gray-600" />
              </button>
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-3 h-3 rounded-full ${
                      currentTestimonial === index
                        ? "bg-purple-600"
                        : "bg-purple-300"
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={nextTestimonial}
                className="p-2 rounded-full bg-white border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors"
              >
                <ChevronRight className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 relative bg-gradient-to-r from-blue-50 via-purple-50 to-pink-100">
        <div className="absolute top-20 right-10 animate-pulse opacity-60">
          <StarIcon size={24} className="text-indigo-600" />
        </div>
        <div className="absolute bottom-10 left-20 animate-bounce-slow opacity-60">
          <CircleIcon size={16} className="text-purple-500" />
        </div>

        <div className="container mx-auto px-4">
          <motion.div
            className="flex flex-col md:flex-row items-center justify-between gap-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="max-w-xl text-center md:text-left">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                Ready to Transform Your Digital Presence?
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Harness the power of cutting-edge technology and innovative
                solutions to take your business to the next level. We are here
                to help you enhance your digital footprint and stand out in a
                competitive market.
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button className="bg-purple-600 hover:bg-purple-700 transition-all duration-300 text-white px-6 py-3 rounded-lg shadow-md">
                  Get Started
                </Button>
              </motion.div>
            </div>
            <div className="relative">
              <div className="absolute -top-5 -left-5 animate-pulse opacity-60">
                <StarIcon size={16} className="text-indigo-600" />
              </div>
              <Image
                src="/img3.jpg"
                width={450}
                height={350}
                alt="Digital Transformation"
                className="rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
              />
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
