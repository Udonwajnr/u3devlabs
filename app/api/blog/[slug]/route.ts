import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import { blogPostSchema } from "@/lib/schemas"

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  try {
    const slug = params.slug

    const client = await clientPromise
    const db = client.db("u3devlab")

    const blogPost = await db.collection("blog_posts").findOne({ slug })

    if (!blogPost) {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 })
    }

    return NextResponse.json(blogPost)
  } catch (error) {
    console.error("Error fetching blog post:", error)
    return NextResponse.json({ error: "Failed to fetch blog post" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { slug: string } }) {
  try {
    const slug = params.slug
    const body = await request.json()

    // Update timestamp
    body.updatedAt = new Date().toISOString()

    // If publish status is changing to published, set publishedAt
    if (body.isPublished && !body.publishedAt) {
      body.publishedAt = new Date().toISOString()
    }

    // Validate data
    const validation = blogPostSchema.safeParse(body)
    if (!validation.success) {
      return NextResponse.json({ error: validation.error.errors }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db("u3devlab")

    // If slug is changing, check if the new slug is unique
    if (body.slug !== slug) {
      const existingPost = await db.collection("blog_posts").findOne({ slug: body.slug })
      if (existingPost) {
        return NextResponse.json({ error: "A post with this slug already exists" }, { status: 409 })
      }
    }

    const result = await db.collection("blog_posts").updateOne({ slug }, { $set: body })

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      updated: result.modifiedCount,
      post: body,
    })
  } catch (error) {
    console.error("Error updating blog post:", error)
    return NextResponse.json({ error: "Failed to update blog post" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { slug: string } }) {
  try {
    const slug = params.slug

    const client = await clientPromise
    const db = client.db("u3devlab")

    const result = await db.collection("blog_posts").deleteOne({ slug })

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting blog post:", error)
    return NextResponse.json({ error: "Failed to delete blog post" }, { status: 500 })
  }
}
