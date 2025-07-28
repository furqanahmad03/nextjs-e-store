"use client"

import { useSession, signIn, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, User, LogOut, LogIn, Mail, Lock } from "lucide-react"

export default function Home() {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Next.js App Setup Complete! 🎉
          </h1>
          <p className="text-xl text-gray-600">
            Your project is now configured with NextAuth (Credentials), Prisma, Cloudinary, and shadcn/ui
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Authentication Status
              </CardTitle>
              <CardDescription>
                NextAuth.js with email/password authentication
              </CardDescription>
            </CardHeader>
            <CardContent>
              {session ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    {session.user?.image && (
                      <img
                        src={session.user.image}
                        alt="Profile"
                        className="w-12 h-12 rounded-full"
                      />
                    )}
                    <div>
                      <p className="font-semibold">{session.user?.name}</p>
                      <p className="text-sm text-gray-600">{session.user?.email}</p>
                    </div>
                  </div>
                  <Button
                    onClick={() => signOut()}
                    variant="outline"
                    className="w-full"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-gray-600">Not signed in</p>
                  <div className="space-y-2">
                    <Button
                      onClick={() => signIn()}
                      className="w-full"
                    >
                      <LogIn className="h-4 w-4 mr-2" />
                      Sign In
                    </Button>
                    <Button
                      onClick={() => window.location.href = "/auth/signup"}
                      variant="outline"
                      className="w-full"
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      Create Account
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Cloudinary Integration
              </CardTitle>
              <CardDescription>
                Image upload and management
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Cloudinary is configured and ready for image uploads.
              </p>
              <Button variant="outline" className="w-full" disabled>
                Upload Image (Coming Soon)
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Technologies Configured</CardTitle>
            <CardDescription>
              All requested packages have been set up successfully
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-green-50 rounded-lg border">
                <h3 className="font-semibold text-green-800">NextAuth.js</h3>
                <p className="text-sm text-green-600">Credentials Auth</p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg border">
                <h3 className="font-semibold text-blue-800">Prisma</h3>
                <p className="text-sm text-blue-600">PostgreSQL ORM</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg border">
                <h3 className="font-semibold text-purple-800">Cloudinary</h3>
                <p className="text-sm text-purple-600">Image Management</p>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg border">
                <h3 className="font-semibold text-orange-800">shadcn/ui</h3>
                <p className="text-sm text-orange-600">UI Components</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
