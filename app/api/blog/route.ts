import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import { blogPostSchema } from "@/lib/schemas"

export async function GET(request: Request) {
  try {
    const url = new URL(request.url)
    const category = url.searchParams.get("category")
    const tag = url.searchParams.get("tag")
    const search = url.searchParams.get("search")
    const published = url.searchParams.get("published")

    const query: Record<string, any> = {}

    if (category) query.category = category
    if (tag) query.tags = tag
    if (search) query.title = { $regex: search, $options: "i" }
    if (published) query.isPublished = published === "true"

    const client = await clientPromise
    const db = client.db("u3devlab")

    const blogPosts = await db.collection("blog_posts").find(query).sort({ createdAt: -1 }).toArray()

    return NextResponse.json(blogPosts)
  } catch (error) {
    console.error("Error fetching blog posts:", error)
    return NextResponse.json({ error: "Failed to fetch blog posts" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Generate slug if not provided
    if (!body.slug) {
      body.slug = body.title
        .toLowerCase()
        .replace(/[^\w\s]/gi, "")
        .replace(/\s+/g, "-")
    }

    // Add timestamps
    body.createdAt = new Date().toISOString()
    body.updatedAt = new Date().toISOString()

    // Validate data
    const validation = blogPostSchema.safeParse(body)
    if (!validation.success) {
      return NextResponse.json({ error: validation.error.errors }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db("u3devlab")

    // Check if slug is unique
    const existingPost = await db.collection("blog_posts").findOne({ slug: body.slug })
    if (existingPost) {
      return NextResponse.json({ error: "A post with this slug already exists" }, { status: 409 })
    }

    const result = await db.collection("blog_posts").insertOne(body)

    return NextResponse.json({
      success: true,
      id: result.insertedId,
      post: body,
    })
  } catch (error) {
    console.error("Error creating blog post:", error)
    return NextResponse.json({ error: "Failed to create blog post" }, { status: 500 })
  }
}
