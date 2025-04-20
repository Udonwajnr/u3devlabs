import { NextResponse } from "next/server"
import { signupInputSchema } from "@/lib/schemas"
import { createUser, hashPassword, sanitizeUser } from "@/lib/auth"

export async function POST(request: Request) {
  try {
    // Parse request body
    const body = await request.json()

    // Validate with Zod schema
    const result = signupInputSchema.safeParse(body)

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

    const { name, email, password } = result.data

    try {
      // Hash the password
      const hashedPassword = await hashPassword(password)

      // Create user object
      const userData = {
        name,
        email,
        password: hashedPassword,
        role: "admin" as const, // Default role for new signups
        avatar: "",
        createdAt: new Date().toISOString(),
      }

      // Save user to database
      const newUser = await createUser(userData)

      // Remove password from user object before sending to client
      const sanitizedUser = sanitizeUser(newUser)

      return NextResponse.json({
        user: sanitizedUser,
        message: "Signup successful",
      })
    } catch (err) {
      if (err instanceof Error && err.message === "User already exists") {
        return NextResponse.json({ error: "Email already in use" }, { status: 409 })
      }
      throw err
    }
  } catch (error) {
    console.error("Signup error:", error)
    return NextResponse.json({ error: "Registration failed" }, { status: 500 })
  }
}
