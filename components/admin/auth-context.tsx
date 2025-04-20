"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import axios from "axios"

type User = {
  _id: string
  name: string
  email: string
  role: string
  avatar?: string
  createdAt: string
}

type AuthContextType = {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<boolean>
  signup: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Check if user is already logged in on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("adminUser")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
        setIsAuthenticated(true)
      } catch (error) {
        console.error("Failed to parse stored user:", error)
        localStorage.removeItem("adminUser")
      }
    }
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true)
      setError(null)

      // Call the login API
      const response = await axios.post("/api/auth/login", {
        email,
        password,
      })

      const { user } = response.data

      // Store user data and update state
      setUser(user)
      setIsAuthenticated(true)
      localStorage.setItem("adminUser", JSON.stringify(user))

      return true
    } catch (error) {
      console.error("Login error:", error)

      if (axios.isAxiosError(error) && error.response) {
        setError(error.response.data.error || "Authentication failed")
      } else {
        setError("An unexpected error occurred")
      }

      return false
    } finally {
      setIsLoading(false)
    }
  }

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true)
      setError(null)

      // Call the signup API
      const response = await axios.post("/api/auth/signup", {
        name,
        email,
        password,
      })

      const { user } = response.data

      // Store user data and update state
      setUser(user)
      setIsAuthenticated(true)
      localStorage.setItem("adminUser", JSON.stringify(user))

      return true
    } catch (error) {
      console.error("Signup error:", error)

      if (axios.isAxiosError(error) && error.response) {
        setError(error.response.data.error || "Registration failed")
      } else {
        setError("An unexpected error occurred")
      }

      return false
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem("adminUser")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        error,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
