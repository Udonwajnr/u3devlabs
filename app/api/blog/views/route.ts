import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"

// API route to get view count for a specific post
export async function GET(request: Request) {
  try {
    const url = new URL(request.url)
    const slug = url.searchParams.get("slug")

    if (!slug) {
      return NextResponse.json({ error: "Slug parameter is required" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db("u3devlab")

    // Get the post to check if it exists
    const post = await db.collection("blog_posts").findOne({ slug })

    if (!post) {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 })
    }

    // Return the view count
    return NextResponse.json({ views: post.views || 0 })
  } catch (error) {
    console.error("Error fetching view count:", error)
    return NextResponse.json({ error: "Failed to fetch view count" }, { status: 500 })
  }
}

// API route to increment view count for a specific post
export async function POST(request: Request) {
  try {
    const { slug } = await request.json()

    if (!slug) {
      return NextResponse.json({ error: "Slug parameter is required" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db("u3devlab")

    // Get the post to check if it exists
    const post = await db.collection("blog_posts").findOne({ slug })

    if (!post) {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 })
    }

    // Increment the view count
    const result = await db.collection("blog_posts").updateOne({ slug }, { $inc: { views: 1 } })

    if (result.modifiedCount === 0) {
      return NextResponse.json({ error: "Failed to update view count" }, { status: 500 })
    }

    // Return the updated view count
    const updatedPost = await db.collection("blog_posts").findOne({ slug })
    return NextResponse.json({ views: updatedPost?.views || 0 })
  } catch (error) {
    console.error("Error updating view count:", error)
    return NextResponse.json({ error: "Failed to update view count" }, { status: 500 })
  }
}
