"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff, Mail, Lock, User, Phone, ArrowRight, Facebook, Twitter } from "lucide-react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export default function SignUpPage() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [showPassword, setShowPassword] = React.useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const [formData, setFormData] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
    subscribeToNewsletter: false
  })
  const [errors, setErrors] = React.useState<{[key: string]: string}>({})

  // Redirect if already signed in
  React.useEffect(() => {
    if (status === "authenticated" && session) {
      router.push("/")
    }
  }, [status, session, router])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {}
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required"
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required"
    }
    
    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email"
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required"
    }
    
    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters"
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password"
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }
    
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to the terms and conditions"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsLoading(true)
    
    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
          subscribeToNewsletter: formData.subscribeToNewsletter
        }),
      })

      if (response.ok) {
        // Redirect to sign in page with success message
        router.push('/auth/signin?message=Account created successfully! Please sign in.')
      } else {
      const data = await response.json()
        setErrors({ general: data.message || "Failed to create account" })
      }
    } catch (error) {
      setErrors({ general: "An error occurred. Please try again." })
    } finally {
      setIsLoading(false)
    }
  }

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-allowed mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Sign Up</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Side - Form */}
            <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12">
              <div className="max-w-md mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
                  <p className="text-gray-600">Join us and start your shopping journey</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Fields */}
                  <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                        First Name
                      </Label>
              <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                          id="firstName"
                          name="firstName"
                  type="text"
                          placeholder="First name"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className={`pl-10 ${errors.firstName ? 'border-red-500' : ''}`}
                />
              </div>
                      {errors.firstName && (
                        <p className="text-sm text-red-500">{errors.firstName}</p>
                      )}
            </div>

            <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                        Last Name
                      </Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          id="lastName"
                          name="lastName"
                          type="text"
                          placeholder="Last name"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className={`pl-10 ${errors.lastName ? 'border-red-500' : ''}`}
                        />
                      </div>
                      {errors.lastName && (
                        <p className="text-sm text-red-500">{errors.lastName}</p>
                      )}
                    </div>
                  </div>

                  {/* Email Field */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                      Email Address
                    </Label>
              <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="email"
                        name="email"
                  type="email"
                  placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`pl-10 ${errors.email ? 'border-red-500' : ''}`}
                      />
                    </div>
                    {errors.email && (
                      <p className="text-sm text-red-500">{errors.email}</p>
                    )}
                  </div>

                  {/* Phone Field */}
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                      Phone Number
                    </Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="Enter your phone number"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`pl-10 ${errors.phone ? 'border-red-500' : ''}`}
                />
              </div>
                    {errors.phone && (
                      <p className="text-sm text-red-500">{errors.phone}</p>
                    )}
            </div>
            
                  {/* Password Field */}
            <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                      Password
                    </Label>
              <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="password"
                        name="password"
                  type={showPassword ? "text" : "password"}
                        placeholder="Create a password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className={`pl-10 pr-10 ${errors.password ? 'border-red-500' : ''}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
                    {errors.password && (
                      <p className="text-sm text-red-500">{errors.password}</p>
                    )}
            </div>

                  {/* Confirm Password Field */}
            <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                      Confirm Password
                    </Label>
              <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="confirmPassword"
                        name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className={`pl-10 pr-10 ${errors.confirmPassword ? 'border-red-500' : ''}`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
                    {errors.confirmPassword && (
                      <p className="text-sm text-red-500">{errors.confirmPassword}</p>
                    )}
                  </div>

                  {/* Checkboxes */}
                  <div className="space-y-4">
                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="agreeToTerms"
                        name="agreeToTerms"
                        checked={formData.agreeToTerms}
                        onCheckedChange={(checked) => 
                          setFormData(prev => ({ ...prev, agreeToTerms: checked as boolean }))
                        }
                        className="mt-1"
                      />
                      <div className="space-y-1">
                        <Label htmlFor="agreeToTerms" className="text-sm text-gray-600">
                          I agree to the{" "}
                          <Link href="/terms" className="text-red-500 hover:text-red-600 underline">
                            Terms of Use
                          </Link>{" "}
                          and{" "}
                          <Link href="/privacy" className="text-red-500 hover:text-red-600 underline">
                            Privacy Policy
                          </Link>
                        </Label>
                        {errors.agreeToTerms && (
                          <p className="text-sm text-red-500">{errors.agreeToTerms}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="subscribeToNewsletter"
                        name="subscribeToNewsletter"
                        checked={formData.subscribeToNewsletter}
                        onCheckedChange={(checked) => 
                          setFormData(prev => ({ ...prev, subscribeToNewsletter: checked as boolean }))
                        }
                      />
                      <Label htmlFor="subscribeToNewsletter" className="text-sm text-gray-600">
                        Subscribe to our newsletter for updates and offers
                      </Label>
                    </div>
            </div>

                  {/* General Error */}
                  {errors.general && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                      <p className="text-sm text-red-600">{errors.general}</p>
                    </div>
                  )}

                  {/* Sign Up Button */}
            <Button
              type="submit"
              disabled={isLoading}
                    className="w-full bg-red-500 hover:bg-red-600 text-white py-3 text-base font-medium"
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Creating account...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        Create Account
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    )}
            </Button>
          </form>

                {/* Divider */}
                <div className="my-8 flex items-center">
                  <div className="flex-1 border-t border-gray-200"></div>
                  <span className="px-4 text-sm text-gray-500">or sign up with</span>
                  <div className="flex-1 border-t border-gray-200"></div>
                </div>

                {/* Social Sign Up */}
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="flex items-center gap-2">
                    <Facebook className="w-4 h-4 text-blue-600" />
                    Facebook
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Twitter className="w-4 h-4 text-blue-400" />
                    Twitter
                  </Button>
                </div>

                {/* Sign In Link */}
                <div className="text-center mt-8">
                  <p className="text-gray-600">
              Already have an account?{" "}
                    <Link 
                      href="/auth/signin" 
                      className="text-red-500 hover:text-red-600 font-medium hover:underline"
                    >
                      Sign in here
                    </Link>
                  </p>
                </div>
              </div>
            </div>

            {/* Right Side - Image Space */}
            <div className="hidden lg:block">
              <div className="relative h-[700px] bg-gradient-to-br from-red-50 to-red-100 rounded-2xl overflow-hidden">
                {/* Placeholder for image */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-32 h-32 bg-red-200 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-16 h-16 text-red-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                    </div>
                    <p className="text-red-600 font-medium">Image Space</p>
                    <p className="text-red-500 text-sm mt-1">Add your sign-up image here</p>
                  </div>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute top-8 right-8 w-20 h-20 bg-red-200 rounded-full opacity-50"></div>
                <div className="absolute bottom-8 left-8 w-16 h-16 bg-red-300 rounded-full opacity-30"></div>
                <div className="absolute top-1/2 left-8 w-12 h-12 bg-red-400 rounded-full opacity-20"></div>
                <div className="absolute top-1/3 right-4 w-8 h-8 bg-red-300 rounded-full opacity-40"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 