"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowLeft, Mail, Building, DollarSign, Briefcase, CheckCircle, Trash2, Reply, Clock, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

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

// Sample messages data (in a real app, this would come from an API or database)
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

export default function MessageDetail() {
  const router = useRouter()
  const params = useParams()
  const { toast } = useToast()
  const messageId = Number(params?.id)

  const [message, setMessage] = useState<any | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [replyText, setReplyText] = useState("")
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [previousReplies, setPreviousReplies] = useState<any[]>([])

  // In a real application, you would fetch this from an API
  // For this example, we'll simulate fetching and updating from localStorage
  useEffect(() => {
    const fetchMessage = () => {
      setIsLoading(true)

      // Get messages from localStorage or use initial data
      const storedMessages = localStorage.getItem("adminMessages")
      const messagesData = storedMessages ? JSON.parse(storedMessages) : initialMessagesData

      // Find the message by ID
      const foundMessage = messagesData.find((m: any) => m.id === messageId)

      if (foundMessage) {
        // Mark as read if unread
        if (foundMessage.status === "unread") {
          const updatedMessages = messagesData.map((m: any) => (m.id === messageId ? { ...m, status: "read" } : m))
          localStorage.setItem("adminMessages", JSON.stringify(updatedMessages))
          setMessage({ ...foundMessage, status: "read" })
        } else {
          setMessage(foundMessage)
        }

        // Get previous replies from localStorage
        const storedReplies = localStorage.getItem(`messageReplies_${messageId}`)
        if (storedReplies) {
          setPreviousReplies(JSON.parse(storedReplies))
        }
      }

      setIsLoading(false)
    }

    fetchMessage()
  }, [messageId])

  const handleSendReply = () => {
    if (!replyText.trim()) {
      toast({
        title: "Empty reply",
        description: "Please enter a reply message.",
        variant: "destructive",
      })
      return
    }

    // Create a new reply
    const newReply = {
      id: Date.now(),
      text: replyText,
      date: new Date().toISOString(),
      sender: "admin",
    }

    // Update previous replies
    const updatedReplies = [...previousReplies, newReply]
    setPreviousReplies(updatedReplies)
    localStorage.setItem(`messageReplies_${messageId}`, JSON.stringify(updatedReplies))

    // Update message status to replied
    const storedMessages = localStorage.getItem("adminMessages")
    const messagesData = storedMessages ? JSON.parse(storedMessages) : initialMessagesData
    const updatedMessages = messagesData.map((m: any) => (m.id === messageId ? { ...m, status: "replied" } : m))
    localStorage.setItem("adminMessages", JSON.stringify(updatedMessages))

    // Update local state
    setMessage({ ...message, status: "replied" })
    setReplyText("")

    toast({
      title: "Reply sent",
      description: `Your reply has been sent to ${message?.fullName}.`,
    })
  }

  const handleDeleteMessage = () => {
    setIsDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    // Get messages from localStorage
    const storedMessages = localStorage.getItem("adminMessages")
    const messagesData = storedMessages ? JSON.parse(storedMessages) : initialMessagesData

    // Filter out the deleted message
    const updatedMessages = messagesData.filter((m: any) => m.id !== messageId)
    localStorage.setItem("adminMessages", JSON.stringify(updatedMessages))

    // Remove replies
    localStorage.removeItem(`messageReplies_${messageId}`)

    toast({
      title: "Message deleted",
      description: "The message has been permanently deleted.",
    })

    // Navigate back to messages list
    router.push("/admin/messages")
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
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

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 px-4 max-w-4xl">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-700"></div>
        </div>
      </div>
    )
  }

  if (!message) {
    return (
      <div className="container mx-auto py-8 px-4 max-w-4xl">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4">Message Not Found</h2>
          <p className="text-gray-500 mb-6">The message you're looking for doesn't exist or has been deleted.</p>
          <Button onClick={() => router.push("/admin/messages")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Messages
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-6"
      >
        <Button variant="ghost" onClick={() => router.push("/admin/messages")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Messages
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            Message from {message.fullName}
            {getStatusBadge(message.status)}
          </h1>
          <p className="text-gray-500">{formatDate(message.date)}</p>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" onClick={handleDeleteMessage} className="text-red-600">
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </div>
      </motion.div>

      <div className="grid gap-6">
        {/* Sender Information Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Sender Information</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="flex items-start md:items-center gap-4 flex-col md:flex-row">
                <Avatar className="h-16 w-16 bg-purple-100 text-purple-700">
                  <AvatarFallback>{message.fullName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-gray-500" />
                    <span className="font-medium">{message.fullName}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-gray-500" />
                    <span>{message.email}</span>
                  </div>
                  {message.company && (
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4 text-gray-500" />
                      <span>{message.company}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span>{formatDate(message.date)}</span>
                  </div>
                  {message.isEmailSent && (
                    <div className="flex items-center gap-2 text-green-600">
                      <CheckCircle className="h-4 w-4" />
                      <span>Email copy received</span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Message Details Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Message Details</CardTitle>
              <CardDescription>
                Received on {formatDate(message.date)} • {getStatusBadge(message.status)}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-gray-500">Service Requested</h3>
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-purple-600" />
                    <span className="font-medium">
                      {serviceOptions[message.service as keyof typeof serviceOptions]}
                    </span>
                  </div>
                </div>

                {message.budget && (
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-gray-500">Budget Range</h3>
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-5 w-5 text-green-600" />
                      <span className="font-medium">{budgetOptions[message.budget as keyof typeof budgetOptions]}</span>
                    </div>
                  </div>
                )}
              </div>

              <Separator />

              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-500">Message Content</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="whitespace-pre-line">{message.message}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Previous Replies */}
        {previousReplies.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Previous Replies</CardTitle>
                <CardDescription>
                  {previousReplies.length} {previousReplies.length === 1 ? "reply" : "replies"} sent
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {previousReplies.map((reply) => (
                  <div key={reply.id} className="bg-purple-50 p-4 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div className="font-medium text-purple-700">You</div>
                      <div className="text-xs text-gray-500">{formatDate(reply.date)}</div>
                    </div>
                    <p className="whitespace-pre-line">{reply.text}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Reply Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Send a Reply</CardTitle>
              <CardDescription>Your reply will be sent to {message.email}</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder={`Dear ${message.fullName},\n\nThank you for your message...`}
                rows={6}
                className="mb-2"
              />
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleSendReply} className="bg-purple-600 hover:bg-purple-700">
                <Reply className="mr-2 h-4 w-4" />
                Send Reply
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </div>

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
    </div>
  )
}
