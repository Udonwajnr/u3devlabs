import { NextResponse } from "next/server"
import { loginInputSchema } from "@/lib/schemas"
import { findUserByEmail, verifyPassword, sanitizeUser } from "@/lib/auth"

export async function POST(request: Request) {
  try {
    // Parse request body
    const body = await request.json()

    // Validate with Zod schema
    const result = loginInputSchema.safeParse(body)

    if (!result.success) {
      // Return validation errors
      return NextResponse.json(
        {
          error: "Invalid input",
          details: result.error.format(),
        },
        { status: 400 },
      )
    }

    const { email, password } = result.data

    // Find user in database
    const user = await findUserByEmail(email)

    if (!user) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    // Verify password
    const isPasswordValid = await verifyPassword(password, user.password)

    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    // Remove password from user object before sending to client
    const sanitizedUser = sanitizeUser(user)

    return NextResponse.json({
      user: sanitizedUser,
      message: "Login successful",
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 })
  }
}
