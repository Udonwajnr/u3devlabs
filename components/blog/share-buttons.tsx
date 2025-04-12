"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Facebook, Twitter, Linkedin, Mail, LinkIcon, Check, Share2, MessageCircle, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

interface ShareButtonsProps {
  title: string
  url: string
  excerpt?: string
  className?: string
  direction?: "horizontal" | "vertical"
  showLabel?: boolean
  size?: "sm" | "md" | "lg"
  variant?: "default" | "outline" | "ghost"
}

export default function ShareButtons({
  title,
  url,
  excerpt = "",
  className,
  direction = "vertical",
  showLabel = false,
  size = "md",
  variant = "outline",
}: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)

  // Ensure we have the full URL
  const fullUrl = url.startsWith("http") ? url : `${process.env.NEXT_PUBLIC_SITE_URL || "https://u3devlab.com"}${url}`

  // Encoded values for sharing
  const encodedUrl = encodeURIComponent(fullUrl)
  const encodedTitle = encodeURIComponent(title)
  const encodedExcerpt = encodeURIComponent(excerpt)

  // Generate sharing URLs
  const shareUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedExcerpt}%0A%0A${encodedUrl}`,
    whatsapp: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
    telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
  }

  // Copy URL to clipboard
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl)
      setCopied(true)
      setShowTooltip(true)

      // Reset copied state after 2 seconds
      setTimeout(() => {
        setCopied(false)
      }, 2000)

      // Hide tooltip after 3 seconds
      setTimeout(() => {
        setShowTooltip(false)
      }, 3000)
    } catch (err) {
      console.error("Failed to copy URL: ", err)
    }
  }

  // Button size classes
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12",
  }

  // Share platforms configuration
  const platforms = [
    {
      name: "Facebook",
      icon: <Facebook className={size === "sm" ? "h-4 w-4" : "h-5 w-5"} />,
      url: shareUrls.facebook,
      color: "bg-[#1877F2] hover:bg-[#0E65D9] text-white",
    },
    {
      name: "Twitter",
      icon: <Twitter className={size === "sm" ? "h-4 w-4" : "h-5 w-5"} />,
      url: shareUrls.twitter,
      color: "bg-[#1DA1F2] hover:bg-[#0C85D0] text-white",
    },
    {
      name: "LinkedIn",
      icon: <Linkedin className={size === "sm" ? "h-4 w-4" : "h-5 w-5"} />,
      url: shareUrls.linkedin,
      color: "bg-[#0A66C2] hover:bg-[#084E96] text-white",
    },
    {
      name: "Email",
      icon: <Mail className={size === "sm" ? "h-4 w-4" : "h-5 w-5"} />,
      url: shareUrls.email,
      color: "bg-[#EA4335] hover:bg-[#D33426] text-white",
    },
    {
      name: "WhatsApp",
      icon: <MessageCircle className={size === "sm" ? "h-4 w-4" : "h-5 w-5"} />,
      url: shareUrls.whatsapp,
      color: "bg-[#25D366] hover:bg-[#1FB855] text-white",
    },
    {
      name: "Telegram",
      icon: <Send className={size === "sm" ? "h-4 w-4" : "h-5 w-5"} />,
      url: shareUrls.telegram,
      color: "bg-[#0088CC] hover:bg-[#0077B5] text-white",
    },
  ]

  return (
    <div className={cn("flex gap-2", direction === "vertical" ? "flex-col" : "flex-row flex-wrap", className)}>
      <div className={cn("flex gap-2", direction === "vertical" ? "flex-col" : "flex-row flex-wrap")}>
        {platforms.map((platform) => (
          <TooltipProvider key={platform.name}>
            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "flex items-center justify-center rounded-full transition-all duration-300",
                    variant === "default" ? platform.color : "bg-transparent hover:bg-gray-100",
                    variant !== "default" && "text-gray-700 hover:text-gray-900",
                    sizeClasses[size],
                    variant === "outline" && "border border-gray-200",
                    showLabel && "rounded-full px-4 gap-2 w-auto",
                  )}
                  aria-label={`Share on ${platform.name}`}
                >
                  {platform.icon}
                  {showLabel && <span className="text-sm font-medium">{platform.name}</span>}
                </a>
              </TooltipTrigger>
              <TooltipContent>
                <p>Share on {platform.name}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>

      <TooltipProvider>
        <Tooltip open={showTooltip} onOpenChange={setShowTooltip}>
          <TooltipTrigger asChild>
            <Button
              onClick={copyToClipboard}
              variant={variant === "default" ? "default" : variant}
              size="icon"
              className={cn(
                sizeClasses[size],
                variant === "default" ? "bg-gray-800 hover:bg-gray-700 text-white" : "",
                showLabel && "rounded-full px-4 gap-2 w-auto",
              )}
              aria-label="Copy link"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={copied ? "check" : "copy"}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  {copied ? (
                    <Check className={size === "sm" ? "h-4 w-4" : "h-5 w-5"} />
                  ) : (
                    <LinkIcon className={size === "sm" ? "h-4 w-4" : "h-5 w-5"} />
                  )}
                </motion.div>
              </AnimatePresence>
              {showLabel && <span className="text-sm font-medium">{copied ? "Copied!" : "Copy Link"}</span>}
            </Button>
          </TooltipTrigger>
          <TooltipContent>{copied ? "Link copied!" : "Copy link to clipboard"}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}

// Mobile-optimized floating share button
export function FloatingShareButton({ title, url, excerpt }: { title: string; url: string; excerpt?: string }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed bottom-6 right-6 z-50 md:hidden">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            className="absolute bottom-16 right-0 bg-white rounded-lg shadow-lg p-4 border"
          >
            <ShareButtons title={title} url={url} excerpt={excerpt} direction="horizontal" size="sm" />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        className="bg-purple-600 text-white p-3 rounded-full shadow-lg flex items-center justify-center"
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <Share2 className="h-6 w-6" />
      </motion.button>
    </div>
  )
}
