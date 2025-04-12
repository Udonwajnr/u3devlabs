"use client"

import { motion } from "framer-motion"
import { FileText, ImageIcon, ArrowUp, ArrowDown, Eye, MessageSquare } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/components/admin/auth-context"

export default function AdminDashboard() {
  const { user } = useAuth()

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-2xl font-bold">Welcome back, {user?.name || "Admin"}</h1>
        <p className="text-gray-500">Here's what's happening with your website today.</p>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Page Views</CardTitle>
              <Eye className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24,892</div>
              <p className="text-xs text-gray-500">
                <span className="text-green-500 inline-flex items-center">
                  <ArrowUp className="h-3 w-3 mr-1" />
                  12%
                </span>{" "}
                from last month
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Blog Posts</CardTitle>
              <FileText className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-gray-500">
                <span className="text-green-500 inline-flex items-center">
                  <ArrowUp className="h-3 w-3 mr-1" />2
                </span>{" "}
                new this month
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Portfolio Projects</CardTitle>
              <ImageIcon className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">6</div>
              <p className="text-xs text-gray-500">
                <span className="text-green-500 inline-flex items-center">
                  <ArrowUp className="h-3 w-3 mr-1" />1
                </span>{" "}
                new this month
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Comments</CardTitle>
              <MessageSquare className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">32</div>
              <p className="text-xs text-gray-500">
                <span className="text-red-500 inline-flex items-center">
                  <ArrowDown className="h-3 w-3 mr-1" />
                  4%
                </span>{" "}
                from last month
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Recent Blog Posts</CardTitle>
              <CardDescription>Your most recent blog posts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded bg-gray-200 flex-shrink-0"></div>
                  <div>
                    <h3 className="font-medium">10 UI/UX Design Trends to Watch in 2024</h3>
                    <p className="text-sm text-gray-500">Published on May 15, 2024</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded bg-gray-200 flex-shrink-0"></div>
                  <div>
                    <h3 className="font-medium">The Future of Web Development</h3>
                    <p className="text-sm text-gray-500">Published on May 10, 2024</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded bg-gray-200 flex-shrink-0"></div>
                  <div>
                    <h3 className="font-medium">How to Optimize Your Website for Better Performance</h3>
                    <p className="text-sm text-gray-500">Published on May 5, 2024</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Popular Projects</CardTitle>
              <CardDescription>Your most viewed portfolio projects</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded bg-gray-200 flex-shrink-0"></div>
                    <div>
                      <h3 className="font-medium">E-commerce Platform</h3>
                      <p className="text-sm text-gray-500">Web Development</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-gray-500">
                    <Eye className="h-4 w-4" />
                    <span className="text-sm">1.2k</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded bg-gray-200 flex-shrink-0"></div>
                    <div>
                      <h3 className="font-medium">Mobile App Design</h3>
                      <p className="text-sm text-gray-500">UI/UX Design</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-gray-500">
                    <Eye className="h-4 w-4" />
                    <span className="text-sm">876</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded bg-gray-200 flex-shrink-0"></div>
                    <div>
                      <h3 className="font-medium">SaaS Dashboard</h3>
                      <p className="text-sm text-gray-500">Web Application</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-gray-500">
                    <Eye className="h-4 w-4" />
                    <span className="text-sm">654</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
