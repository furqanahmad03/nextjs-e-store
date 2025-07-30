"use client"

import React, { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useSession, signOut } from "next-auth/react"
import { Search, Heart, ShoppingCart, User, LogOut, Package, FileText, Star, Settings, CreditCard, MapPin } from "lucide-react"

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

export default function Navbar() {
  const { data: session, status } = useSession()
  const [searchQuery, setSearchQuery] = useState("")
  const [isClient, setIsClient] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()

  // Debounced search using useRef
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const debouncedSearch = (query: string) => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current)
    }

    searchTimeoutRef.current = setTimeout(() => {
      if (pathname.startsWith('/products')) {
        const params = new URLSearchParams(searchParams.toString())
        if (query.trim()) {
          params.set('search', query.trim())
        } else {
          params.delete('search')
        }
        params.delete('page') // Reset to first page when searching
        router.push(`/products?${params.toString()}`)
      }
    }, 300) // 300ms delay
  }

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Set search query from URL when on products page
  useEffect(() => {
    if (pathname.startsWith('/products')) {
      const searchFromUrl = searchParams.get('search')
      if (searchFromUrl) {
        setSearchQuery(searchFromUrl)
      } else {
        setSearchQuery('')
      }
    }
  }, [pathname, searchParams])

  // Listen for clear search event
  useEffect(() => {
    const handleClearSearch = () => {
      setSearchQuery('')
    }

    window.addEventListener('clearSearch', handleClearSearch)

    return () => {
      window.removeEventListener('clearSearch', handleClearSearch)
    }
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Keep the form submission for accessibility and enter key support
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setSearchQuery(query)

    // Use debounced search for real-time updates
    debouncedSearch(query)
  }

  const handleLogout = () => {
    signOut({ callbackUrl: "/" })
  }

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true
    if (path !== "/" && pathname.startsWith(path)) return true
    return false
  }

  // Check if user is on wishlist page
  const isWishlistActive = pathname === "/account/wishlist"

  // Check if user is on cart page
  const isCartActive = pathname === "/cart"

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-allowed mx-auto">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Logo and Navigation Links */}
          <div className="flex items-center space-x-8">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">Eco-Site</span>
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-1">
              <Link
                href="/"
                className={`nav-link ${isActive("/") ? "nav-link-active" : "nav-link-inactive"}`}
              >
                Home
                {isActive("/") && <div className="nav-link-dot"></div>}
              </Link>
              <Link
                href="/contact"
                className={`nav-link ${isActive("/contact") ? "nav-link-active" : "nav-link-inactive"}`}
              >
                Contact
                {isActive("/contact") && <div className="nav-link-dot"></div>}
              </Link>
              <Link
                href="/about"
                className={`nav-link ${isActive("/about") ? "nav-link-active" : "nav-link-inactive"}`}
              >
                About
                {isActive("/about") && <div className="nav-link-dot"></div>}
              </Link>
            </div>
          </div>

          {/* Right side - Search, Icons, and Profile */}
          <div className="flex items-center space-x-4">
            {/* Search Bar */}
            {pathname.startsWith("/products") && (
              <form onSubmit={handleSearch} className="hidden sm:flex items-center">
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="What are you looking for?"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="w-64 pr-10"
                  />
                  <Button
                    type="submit"
                    size="sm"
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 bg-transparent hover:bg-transparent text-black"
                  >
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
              </form>
            )}

            {/* Icons */}
            <div className="flex items-center space-x-3">
              {/* Favorites Icon */}
              <Link
                href="/account/wishlist"
                className={`p-2 rounded-full transition-colors duration-300 ${isWishlistActive
                  ? 'bg-red-100 hover:bg-red-200'
                  : 'hover:bg-gray-100'
                  }`}
              >
                <Heart
                  className={`h-5 w-5 transition-colors duration-300 ${isWishlistActive
                    ? 'text-red-600 fill-red-600'
                    : 'text-gray-700'
                    }`}
                />
              </Link>

              {/* Cart Icon */}
              <Link
                href="/cart"
                className={`p-2 rounded-full transition-colors duration-300 ${isCartActive
                  ? 'bg-gray-100 hover:bg-gray-200'
                  : 'hover:bg-gray-100'
                  }`}
              >
                <ShoppingCart
                  className={`h-5 w-5 transition-colors duration-300 ${isCartActive
                    ? 'text-black fill-black'
                    : 'text-gray-700'
                    }`}
                />
              </Link>

              {/* Profile Menu */}
              {!isClient ? (
                // Show loading state during SSR to prevent hydration mismatch
                <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />
              ) : status === "loading" ? (
                <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />
              ) : !session ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild className="!bg-transparent hover:!bg-transparent outline-none border-none">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="relative p-2 hover:bg-gray-100 rounded-full transition-colors duration-300 focus:outline-none focus:ring-0 focus:ring-offset-0"
                    >
                      <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center">
                        <User className="h-4 w-4 text-white" />
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-72 p-2">
                    {/* User Profile Header */}
                    <DropdownMenuLabel className="p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg mb-2">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center">
                          <User className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-900 truncate">
                            {/* {session.user?.name || "User"} */}
                            Furqan Ahmad
                          </p>
                          <p className="text-xs text-gray-600 truncate">
                            {/* {session.user?.email} */}
                            hfurqan.se@gmail.com
                          </p>
                          <div className="flex items-center mt-1">
                            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                            <span className="text-xs text-green-600 font-medium">Online</span>
                          </div>
                        </div>
                      </div>
                    </DropdownMenuLabel>

                    {/* Quick Actions */}
                    <div className="px-1">
                      <DropdownMenuItem asChild className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors">
                        <Link href="/account" className="flex items-center w-full">
                          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                            <User className="h-4 w-4 text-blue-600" />
                          </div>
                          <div className="flex-1 text-left">
                            <p className="text-sm font-medium text-gray-900">My Account</p>
                            <p className="text-xs text-gray-500">Manage your profile</p>
                          </div>
                        </Link>
                      </DropdownMenuItem>

                      <DropdownMenuItem asChild className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors">
                        <Link href="/account/orders" className="flex items-center w-full">
                          <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                            <Package className="h-4 w-4 text-green-600" />
                          </div>
                          <div className="flex-1 text-left">
                            <p className="text-sm font-medium text-gray-900">My Orders</p>
                            <p className="text-xs text-gray-500">Track your purchases</p>
                          </div>
                        </Link>
                      </DropdownMenuItem>

                      <DropdownMenuItem asChild className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors">
                        <Link href="/account/wishlist" className="flex items-center w-full">
                          <div className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center mr-3">
                            <Heart className="h-4 w-4 text-pink-600" />
                          </div>
                          <div className="flex-1 text-left">
                            <p className="text-sm font-medium text-gray-900">My Wishlist</p>
                            <p className="text-xs text-gray-500">Saved items</p>
                          </div>
                        </Link>
                      </DropdownMenuItem>

                      <DropdownMenuItem asChild className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors">
                        <Link href="/account/address" className="flex items-center w-full">
                          <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                            <MapPin className="h-4 w-4 text-purple-600" />
                          </div>
                          <div className="flex-1 text-left">
                            <p className="text-sm font-medium text-gray-900">Addresses</p>
                            <p className="text-xs text-gray-500">Manage delivery addresses</p>
                          </div>
                        </Link>
                      </DropdownMenuItem>

                      <DropdownMenuItem asChild className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors">
                        <Link href="/account/payment" className="flex items-center w-full">
                          <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
                            <CreditCard className="h-4 w-4 text-orange-600" />
                          </div>
                          <div className="flex-1 text-left">
                            <p className="text-sm font-medium text-gray-900">Payment Methods</p>
                            <p className="text-xs text-gray-500">Manage your cards</p>
                          </div>
                        </Link>
                      </DropdownMenuItem>
                    </div>

                    <DropdownMenuSeparator className="my-2" />

                    {/* Settings and Logout */}
                    <div className="px-1">
                      <DropdownMenuItem asChild className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors">
                        <Link href="/account/profile" className="flex items-center w-full">
                          <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                            <Settings className="h-4 w-4 text-gray-600" />
                          </div>
                          <div className="flex-1 text-left">
                            <p className="text-sm font-medium text-gray-900">Settings</p>
                            <p className="text-xs text-gray-500">Account preferences</p>
                          </div>
                        </Link>
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        onClick={handleLogout}
                        className="flex items-center p-3 rounded-lg hover:bg-red-50 transition-colors text-red-600"
                      >
                        <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                          <LogOut className="h-4 w-4 text-red-600" />
                        </div>
                        <div className="flex-1 text-left">
                          <p className="text-sm font-medium">Sign Out</p>
                          <p className="text-xs text-red-500">Log out of your account</p>
                        </div>
                      </DropdownMenuItem>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link href="/auth/signin">
                    <Button variant="ghost" size="sm">
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/auth/signup">
                    <Button size="sm">
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
