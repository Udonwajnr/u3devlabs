"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Search, Filter, Eye, Trash2, MoreHorizontal, Mail, Calendar, CheckCircle } from "lucide-react"
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
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { useIsMobile } from "@/hooks/use-mobile"

// Sample messages data
const initialMessagesData = [
  {
    id: 1,
    fullName: "John Smith",
    email: "john.smith@example.com",
    company: "Tech Innovations Inc.",
    service: "web-development",
    budget: "10k-25k",
    message:
      "We're looking to redesign our company website with modern features and improved user experience. Our current website is outdated and not mobile-friendly. We'd like to discuss how you can help us create a responsive, engaging website that better represents our brand.",
    date: "2024-05-15T14:30:00",
    status: "unread",
    isEmailSent: true,
  },
  {
    id: 2,
    fullName: "Sarah Johnson",
    email: "sarah.j@designstudio.com",
    company: "Design Studio Co.",
    service: "ui-ux",
    budget: "5k-10k",
    message:
      "I'm interested in your UI/UX design services for our new mobile application. We have the backend functionality developed but need help with creating an intuitive and visually appealing interface. Looking forward to discussing this project further.",
    date: "2024-05-14T09:15:00",
    status: "read",
    isEmailSent: true,
  },
  {
    id: 3,
    fullName: "Michael Chen",
    email: "michael@startupventures.co",
    company: "Startup Ventures",
    service: "mobile-app",
    budget: "25k-50k",
    message:
      "Our startup is looking to develop a cross-platform mobile app for our service. We need a team that can handle both iOS and Android development with a focus on performance and scalability. Can we schedule a call to discuss our requirements in detail?",
    date: "2024-05-12T16:45:00",
    status: "replied",
    isEmailSent: true,
  },
  {
    id: 4,
    fullName: "Emily Rodriguez",
    email: "emily.r@fashionbrand.com",
    company: "Fashion Brand",
    service: "ecommerce",
    budget: "10k-25k",
    message:
      "We're looking to upgrade our e-commerce platform to handle increased traffic and improve the checkout process. We need features like better product filtering, wishlist functionality, and integration with our inventory management system. What would be your approach to this project?",
    date: "2024-05-10T11:20:00",
    status: "read",
    isEmailSent: true,
  },
  {
    id: 5,
    fullName: "David Wilson",
    email: "david@marketingpro.net",
    company: "Marketing Pro",
    service: "digital-marketing",
    budget: "5k-10k",
    message:
      "I'm interested in your digital marketing services, particularly SEO and content marketing. Our company is looking to improve our online visibility and generate more leads through our website. Can you provide information about your packages and approach?",
    date: "2024-05-08T13:10:00",
    status: "unread",
    isEmailSent: true,
  },
  {
    id: 6,
    fullName: "Jessica Lee",
    email: "jessica@healthtech.org",
    company: "HealthTech Solutions",
    service: "other",
    budget: "50k-plus",
    message:
      "We're a healthcare technology company looking for a partner to help us develop a comprehensive patient management system. This would include web and mobile interfaces, secure data handling, and integration with existing healthcare systems. This is a large-scale project with potential for long-term collaboration.",
    date: "2024-05-05T10:30:00",
    status: "replied",
    isEmailSent: true,
  },
]

// Service options mapping
const serviceOptions = {
  "web-development": "Website Development",
  "mobile-app": "Mobile App Development",
  "ui-ux": "UI/UX Design",
  ecommerce: "E-commerce Solutions",
  "digital-marketing": "Digital Marketing",
  other: "Other Services",
}

// Budget options mapping
const budgetOptions = {
  "less-5k": "Less than $5,000",
  "5k-10k": "$5,000 - $10,000",
  "10k-25k": "$10,000 - $25,000",
  "25k-50k": "$25,000 - $50,000",
  "50k-plus": "$50,000+",
}

