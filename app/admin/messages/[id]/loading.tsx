import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Loading() {
  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <div className="mb-6">
        <Button variant="ghost" disabled>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Messages
        </Button>
      </div>

      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <Skeleton className="h-8 w-64 mb-2" />
          <Skeleton className="h-5 w-40" />
        </div>

        <div className="flex gap-2">
          <Skeleton className="h-10 w-24" />
        </div>
      </div>

      <div className="grid gap-6">
        {/* Sender Information Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Sender Information</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex items-start md:items-center gap-4 flex-col md:flex-row">
              <Skeleton className="h-16 w-16 rounded-full" />
              <div className="space-y-2 w-full">
                <Skeleton className="h-5 w-48" />
                <Skeleton className="h-5 w-64" />
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-5 w-56" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Message Details Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Message Details</CardTitle>
            <Skeleton className="h-5 w-64" />
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-6 w-48" />
              </div>

              <div className="space-y-2">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-6 w-48" />
              </div>
            </div>

            <Skeleton className="h-px w-full" />

            <div className="space-y-2">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-32 w-full rounded-lg" />
            </div>
          </CardContent>
        </Card>

        {/* Reply Form */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Send a Reply</CardTitle>
            <Skeleton className="h-5 w-64" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-32 w-full mb-2" />
          </CardContent>
          <div className="p-6 flex justify-end">
            <Skeleton className="h-10 w-32" />
          </div>
        </Card>
      </div>
    </div>
  )
}
