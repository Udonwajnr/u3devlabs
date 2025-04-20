import { z } from "zod"

// Blog post schema
export const blogPostSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  slug: z.string().min(3, "Slug must be at least 3 characters long"),
  excerpt: z.string().min(10, "Excerpt must be at least 10 characters long"),
  content: z.string().min(50, "Content must be at least 50 characters long"),
  coverImage: z.string().url("Cover image must be a valid URL"),
  author: z.object({
    name: z.string(),
    avatar: z.string().optional(),
  }),
  category: z.string(),
  tags: z.array(z.string()),
  isPublished: z.boolean().default(false),
  publishedAt: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
  views: z.number().default(0),
})

export type BlogPost = z.infer<typeof blogPostSchema>

// Portfolio project schema
export const portfolioProjectSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  slug: z.string().min(3, "Slug must be at least 3 characters long"),
  description: z.string().min(2, "Description must be at least 10 characters long"),
  content: z.string().optional(),
  coverImage: z.string().url("Cover image must be a valid URL"),
  images: z.array(z.string().url("Image must be a valid URL")),
  categories: z.array(z.string()),
  tags: z.array(z.string()),
  client: z.string().optional(),
  completedAt: z.string().optional(),
  technologies: z.array(z.string()),
  website: z.string().url("Website must be a valid URL").optional(),
  isPublished: z.boolean().default(false),
  featured: z.boolean().default(false),
  createdAt: z.string(),
  updatedAt: z.string(),
  views: z.number().default(0),
})

export type PortfolioProject = z.infer<typeof portfolioProjectSchema>

// User schema
export const userSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  email: z.string().email("Invalid email address"),
  role: z.enum(["admin", "editor"]),
  avatar: z.string().optional(),
  createdAt: z.string(),
})

export type User = z.infer<typeof userSchema>

// Message schema
export const messageSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters long"),
  email: z.string().email("Invalid email address"),
  company: z.string().optional(),
  service: z.string().optional(),
  budget: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters long"),
  date: z.string(),
  status: z.enum(["read", "unread"]).default("unread"),
  isEmailSent: z.boolean().default(false),
})

export type Message = z.infer<typeof messageSchema>

// Product schema
export const productSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(3, "Title must be at least 3 characters long"),
  slug: z.string().min(3, "Slug must be at least 3 characters long"),
  description: z.string().min(10, "Description must be at least 10 characters long"),
  price: z.number().min(0, "Price must be a positive number"),
  salePrice: z.number().min(0, "Sale price must be a positive number").optional(),
  category: z.string(),
  tags: z.array(z.string()),
  features: z.array(z.string()).optional(),
  images: z.array(z.string().url("Image must be a valid URL")),
  mainImage: z.string().url("Main image must be a valid URL"),
  isPublished: z.boolean().default(false),
  isFeatured: z.boolean().default(false),
  stock: z.number().int().min(0, "Stock must be a positive integer").default(0),
  createdAt: z.string(),
  updatedAt: z.string(),
  demoUrl: z.string().url("Demo URL must be a valid URL").optional(),
  // New fields for ebooks
  productType: z.enum(["physical", "digital", "ebook"]).default("digital"),
  // Ebook specific fields
  pageCount: z.number().int().min(1).optional(),
  language: z.string().optional(),
  isbn: z.string().optional(),
  publisher: z.string().optional(),
  publishDate: z.string().optional(),
  previewPages: z.array(z.string().url("Preview page image must be a valid URL")).optional(),
  fileFormat: z.array(z.string()).optional(),
  fileSize: z.string().optional(),
  downloadUrl: z.string().url("Download URL must be a valid URL").optional(),
})

export type Product = z.infer<typeof productSchema>

// Review schema
export const reviewSchema = z.object({
  id: z.string().optional(),
  productId: z.string(),
  userId: z.string().optional(),
  userName: z.string(),
  userEmail: z.string().email("Invalid email address"),
  rating: z.number().min(1).max(5),
  title: z.string().min(3, "Title must be at least 3 characters long"),
  comment: z.string().min(10, "Comment must be at least 10 characters long"),
  createdAt: z.string(),
  isVerified: z.boolean().default(false),
})

// Schema for login input validation
export const loginInputSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
})

// Schema for signup input validation
export const signupInputSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
})

export type LoginInput = z.infer<typeof loginInputSchema>
export type SignupInput = z.infer<typeof signupInputSchema>
export type Review = z.infer<typeof reviewSchema>
