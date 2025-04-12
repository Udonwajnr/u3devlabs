"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { LayoutDashboard, ImageIcon, FileText, Settings, LogOut, Menu, ChevronDown, Mail, Book, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

// Auth context to manage authentication state
import { AuthProvider, useAuth } from "@/components/admin/auth-context"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </AuthProvider>
  )
}

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated, logout } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Check if user is authenticated, if not redirect to login
  useEffect(() => {
    if (!isAuthenticated && pathname !== "/admin/login" && pathname !== "/admin/signup") {
      router.push("/admin/login")
    }
  }, [isAuthenticated, pathname, router])

  // If on login or signup page, don't show the dashboard layout
  if (pathname === "/admin/login" || pathname === "/admin/signup") {
    return <>{children}</>
  }

  const navigationItems = [
    { name: "Dashboard", href: "/admin", icon: <LayoutDashboard className="h-5 w-5" /> },
    { name: "Portfolio", href: "/admin/portfolio", icon: <ImageIcon className="h-5 w-5" /> },
    { name: "Blog", href: "/admin/blog", icon: <FileText className="h-5 w-5" /> },
    { name: "Messages", href: "/admin/messages", icon: <Mail className="h-5 w-5" /> },
    { name: "Ebooks", href: "/admin/ebooks", icon: <Book className="h-5 w-5" /> },
    { name: "Shop", href: "/admin/shop", icon: <ShoppingCart className="h-5 w-5" /> },
    { name: "Settings", href: "/admin/settings", icon: <Settings className="h-5 w-5" /> },
  ]

  const handleLogout = () => {
    logout()
    router.push("/admin/login")
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile Header */}
      <header className="bg-white shadow-sm py-4 px-4 flex md:hidden items-center justify-between sticky top-0 z-30">
        <div className="flex items-center">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="mr-2">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
              <div className="flex flex-col h-full">
                <div className="p-4 border-b">
                  <div className="font-bold text-xl text-purple-600">U3DEVLAB Admin</div>
                </div>
                <nav className="flex-1 p-4">
                  <ul className="space-y-2">
                    {navigationItems.map((item) => (
                      <li key={item.name}>
                        <Button
                          variant={pathname === item.href ? "default" : "ghost"}
                          className={`w-full justify-start ${
                            pathname === item.href ? "bg-purple-600 text-white" : "text-gray-700"
                          }`}
                          onClick={() => {
                            router.push(item.href)
                            setIsMobileMenuOpen(false)
                          }}
                        >
                          {item.icon}
                          <span className="ml-3">{item.name}</span>
                        </Button>
                      </li>
                    ))}
                  </ul>
                </nav>
                <div className="p-4 border-t">
                  <Button variant="ghost" className="w-full justify-start text-red-600" onClick={handleLogout}>
                    <LogOut className="h-5 w-5" />
                    <span className="ml-3">Logout</span>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
          <div className="font-bold text-xl text-purple-600">U3DEVLAB</div>
        </div>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt={user?.name || "User"} />
                  <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.push("/admin/settings")}>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Desktop Layout */}
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <aside className="hidden md:flex md:flex-col md:w-64 bg-white shadow-sm border-r">
          <div className="p-4 border-b">
            <div className="font-bold text-xl text-purple-600">U3DEVLAB Admin</div>
          </div>
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {navigationItems.map((item) => (
                <li key={item.name}>
                  <Button
                    variant={pathname === item.href ? "default" : "ghost"}
                    className={`w-full justify-start ${
                      pathname === item.href ? "bg-purple-600 text-white" : "text-gray-700"
                    }`}
                    onClick={() => router.push(item.href)}
                  >
                    {item.icon}
                    <span className="ml-3">{item.name}</span>
                  </Button>
                </li>
              ))}
            </ul>
          </nav>
          <div className="p-4 border-t">
            <Button variant="ghost" className="w-full justify-start text-red-600" onClick={handleLogout}>
              <LogOut className="h-5 w-5" />
              <span className="ml-3">Logout</span>
            </Button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-gray-100">
          {/* Desktop Header */}
          <header className="hidden md:flex items-center justify-end bg-white shadow-sm py-4 px-6 sticky top-0 z-20">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt={user?.name || "User"} />
                    <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
                  </Avatar>
                  <span>{user?.name || "Admin User"}</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push("/admin/settings")}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </header>

          {/* Page Content */}
          <div className="p-6">{children}</div>
        </main>
      </div>
    </div>
  )
}
