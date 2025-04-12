import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"

export async function GET(request: Request) {
  try {
    const url = new URL(request.url)
    const type = url.searchParams.get("type") || "blog"

    const client = await clientPromise
    const db = client.db("u3devlab")

    const collection = type === "portfolio" ? "portfolio_categories" : "blog_categories"
    const categories = await db.collection(collection).find({}).sort({ name: 1 }).toArray()

    return NextResponse.json(categories)
  } catch (error) {
    console.error("Error fetching categories:", error)
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 })
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

    const collection = type === "portfolio" ? "portfolio_categories" : "blog_categories"

    // Check if slug is unique
    const existingCategory = await db.collection(collection).findOne({ slug })
    if (existingCategory) {
      return NextResponse.json({ error: "A category with this slug already exists" }, { status: 409 })
    }

    const result = await db.collection(collection).insertOne({
      name,
      slug,
      createdAt: new Date().toISOString(),
    })

    return NextResponse.json({
      success: true,
      id: result.insertedId,
      category: { name, slug, createdAt: new Date().toISOString() },
    })
  } catch (error) {
    console.error("Error creating category:", error)
    return NextResponse.json({ error: "Failed to create category" }, { status: 500 })
  }
}
