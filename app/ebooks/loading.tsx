import { Skeleton } from "@/components/ui/skeleton"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function Loading() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Hero Section Skeleton */}
      <section className="bg-gradient-to-b from-purple-100 to-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Skeleton className="h-6 w-32 mx-auto mb-4" />
            <Skeleton className="h-14 w-3/4 mx-auto mb-4" />
            <Skeleton className="h-14 w-1/2 mx-auto mb-4" />
            <Skeleton className="h-6 w-full mx-auto mb-2" />
            <Skeleton className="h-6 w-5/6 mx-auto mb-8" />
            <Skeleton className="h-14 w-full max-w-xl mx-auto rounded-full" />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Skeleton */}
            <div className="w-full lg:w-1/4 hidden lg:block">
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex justify-between items-center mb-6">
                  <Skeleton className="h-6 w-24" />
                  <Skeleton className="h-6 w-16" />
                </div>

                <div className="mb-6">
                  <Skeleton className="h-5 w-32 mb-4" />
                  <div className="space-y-3">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="flex items-center">
                        <Skeleton className="h-4 w-4 rounded-sm mr-2" />
                        <Skeleton className="h-4 w-24" />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <Skeleton className="h-5 w-32 mb-4" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-8" />
                    <Skeleton className="h-4 w-8" />
                  </div>
                </div>

                <div>
                  <Skeleton className="h-5 w-32 mb-4" />
                  <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center">
                        <Skeleton className="h-4 w-4 rounded-sm mr-2" />
                        <Skeleton className="h-4 w-24" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Ebooks Grid Skeleton */}
            <div className="w-full lg:w-3/4">
              <div className="hidden lg:flex justify-between items-center mb-6">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-10 w-48" />
              </div>

              {/* Mobile Controls Skeleton */}
              <div className="lg:hidden mb-6 flex justify-between">
                <Skeleton className="h-10 w-32" />
                <Skeleton className="h-10 w-32" />
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="bg-white rounded-xl overflow-hidden shadow-lg">
                    <Skeleton className="w-full h-[320px]" />
                    <div className="p-5">
                      <Skeleton className="h-6 w-3/4 mb-2" />
                      <Skeleton className="h-4 w-full mb-1" />
                      <Skeleton className="h-4 w-5/6 mb-4" />
                      <div className="flex justify-between items-center mb-4">
                        <Skeleton className="h-6 w-20" />
                        <Skeleton className="h-4 w-16" />
                      </div>
                      <div className="flex gap-2">
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
