import { type NextRequest, NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import { productSchema } from "@/lib/schemas"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const featured = searchParams.get("featured")
    const productType = searchParams.get("productType") 
    const limit = searchParams.get("limit") ? Number.parseInt(searchParams.get("limit") as string) : undefined

    const client = await clientPromise
    const db = client.db("u3devlab")

    const query: any = {}

    if (category && category !== "All") {
      query.category = category
    }

    if (featured === "true") {
      query.isFeatured = true
    }

    if (productType) {
      query.productType = productType
    }

    let productsQuery = db.collection("products").find(query).sort({ createdAt: -1 })

    if (limit) {
      productsQuery = productsQuery.limit(limit)
    }

    const products = await productsQuery.toArray()

    return NextResponse.json(products)
  } catch (error) {
    console.error("Error fetching products:", error)
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
  }
}


export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate product data
    const product = productSchema.parse({
      ...body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })

    const client = await clientPromise
    const db = client.db("u3devlab")

    // Check if slug already exists
    const existingProduct = await db.collection("products").findOne({ slug: product.slug })
    if (existingProduct) {
      return NextResponse.json({ error: "A product with this slug already exists" }, { status: 400 })
    }

    const result = await db.collection("products").insertOne(product)

    return NextResponse.json(
      {
        ...product,
        id: result.insertedId.toString(),
      },
      { status: 201 },
    )
  } catch (error: any) {
    console.error("Error creating product:", error)

    if (error.name === "ZodError") {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }

    return NextResponse.json({ error: "Failed to create product" }, { status: 500 })
  }
}