export default function MessagesPage() {
  const router = useRouter()
  const { toast } = useToast()
  const isMobile = useIsMobile()
  const [messagesData, setMessagesData] = useState(initialMessagesData)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [serviceFilter, setServiceFilter] = useState("all")
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [messageToDelete, setMessageToDelete] = useState<number | null>(null)
  const [selectedMessage, setSelectedMessage] = useState<any | null>(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [replyText, setReplyText] = useState("")

  // Filter messages based on search query, status, and service
  const filteredMessages = messagesData.filter((message) => {
    const matchesSearch =
      message.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.company?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.message.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || message.status === statusFilter
    const matchesService = serviceFilter === "all" || message.service === serviceFilter

    return matchesSearch && matchesStatus && matchesService
  })

  const handleDeleteMessage = (id: number) => {
    setMessageToDelete(id)
    setIsDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (messageToDelete) {
      setMessagesData(messagesData.filter((message) => message.id !== messageToDelete))
      setIsDeleteDialogOpen(false)
      setMessageToDelete(null)

      toast({
        title: "Message deleted",
        description: "The message has been permanently deleted.",
      })
    }
  }

  const viewMessage = (message: any) => {
    // Mark as read if unread
    if (message.status === "unread") {
      setMessagesData(messagesData.map((m) => (m.id === message.id ? { ...m, status: "read" } : m)))
    }

    setSelectedMessage(message)
    setIsDrawerOpen(true)
  }

  const sendReply = () => {
    if (!replyText.trim()) {
      toast({
        title: "Empty reply",
        description: "Please enter a reply message.",
        variant: "destructive",
      })
      return
    }

    // Update message status to replied
    setMessagesData(messagesData.map((m) => (m.id === selectedMessage?.id ? { ...m, status: "replied" } : m)))

    toast({
      title: "Reply sent",
      description: `Your reply has been sent to ${selectedMessage?.fullName}.`,
    })

    // Close drawer and reset reply text
    setIsDrawerOpen(false)
    setReplyText("")
    setSelectedMessage(null)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "unread":
        return <Badge className="bg-blue-100 text-blue-800">Unread</Badge>
      case "read":
        return <Badge className="bg-gray-100 text-gray-800">Read</Badge>
      case "replied":
        return <Badge className="bg-green-100 text-green-800">Replied</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800">{status}</Badge>
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
          <h1 className="text-2xl font-bold">Messages</h1>
          <p className="text-gray-500">Manage contact form submissions and inquiries</p>
        </div>
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
            placeholder="Search messages..."
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
              <SelectItem value="unread">Unread</SelectItem>
              <SelectItem value="read">Read</SelectItem>
              <SelectItem value="replied">Replied</SelectItem>
            </SelectContent>
          </Select>
          <Select value={serviceFilter} onValueChange={setServiceFilter}>
            <SelectTrigger className="w-[160px]">
              <div className="flex items-center gap-2">
                <Filter size={16} />
                <span>Service</span>
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Services</SelectItem>
              {Object.entries(serviceOptions).map(([key, value]) => (
                <SelectItem key={key} value={key}>
                  {value}
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
                <TableHead className="w-[180px]">Sender</TableHead>
                <TableHead className="hidden md:table-cell">Message Preview</TableHead>
                <TableHead className="w-[120px]">
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    <span>Date</span>
                  </div>
                </TableHead>
                <TableHead className="w-[100px] text-center">Status</TableHead>
                <TableHead className="w-[80px] text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMessages.length > 0 ? (
                filteredMessages.map((message) => (
                  <TableRow key={message.id} className={message.status === "unread" ? "bg-blue-50" : ""}>
                    <TableCell>
                      <div className="font-medium">{message.fullName}</div>
                      <div className="text-xs text-gray-500">{message.email}</div>
                      {message.company && <div className="text-xs text-gray-500">{message.company}</div>}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="truncate max-w-[400px]">{message.message}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        <span className="inline-flex items-center gap-1">
                          <span className="font-medium">Service:</span>{" "}
                          {serviceOptions[message.service as keyof typeof serviceOptions]}
                        </span>
                        {message.budget && (
                          <span className="inline-flex items-center gap-1 ml-3">
                            <span className="font-medium">Budget:</span>{" "}
                            {budgetOptions[message.budget as keyof typeof budgetOptions]}
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="whitespace-nowrap text-sm">{formatDate(message.date)}</TableCell>
                    <TableCell className="text-center">{getStatusBadge(message.status)}</TableCell>
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
                          <DropdownMenuItem onClick={() => viewMessage(message)}>
                            <Eye className="h-4 w-4 mr-2" />
                            View
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              viewMessage(message)
                              setReplyText(`Dear ${message.fullName},\n\nThank you for your message. `)
                            }}
                          >
                            <Mail className="h-4 w-4 mr-2" />
                            Reply
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteMessage(message.id)}>
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
                  <TableCell colSpan={5} className="text-center py-6 text-gray-500">
                    No messages found matching your criteria
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
            <DialogTitle>Are you sure you want to delete this message?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete the message from your inbox.
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

      {/* Message Drawer */}
      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Message from {selectedMessage?.fullName}</DrawerTitle>
            <DrawerDescription>
              <div className="flex flex-col gap-1 mt-2">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <span>{selectedMessage?.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span>{selectedMessage && formatDate(selectedMessage.date)}</span>
                </div>
                {selectedMessage?.isEmailSent && (
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle className="h-4 w-4" />
                    <span>Email copy received</span>
                  </div>
                )}
              </div>
            </DrawerDescription>
          </DrawerHeader>
          <div className="px-4 py-2">
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-500">Service Requested</h4>
                <p>{selectedMessage && serviceOptions[selectedMessage.service as keyof typeof serviceOptions]}</p>
              </div>
              {selectedMessage?.budget && (
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-500">Budget Range</h4>
                  <p>{selectedMessage && budgetOptions[selectedMessage.budget as keyof typeof budgetOptions]}</p>
                </div>
              )}
              <div>
                <h4 className="text-sm font-medium text-gray-500">Message</h4>
                <p className="whitespace-pre-line">{selectedMessage?.message}</p>
              </div>
            </div>

            <div className="mb-4">
              <h4 className="text-sm font-medium mb-2">Reply to this message</h4>
              <Textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Type your reply here..."
                rows={6}
              />
            </div>
          </div>
          <DrawerFooter>
            <Button onClick={sendReply} className="bg-purple-600 hover:bg-purple-700">
              <Mail className="h-4 w-4 mr-2" />
              Send Reply
            </Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  )
}
