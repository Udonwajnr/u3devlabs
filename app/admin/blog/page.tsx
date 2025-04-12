"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Plus, Pencil, Trash2, Search, Eye, MoreHorizontal, Filter, Calendar, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import ViewCounter from "@/components/blog/view-counter"

// Sample blog data
const initialBlogData = [
  {
    id: 1,
    title: "10 UI/UX Design Trends to Watch in 2024",
    excerpt:
      "Discover the latest design trends that are shaping the digital landscape and how you can incorporate them into your projects.",
    image: "/placeholder.svg?height=600&width=1200",
    date: "May 15, 2024",
    author: "Shahed Shahriar",
    authorImage: "/placeholder.svg?height=100&width=100",
    categories: ["design"],
    slug: "ui-ux-design-trends-2024",
    featured: true,
    status: "published",
    comments: 5,
    views: 1245,
  },
  {
    id: 2,
    title: "The Future of Web Development: What to Expect in the Next 5 Years",
    excerpt:
      "From WebAssembly to AI-driven development, explore the technologies that will define the future of web development.",
    image: "/placeholder.svg?height=600&width=1200",
    date: "May 10, 2024",
    author: "Asif Rahman",
    authorImage: "/placeholder.svg?height=100&width=100",
    categories: ["development", "technology"],
    slug: "future-of-web-development",
    featured: true,
    status: "published",
    comments: 3,
    views: 876,
  },
  {
    id: 3,
    title: "How to Optimize Your Website for Better Performance",
    excerpt:
      "Learn practical techniques to improve your website's loading speed and overall performance for better user experience.",
    image: "/placeholder.svg?height=400&width=600",
    date: "May 5, 2024",
    author: "Asif Rahman",
    authorImage: "/placeholder.svg?height=100&width=100",
    categories: ["development", "tutorials"],
    slug: "optimize-website-performance",
    status: "published",
    comments: 2,
    views: 654,
  },
  {
    id: 4,
    title: "Building Accessible Web Applications: A Comprehensive Guide",
    excerpt:
      "Discover how to create web applications that are accessible to all users, including those with disabilities.",
    image: "/placeholder.svg?height=400&width=600",
    date: "April 28, 2024",
    author: "Afia Nishat Kanta",
    authorImage: "/placeholder.svg?height=100&width=100",
    categories: ["development", "design"],
    slug: "building-accessible-web-applications",
    status: "draft",
    comments: 0,
    views: 321,
  },
  {
    id: 5,
    title: "The Role of AI in Modern Business Strategy",
    excerpt:
      "Explore how artificial intelligence is transforming business operations and strategy across various industries.",
    image: "/placeholder.svg?height=400&width=600",
    date: "April 20, 2024",
    author: "Shihab Uddin",
    authorImage: "/placeholder.svg?height=100&width=100",
    categories: ["business", "technology"],
    slug: "ai-in-modern-business-strategy",
    status: "published",
    comments: 7,
    views: 987,
  },
]

// Category options
const categoryOptions = [
  { id: "design", name: "Design" },
  { id: "development", name: "Development" },
  { id: "business", name: "Business" },
  { id: "technology", name: "Technology" },
  { id: "tutorials", name: "Tutorials" },
]

export default function BlogManagement() {
  const router = useRouter()
  const [blogData, setBlogData] = useState(initialBlogData)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [postToDelete, setPostToDelete] = useState<number | null>(null)

  // Filter posts based on search query, status, and category
  const filteredPosts = blogData.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || post.status === statusFilter
    const matchesCategory = categoryFilter === "all" || post.categories.includes(categoryFilter)
    return matchesSearch && matchesStatus && matchesCategory
  })

  const handleDeletePost = (id: number) => {
    setPostToDelete(id)
    setIsDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (postToDelete) {
      setBlogData(blogData.filter((post) => post.id !== postToDelete))
      setIsDeleteDialogOpen(false)
      setPostToDelete(null)
    }
  }

  return (
    <div className="space-y-6">
      <motion.div
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <h1 className="text-2xl font-bold">Blog Posts</h1>
          <p className="text-gray-500">Manage your blog content</p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700" onClick={() => router.push("/admin/blog/new")}>
          <Plus className="h-4 w-4 mr-2" />
          Add New Post
        </Button>
      </motion.div>

      <motion.div
        className="flex flex-col sm:flex-row gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            placeholder="Search posts..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[140px]">
              <div className="flex items-center gap-2">
                <Filter size={16} />
                <span>Status</span>
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
            </SelectContent>
          </Select>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[160px]">
              <div className="flex items-center gap-2">
                <Filter size={16} />
                <span>Category</span>
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categoryOptions.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">ID</TableHead>
                <TableHead>Post</TableHead>
                <TableHead>Categories</TableHead>
                <TableHead>
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    <span>Date</span>
                  </div>
                </TableHead>
                <TableHead className="text-center">
                  <div className="flex items-center justify-center gap-1">
                    <Eye size={14} />
                    <span>Views</span>
                  </div>
                </TableHead>
                <TableHead className="text-center">
                  <div className="flex items-center justify-center gap-1">
                    <MessageSquare size={14} />
                    <span>Comments</span>
                  </div>
                </TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPosts.length > 0 ? (
                filteredPosts.map((post) => (
                  <TableRow key={post.id}>
                    <TableCell className="font-medium">{post.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded bg-gray-200 flex-shrink-0"></div>
                        <div>
                          <div className="font-medium">{post.title}</div>
                          <div className="text-xs text-gray-500">By {post.author}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {post.categories.map((category) => (
                          <Badge key={category} variant="outline" className="bg-purple-100 text-purple-800">
                            {categoryOptions.find((c) => c.id === category)?.name || category}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>{post.date}</TableCell>
                    <TableCell className="text-center">
                      {/* Use the ViewCounter component with trackView set to false */}
                      <ViewCounter slug={post.slug} trackView={false} iconSize={14} />
                    </TableCell>
                    <TableCell className="text-center">{post.comments}</TableCell>
                    <TableCell className="text-center">
                      <Badge
                        className={
                          post.status === "published" ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"
                        }
                      >
                        {post.status === "published" ? "Published" : "Draft"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => router.push(`/admin/blog/${post.id}`)}>
                            <Eye className="h-4 w-4 mr-2" />
                            View
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => router.push(`/admin/blog/${post.id}/edit`)}>
                            <Pencil className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600" onClick={() => handleDeletePost(post.id)}>
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-6 text-gray-500">
                    No posts found matching your criteria
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </motion.div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure you want to delete this post?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete the blog post and remove it from your website.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
