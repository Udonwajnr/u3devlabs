import { compare, hash } from "bcryptjs"
import clientPromise from "@/lib/mongodb"
import type { User } from "@/lib/schemas"

// Get MongoDB database
export async function getDb() {
  const client = await clientPromise
  return client.db("u3devlab") // Use your preferred database name
}

// Get users collection
export async function getUsersCollection() {
  const db = await getDb()
  return db.collection("users")
}

// Find user by email
export async function findUserByEmail(email: string) {
  const users = await getUsersCollection()
  return users.findOne({ email })
}

// Create a new user
export async function createUser(userData: Omit<User, "_id">) {
  const users = await getUsersCollection()

  // Check if user already exists
  const existingUser = await findUserByEmail(userData.email)
  if (existingUser) {
    throw new Error("User already exists")
  }

  // Insert the new user
  const result = await users.insertOne(userData)

  if (!result.acknowledged) {
    throw new Error("Failed to create user")
  }

  return { ...userData, _id: result.insertedId }
}

// Hash password
export async function hashPassword(password: string) {
  return hash(password, 12)
}

// Verify password
export async function verifyPassword(password: string, hashedPassword: string) {
  return compare(password, hashedPassword)
}

// Sanitize user object (remove password before sending to client)
export function sanitizeUser(user: any) {
  if (!user) return null

  // Create a new object without the password
  const { password, ...sanitizedUser } = user

  return sanitizedUser
}
