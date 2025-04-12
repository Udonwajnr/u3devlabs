import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"

export async function GET(request: Request) {
  try {
    const url = new URL(request.url)
    const type = url.searchParams.get("type") || "blog"

    const client = await clientPromise
    const db = client.db("u3devlab")

    const collection = type === "portfolio" ? "portfolio_tags" : "blog_tags"
    const tags = await db.collection(collection).find({}).sort({ name: 1 }).toArray()

    return NextResponse.json(tags)
  } catch (error) {
    console.error("Error fetching tags:", error)
    return NextResponse.json({ error: "Failed to fetch tags" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, slug, type = "blog" } = body

    // Basic validation
    if (!name || !slug) {
      return NextResponse.json({ error: "Name and slug are required" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db("u3devlab")

    const collection = type === "portfolio" ? "portfolio_tags" : "blog_tags"

    // Check if slug is unique
    const existingTag = await db.collection(collection).findOne({ slug })
    if (existingTag) {
      return NextResponse.json({ error: "A tag with this slug already exists" }, { status: 409 })
    }

    const result = await db.collection(collection).insertOne({
      name,
      slug,
      createdAt: new Date().toISOString(),
    })

    return NextResponse.json({
      success: true,
      id: result.insertedId,
      tag: { name, slug, createdAt: new Date().toISOString() },
    })
  } catch (error) {
    console.error("Error creating tag:", error)
    return NextResponse.json({ error: "Failed to create tag" }, { status: 500 })
  }
}
