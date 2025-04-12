"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Plus, Edit, Trash2, Eye, Search, Tag, DollarSign, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/hooks/use-toast"
import type { Product } from "@/lib/schemas"

export default function AdminEbooksPage() {
  const router = useRouter()
  const [ebooks, setEbooks] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [ebookToDelete, setEbookToDelete] = useState<Product | null>(null)

  useEffect(() => {
    fetchEbooks()
  }, [])

  const fetchEbooks = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/products?productType=ebook")
      if (!response.ok) throw new Error("Failed to fetch ebooks")
      const data = await response.json()
      setEbooks(data)
    } catch (error) {
      console.error("Error fetching ebooks:", error)
      toast({
        title: "Error",
        description: "Failed to load ebooks. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteEbook = async () => {
    if (!ebookToDelete) return

    try {
      const response = await fetch(`/api/products/${ebookToDelete.slug}`, {
        method: "DELETE",
      })

      if (!response.ok) throw new Error("Failed to delete ebook")

      toast({
        title: "Success",
        description: "Ebook deleted successfully",
      })

      // Remove the deleted ebook from the state
      setEbooks(ebooks.filter((ebook) => ebook.slug !== ebookToDelete.slug))
    } catch (error) {
      console.error("Error deleting ebook:", error)
      toast({
        title: "Error",
        description: "Failed to delete ebook. Please try again.",
        variant: "destructive",
      })
    } finally {
      setDeleteDialogOpen(false)
      setEbookToDelete(null)
    }
  }

  const confirmDelete = (ebook: Product) => {
    setEbookToDelete(ebook)
    setDeleteDialogOpen(true)
  }

  const filteredEbooks = ebooks.filter(
    (ebook) =>
      ebook.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ebook.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ebook.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
      >
        <div>
          <h1 className="text-2xl font-bold">Ebooks Management</h1>
          <p className="text-gray-500">Manage your digital ebooks and publications</p>
        </div>
        <Button onClick={() => router.push("/admin/ebooks/new")} className="bg-purple-600 hover:bg-purple-700">
          <Plus className="mr-2 h-4 w-4" /> Add New Ebook
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex items-center space-x-2"
      >
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Search ebooks..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ebook</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8">
                      <div className="flex justify-center">
                        <svg
                          className="animate-spin h-6 w-6 text-purple-600"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : filteredEbooks.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8">
                      {searchQuery ? "No ebooks match your search" : "No ebooks found"}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredEbooks.map((ebook) => (
                    <TableRow key={ebook.slug}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-16 rounded bg-gray-100 flex-shrink-0 overflow-hidden">
                            {ebook.mainImage && (
                              <img
                                src={ebook.mainImage || "/placeholder.svg"}
                                alt={ebook.title}
                                className="w-full h-full object-cover"
                              />
                            )}
                          </div>
                          <div className="truncate max-w-[200px]">
                            <div className="font-medium">{ebook.title}</div>
                            <div className="text-xs text-gray-500 flex items-center">
                              <BookOpen className="h-3 w-3 mr-1" />
                              {ebook.pageCount || 0} pages
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                          <Tag className="h-3 w-3 mr-1" />
                          {ebook.category}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <DollarSign className="h-3 w-3 mr-1 text-gray-500" />
                          {ebook.salePrice ? (
                            <div>
                              <span className="line-through text-gray-400 mr-2">${ebook.price}</span>
                              <span className="font-medium">${ebook.salePrice}</span>
                            </div>
                          ) : (
                            <span className="font-medium">${ebook.price}</span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        {ebook.isPublished ? (
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Published</Badge>
                        ) : (
                          <Badge variant="outline" className="text-gray-500">
                            Draft
                          </Badge>
                        )}
                        {ebook.isFeatured && (
                          <Badge className="ml-2 bg-amber-100 text-amber-800 hover:bg-amber-200">Featured</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm" onClick={() => router.push(`/ebooks/${ebook.slug}`)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => router.push(`/admin/ebooks/edit/${ebook.slug}`)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            onClick={() => confirmDelete(ebook)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete &quot;{ebookToDelete?.title}&quot;? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteEbook}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
