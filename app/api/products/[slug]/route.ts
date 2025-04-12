import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import { productSchema } from "@/lib/schemas"

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const { slug } = params
    const { db } = await connectToDatabase()

    const product = await db.collection("products").findOne({ slug })

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    return NextResponse.json(product)
  } catch (error) {
    console.error("Error fetching product:", error)
    return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const { slug } = params
    const body = await request.json()

    // Validate product data
    const updatedProduct = productSchema.parse({
      ...body,
      updatedAt: new Date().toISOString(),
    })

    const { db } = await connectToDatabase()

    // Check if product exists
    const existingProduct = await db.collection("products").findOne({ slug })
    if (!existingProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    // If slug is being changed, check if new slug already exists
    if (updatedProduct.slug !== slug) {
      const slugExists = await db.collection("products").findOne({ slug: updatedProduct.slug })
      if (slugExists) {
        return NextResponse.json({ error: "A product with this slug already exists" }, { status: 400 })
      }
    }

    // Update the product
    const result = await db.collection("products").updateOne({ slug }, { $set: updatedProduct })

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    return NextResponse.json(updatedProduct)
  } catch (error: any) {
    console.error("Error updating product:", error)

    if (error.name === "ZodError") {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }

    return NextResponse.json({ error: "Failed to update product" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const { slug } = params
    const { db } = await connectToDatabase()

    const result = await db.collection("products").deleteOne({ slug })

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Product deleted successfully" })
  } catch (error) {
    console.error("Error deleting product:", error)
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 })
  }
}
