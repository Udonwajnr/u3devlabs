import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    const { db } = await connectToDatabase()

    const result = await db.collection("reviews").deleteOne({ _id: new ObjectId(id) })

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Review not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Review deleted successfully" })
  } catch (error) {
    console.error("Error deleting review:", error)
    return NextResponse.json({ error: "Failed to delete review" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    const body = await request.json()

    // Only admin can verify reviews
    const { isVerified } = body

    const { db } = await connectToDatabase()

    const result = await db
      .collection("reviews")
      .updateOne({ _id: new ObjectId(id) }, { $set: { isVerified, updatedAt: new Date().toISOString() } })

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Review not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Review updated successfully" })
  } catch (error) {
    console.error("Error updating review:", error)
    return NextResponse.json({ error: "Failed to update review" }, { status: 500 })
  }
}
