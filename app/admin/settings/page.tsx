"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuth } from "@/components/admin/auth-context"

export default function SettingsPage() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("account")
  const [successMessage, setSuccessMessage] = useState("")

  const [accountForm, setAccountForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    password: "",
    confirmPassword: "",
  })

  const [siteForm, setSiteForm] = useState({
    siteName: "U3DEVLAB",
    siteDescription: "Tech design agency that helps improve your business by using Best Research and Design.",
    contactEmail: "contact@u3devlab.com",
    contactPhone: "+1 (555) 123-4567",
    address: "123 Tech Street, San Francisco, CA 94107",
    enableComments: true,
    enableNewsletter: true,
  })

  const [socialForm, setSocialForm] = useState({
    twitter: "https://twitter.com/u3devlab",
    facebook: "https://facebook.com/u3devlab",
    instagram: "https://instagram.com/u3devlab",
    linkedin: "https://linkedin.com/company/u3devlab",
    youtube: "",
  })

  const handleAccountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setAccountForm({ ...accountForm, [name]: value })
  }

  const handleSiteChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setSiteForm({ ...siteForm, [name]: value })
  }

  const handleSocialChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setSocialForm({ ...socialForm, [name]: value })
  }

  const handleSwitchChange = (name: string, checked: boolean) => {
    setSiteForm({ ...siteForm, [name]: checked })
  }

  const saveSettings = (formType: string) => {
    // Simulate saving settings
    setSuccessMessage(`${formType} settings saved successfully!`)

    // Clear success message after 3 seconds
    setTimeout(() => {
      setSuccessMessage("")
    }, 3000)
  }

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-gray-500">Manage your account and website settings</p>
      </motion.div>

      {successMessage && (
        <Alert className="bg-green-50 border-green-200">
          <AlertDescription className="text-green-700">{successMessage}</AlertDescription>
        </Alert>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="site">Site Settings</TabsTrigger>
          <TabsTrigger value="social">Social Media</TabsTrigger>
        </TabsList>

        <TabsContent value="account">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card>
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
                <CardDescription>Update your account details and password</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" name="name" value={accountForm.name} onChange={handleAccountChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={accountForm.email}
                    onChange={handleAccountChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">New Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={accountForm.password}
                    onChange={handleAccountChange}
                    placeholder="Leave blank to keep current password"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={accountForm.confirmPassword}
                    onChange={handleAccountChange}
                    placeholder="Leave blank to keep current password"
                  />
                </div>
                <Button className="bg-purple-600 hover:bg-purple-700" onClick={() => saveSettings("Account")}>
                  Save Changes
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="site">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card>
              <CardHeader>
                <CardTitle>Site Settings</CardTitle>
                <CardDescription>Configure your website settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="siteName">Site Name</Label>
                  <Input id="siteName" name="siteName" value={siteForm.siteName} onChange={handleSiteChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="siteDescription">Site Description</Label>
                  <Textarea
                    id="siteDescription"
                    name="siteDescription"
                    value={siteForm.siteDescription}
                    onChange={handleSiteChange}
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactEmail">Contact Email</Label>
                  <Input
                    id="contactEmail"
                    name="contactEmail"
                    type="email"
                    value={siteForm.contactEmail}
                    onChange={handleSiteChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactPhone">Contact Phone</Label>
                  <Input
                    id="contactPhone"
                    name="contactPhone"
                    value={siteForm.contactPhone}
                    onChange={handleSiteChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Textarea id="address" name="address" value={siteForm.address} onChange={handleSiteChange} rows={2} />
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    id="enableComments"
                    checked={siteForm.enableComments}
                    onCheckedChange={(checked) => handleSwitchChange("enableComments", checked)}
                  />
                  <Label htmlFor="enableComments">Enable Comments</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    id="enableNewsletter"
                    checked={siteForm.enableNewsletter}
                    onCheckedChange={(checked) => handleSwitchChange("enableNewsletter", checked)}
                  />
                  <Label htmlFor="enableNewsletter">Enable Newsletter</Label>
                </div>
                <Button className="bg-purple-600 hover:bg-purple-700" onClick={() => saveSettings("Site")}>
                  Save Changes
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="social">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card>
              <CardHeader>
                <CardTitle>Social Media</CardTitle>
                <CardDescription>Connect your social media accounts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="twitter">Twitter URL</Label>
                  <Input
                    id="twitter"
                    name="twitter"
                    value={socialForm.twitter}
                    onChange={handleSocialChange}
                    placeholder="https://twitter.com/yourusername"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="facebook">Facebook URL</Label>
                  <Input
                    id="facebook"
                    name="facebook"
                    value={socialForm.facebook}
                    onChange={handleSocialChange}
                    placeholder="https://facebook.com/yourpage"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="instagram">Instagram URL</Label>
                  <Input
                    id="instagram"
                    name="instagram"
                    value={socialForm.instagram}
                    onChange={handleSocialChange}
                    placeholder="https://instagram.com/yourusername"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="linkedin">LinkedIn URL</Label>
                  <Input
                    id="linkedin"
                    name="linkedin"
                    value={socialForm.linkedin}
                    onChange={handleSocialChange}
                    placeholder="https://linkedin.com/in/yourusername"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="youtube">YouTube URL</Label>
                  <Input
                    id="youtube"
                    name="youtube"
                    value={socialForm.youtube}
                    onChange={handleSocialChange}
                    placeholder="https://youtube.com/c/yourchannel"
                  />
                </div>
                <Button className="bg-purple-600 hover:bg-purple-700" onClick={() => saveSettings("Social Media")}>
                  Save Changes
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
