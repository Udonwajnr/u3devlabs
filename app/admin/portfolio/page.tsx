"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Plus, Pencil, Trash2, Search, Eye, MoreHorizontal, Filter } from "lucide-react"
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

// Sample portfolio data
const initialPortfolioData = [
  {
    id: 1,
    title: "Astha | Real Estate Platform",
    categories: ["landing-page", "saas"],
    image: "/placeholder.svg?height=400&width=600",
    date: "05/10/2024",
    tags: ["UI/UX", "Case Study", "Product Design"],
    views: 1245,
    status: "published",
  },
  {
    id: 2,
    title: "Dripkicks | Sneaker Marketplace",
    categories: ["ecommerce"],
    image: "/placeholder.svg?height=400&width=600",
    date: "12/05/2024",
    tags: ["UI/UX", "Case Study", "Product Design"],
    views: 876,
    status: "published",
  },
  {
    id: 3,
    title: "imelody | Music Brand",
    categories: ["branding"],
    image: "/placeholder.svg?height=400&width=600",
    date: "18/04/2024",
    tags: ["Brand Design", "Case Study", "Logo"],
    views: 543,
    status: "published",
  },
  {
    id: 4,
    title: "Solmart | A Supershop Brand",
    categories: ["ecommerce", "branding"],
    image: "/placeholder.svg?height=400&width=600",
    date: "20/03/2024",
    tags: ["Brand Design", "Stationary", "Logo"],
    views: 432,
    status: "published",
  },
  {
    id: 5,
    title: "TechFlow | SaaS Dashboard",
    categories: ["saas"],
    image: "/placeholder.svg?height=400&width=600",
    date: "15/02/2024",
    tags: ["UI/UX", "Web App", "Dashboard"],
    views: 654,
    status: "draft",
  },
  {
    id: 6,
    title: "FitTrack | Fitness Mobile App",
    categories: ["mobile-app"],
    image: "/placeholder.svg?height=400&width=600",
    date: "10/01/2024",
    tags: ["Mobile Design", "UI/UX", "App Development"],
    views: 321,
    status: "published",
  },
]

// Category options
const categoryOptions = [
  { id: "landing-page", name: "Landing Pages" },
  { id: "ecommerce", name: "E-commerce" },
  { id: "saas", name: "SaaS" },
  { id: "mobile-app", name: "Mobile Apps" },
  { id: "branding", name: "Branding" },
]

export default function PortfolioManagement() {
  const router = useRouter()
  const [portfolioData, setPortfolioData] = useState(initialPortfolioData)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [projectToDelete, setProjectToDelete] = useState<number | null>(null)

  // Filter projects based on search query, status, and category
  const filteredProjects = portfolioData.filter((project) => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || project.status === statusFilter
    const matchesCategory = categoryFilter === "all" || project.categories.includes(categoryFilter)
    return matchesSearch && matchesStatus && matchesCategory
  })

  const handleDeleteProject = (id: number) => {
    setProjectToDelete(id)
    setIsDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (projectToDelete) {
      setPortfolioData(portfolioData.filter((project) => project.id !== projectToDelete))
      setIsDeleteDialogOpen(false)
      setProjectToDelete(null)
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
          <h1 className="text-2xl font-bold">Portfolio Projects</h1>
          <p className="text-gray-500">Manage your portfolio projects</p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700" onClick={() => router.push("/admin/portfolio/new")}>
          <Plus className="h-4 w-4 mr-2" />
          Add New Project
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
            placeholder="Search projects..."
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
                <TableHead>Project</TableHead>
                <TableHead>Categories</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-center">Views</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProjects.length > 0 ? (
                filteredProjects.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell className="font-medium">{project.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded bg-gray-200 flex-shrink-0"></div>
                        <div className="font-medium">{project.title}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {project.categories.map((category) => (
                          <Badge key={category} variant="outline" className="bg-purple-100 text-purple-800">
                            {categoryOptions.find((c) => c.id === category)?.name || category}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>{project.date}</TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Eye size={14} className="text-gray-500" />
                        <span>{project.views}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge
                        className={
                          project.status === "published" ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"
                        }
                      >
                        {project.status === "published" ? "Published" : "Draft"}
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
                          <DropdownMenuItem onClick={() => router.push(`/admin/portfolio/${project.id}`)}>
                            <Eye className="h-4 w-4 mr-2" />
                            View
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => router.push(`/admin/portfolio/${project.id}/edit`)}>
                            <Pencil className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteProject(project.id)}>
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
                  <TableCell colSpan={7} className="text-center py-6 text-gray-500">
                    No projects found matching your criteria
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
            <DialogTitle>Are you sure you want to delete this project?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete the project and remove it from the portfolio.
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
