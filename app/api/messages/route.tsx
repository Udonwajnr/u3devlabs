import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db("u3devlab")

    const messages = await db.collection("messages").find({}).sort({ date: -1 }).toArray()

    return NextResponse.json(messages)
  } catch (error) {
    console.error("Error fetching messages:", error)
    return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const messageData = await request.json()

    // Add timestamp
    const messageWithTimestamp = {
      ...messageData,
      date: new Date().toISOString(),
      status: "unread",
      isEmailSent: true,
    }

    const client = await clientPromise
    const db = client.db("u3devlab")

    const result = await db.collection("messages").insertOne(messageWithTimestamp)

    return NextResponse.json({
      success: true,
      id: result.insertedId,
      message: messageWithTimestamp,
    })
  } catch (error) {
    console.error("Error saving message:", error)
    return NextResponse.json({ error: "Failed to save message" }, { status: 500 })
  }
}
