"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"

type User = {
  id: string
  name: string
  email: string
  role: string
}

type AuthContextType = {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  signup: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Check if user is already logged in on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("adminUser")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
      setIsAuthenticated(true)
    }
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    // In a real app, this would make an API call to verify credentials
    // For demo purposes, we'll accept any email/password with basic validation
    if (!email || !password) {
      return false
    }

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Demo user
    const demoUser: User = {
      id: "1",
      name: email.split("@")[0],
      email,
      role: "admin",
    }

    setUser(demoUser)
    setIsAuthenticated(true)
    localStorage.setItem("adminUser", JSON.stringify(demoUser))
    return true
  }

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    // In a real app, this would make an API call to create a new user
    if (!name || !email || !password) {
      return false
    }

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Demo user
    const demoUser: User = {
      id: "1",
      name,
      email,
      role: "admin",
    }

    setUser(demoUser)
    setIsAuthenticated(true)
    localStorage.setItem("adminUser", JSON.stringify(demoUser))
    return true
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem("adminUser")
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, signup, logout }}>{children}</AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
