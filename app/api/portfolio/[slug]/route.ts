import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import { portfolioProjectSchema } from "@/lib/schemas"

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const {slug} = await params

    const client = await clientPromise
    const db = client.db("u3devlab")

    const project = await db.collection("portfolio_projects").findOne({ slug })

    if (!project) {
      return NextResponse.json({ error: "Portfolio project not found" }, { status: 404 })
    }

    return NextResponse.json(project)
  } catch (error) {
    console.error("Error fetching portfolio project:", error)
    return NextResponse.json({ error: "Failed to fetch portfolio project" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const {slug} = await params
    const body = await request.json()

    // Update timestamp
    body.updatedAt = new Date().toISOString()

    // Remove _id if present
    if ('_id' in body) {
      delete body._id
    }

    // Validate data
    const validation = portfolioProjectSchema.safeParse(body)
    if (!validation.success) {
      return NextResponse.json({ error: validation.error.errors }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db("u3devlab")

    // If slug is changing, check if the new slug is unique
    if (body.slug !== slug) {
      const existingProject = await db.collection("portfolio_projects").findOne({ slug: body.slug })
      if (existingProject) {
        return NextResponse.json({ error: "A project with this slug already exists" }, { status: 409 })
      }
    }

    const result = await db.collection("portfolio_projects").updateOne(
      { slug },
      { $set: body }
    )

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Portfolio project not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      updated: result.modifiedCount,
      project: body,
    })
  } catch (error) {
    console.error("Error updating portfolio project:", error)
    return NextResponse.json({ error: "Failed to update portfolio project" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const {slug} = await params

    const client = await clientPromise
    const db = client.db("u3devlab")

    const result = await db.collection("portfolio_projects").deleteOne({ slug })

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Portfolio project not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting portfolio project:", error)
    return NextResponse.json({ error: "Failed to delete portfolio project" }, { status: 500 })
  }
}
