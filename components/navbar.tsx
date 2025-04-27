"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`py-4 fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <motion.span
              className="text-2xl font-bold text-purple-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              U3DEVLAB
            </motion.span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-sm font-medium hover:text-purple-600 transition-colors duration-300"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium hover:text-purple-600 transition-colors duration-300"
            >
              About
            </Link>
            <Link
              href="/services"
              className="text-sm font-medium hover:text-purple-600 transition-colors duration-300"
            >
              Services
            </Link>
            <Link
              href="/portfolio"
              className="text-sm font-medium hover:text-purple-600 transition-colors duration-300"
            >
              Portfolio
            </Link>
            <Link
              href="/shop"
              className="text-sm font-medium hover:text-purple-600 transition-colors duration-300"
            >
              Shop
            </Link>
            <Link
              href="/blog"
              className="text-sm font-medium hover:text-purple-600 transition-colors duration-300"
            >
              Blog
            </Link>
          </nav>

          <div className="flex items-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                asChild
                variant="link"
                className="bg-purple-600 hover:bg-purple-700 transition-all duration-300"
              >
                <Link href="/contact" className="text-white hover:no-underline">Contact Us</Link>
              </Button>
            </motion.div>
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="md:hidden ml-4">
                <Button variant="outline" size="icon" className="border-none">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="flex justify-end mb-8">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                <nav className="flex flex-col space-y-6">
                  <Link
                    href="/"
                    className="text-lg font-medium hover:text-purple-600 transition-colors duration-300"
                    onClick={() => setIsOpen(false)}
                  >
                    Home
                  </Link>
                  <Link
                    href="/about"
                    className="text-lg font-medium hover:text-purple-600 transition-colors duration-300"
                    onClick={() => setIsOpen(false)}
                  >
                    About
                  </Link>
                  <Link
                    href="/services"
                    className="text-lg font-medium hover:text-purple-600 transition-colors duration-300"
                    onClick={() => setIsOpen(false)}
                  >
                    Services
                  </Link>
                  <Link
                    href="/portfolio"
                    className="text-lg font-medium hover:text-purple-600 transition-colors duration-300"
                    onClick={() => setIsOpen(false)}
                  >
                    Portfolio
                  </Link>
                  <Link
                    href="/shop"
                    className="text-lg font-medium hover:text-purple-600 transition-colors duration-300"
                    onClick={() => setIsOpen(false)}
                  >
                    Shop
                  </Link>
                  <Link
                    href="/blog"
                    className="text-lg font-medium hover:text-purple-600 transition-colors duration-300"
                    onClick={() => setIsOpen(false)}
                  >
                    Blog
                  </Link>
                  <Link
                    href="/contact"
                    className="text-lg font-medium hover:text-purple-600 transition-colors duration-300"
                    onClick={() => setIsOpen(false)}
                  >
                    Contact
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
