import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import { portfolioProjectSchema } from "@/lib/schemas"

export async function GET(request: Request) {
  try {
    const url = new URL(request.url)
    const category = url.searchParams.get("category")
    const tag = url.searchParams.get("tag")
    const search = url.searchParams.get("search")
    const featured = url.searchParams.get("featured")
    const published = url.searchParams.get("published")

    const query: Record<string, any> = {}

    if (category) query.category = category
    if (tag) query.tags = tag
    if (search) query.title = { $regex: search, $options: "i" }
    if (featured) query.featured = featured === "true"
    if (published) query.isPublished = published === "true"

    const client = await clientPromise
    const db = client.db("u3devlab")

    const projects = await db.collection("portfolio_projects").find(query).sort({ createdAt: -1 }).toArray()

    return NextResponse.json(projects)
  } catch (error) {
    console.error("Error fetching portfolio projects:", error)
    return NextResponse.json({ error: "Failed to fetch portfolio projects" }, { status: 500 })
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
    const validation = portfolioProjectSchema.safeParse(body)
    if (!validation.success) {
      return NextResponse.json({ error: validation.error.errors }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db("u3devlab")

    // Check if slug is unique
    const existingProject = await db.collection("portfolio_projects").findOne({ slug: body.slug })
    if (existingProject) {
      return NextResponse.json({ error: "A project with this slug already exists" }, { status: 409 })
    }

    const result = await db.collection("portfolio_projects").insertOne(body)

    return NextResponse.json({
      success: true,
      id: result.insertedId,
      project: body,
    })
  } catch (error) {
    console.error("Error creating portfolio project:", error)
    return NextResponse.json({ error: "Failed to create portfolio project" }, { status: 500 })
  }
}
