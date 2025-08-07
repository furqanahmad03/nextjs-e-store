"use client"

import React, { useState, useEffect, useRef, Suspense } from "react"
import Link from "next/link"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useSession, signOut } from "next-auth/react"
import { Search, Heart, ShoppingCart, User, LogOut, Package, Settings, CreditCard, MapPin } from "lucide-react"
import { useTranslations } from "next-intl"

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
import { useCart } from "@/contexts/CartContext"
import LanguageSelector from "@/components/LanguageSelector"

function NavbarContent() {
  const { data: session, status } = useSession()
  const { getCartCount, getWishlistCount, isHydrated } = useCart()
  const [searchQuery, setSearchQuery] = useState("")
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  const t = useTranslations('navigation')
  
  // Extract current language from pathname
  const currentLang = pathname.split('/')[1] || 'en'

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
        router.push(`/${currentLang}/products?${params.toString()}`)
      }
    }, 300) // 300ms delay
  }

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
      router.push(`/${currentLang}/products?search=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setSearchQuery(query)

    // Use debounced search for real-time updates
    debouncedSearch(query)
  }

  const handleLogout = () => {
    signOut({ callbackUrl: `/${currentLang}` })
  }

  const isActive = (path: string) => {
    const localizedPath = `/${currentLang}${path === "/" ? "" : path}`
    if (path === "/" && pathname === `/${currentLang}`) return true
    if (path !== "/" && pathname.startsWith(localizedPath)) return true
    return false
  }

  // Check if user is on cart page
  const isCartActive = pathname === `/${currentLang}/cart`

  const cartCount = getCartCount()
  const wishlistCount = getWishlistCount()

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-allowed mx-auto">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Logo and Navigation Links */}
          <div className="flex items-center space-x-8">
            {/* Logo */}
            <Link href={`/${currentLang}`} className="flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">Eco-Site</span>
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-1">
              <Link
                href={`/${currentLang}`}
                className={`nav-link ${isActive("/") ? "nav-link-active" : "nav-link-inactive"}`}
              >
                {t('home')}
                {isActive("/") && <div className="nav-link-dot"></div>}
              </Link>
              <Link
                href={`/${currentLang}/contact`}
                className={`nav-link ${isActive("/contact") ? "nav-link-active" : "nav-link-inactive"}`}
              >
                {t('contact')}
                {isActive("/contact") && <div className="nav-link-dot"></div>}
              </Link>
              <Link
                href={`/${currentLang}/about`}
                className={`nav-link ${isActive("/about") ? "nav-link-active" : "nav-link-inactive"}`}
              >
                {t('about')}
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
                    placeholder={t('searchPlaceholder')}
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

            {/* Language Selector */}
            <LanguageSelector />

            {/* Icons */}
            <div className="flex items-center gap-4">
              {/* Wishlist Icon */}
              <Link href={`/${currentLang}/account/wishlist`} className={`relative p-2 rounded-full transition-colors duration-300 ${pathname === `/${currentLang}/account/wishlist` ? 'bg-gray-100 hover:bg-gray-200' : 'hover:bg-gray-100'}`}>
                <Heart className={`h-5 w-5 transition-colors duration-300 ${pathname === `/${currentLang}/account/wishlist` ? 'text-red-500 fill-red-500' : 'text-gray-700'}`} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                    {wishlistCount > 99 ? '99+' : wishlistCount}
                  </span>
                )}
              </Link>
              
              {/* Cart Icon */}
              <Link href={`/${currentLang}/cart`} className={`relative p-2 rounded-full transition-colors duration-300 ${isCartActive ? 'bg-gray-100 hover:bg-gray-200' : 'hover:bg-gray-100'}`}>
                <ShoppingCart className={`h-5 w-5 transition-colors duration-300 ${isCartActive ? 'text-black fill-black' : 'text-gray-700'}`} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                    {cartCount > 99 ? '99+' : cartCount}
                  </span>
                )}
              </Link>
              
              {/* Profile Menu */}
              {!isHydrated ? (
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
                            <span className="text-xs text-green-600 font-medium">{t('online')}</span>
                          </div>
                        </div>
                      </div>
                    </DropdownMenuLabel>

                    {/* Quick Actions */}
                    <div className="px-1">
                      <DropdownMenuItem asChild className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors">
                        <Link href={`/${currentLang}/account`} className="flex items-center w-full">
                          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                            <User className="h-4 w-4 text-blue-600" />
                          </div>
                          <div className="flex-1 text-left">
                            <p className="text-sm font-medium text-gray-900">{t('myAccount')}</p>
                            <p className="text-xs text-gray-500">{t('manageProfile')}</p>
                          </div>
                        </Link>
                      </DropdownMenuItem>

                      <DropdownMenuItem asChild className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors">
                        <Link href={`/${currentLang}/account/orders`} className="flex items-center w-full">
                          <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                            <Package className="h-4 w-4 text-green-600" />
                          </div>
                          <div className="flex-1 text-left">
                            <p className="text-sm font-medium text-gray-900">{t('myOrders')}</p>
                            <p className="text-xs text-gray-500">{t('trackPurchases')}</p>
                          </div>
                        </Link>
                      </DropdownMenuItem>

                      <DropdownMenuItem asChild className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors">
                        <Link href={`/${currentLang}/account/wishlist`} className="flex items-center w-full">
                          <div className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center mr-3">
                            <Heart className="h-4 w-4 text-pink-600" />
                          </div>
                          <div className="flex-1 text-left">
                            <p className="text-sm font-medium text-gray-900">{t('myWishlist')}</p>
                            <p className="text-xs text-gray-500">{t('savedItems')}</p>
                          </div>
                        </Link>
                      </DropdownMenuItem>

                      <DropdownMenuItem asChild className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors">
                        <Link href={`/${currentLang}/account/address`} className="flex items-center w-full">
                          <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                            <MapPin className="h-4 w-4 text-purple-600" />
                          </div>
                          <div className="flex-1 text-left">
                            <p className="text-sm font-medium text-gray-900">{t('addresses')}</p>
                            <p className="text-xs text-gray-500">{t('manageDelivery')}</p>
                          </div>
                        </Link>
                      </DropdownMenuItem>

                      <DropdownMenuItem asChild className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors">
                        <Link href={`/${currentLang}/account/payment`} className="flex items-center w-full">
                          <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
                            <CreditCard className="h-4 w-4 text-orange-600" />
                          </div>
                          <div className="flex-1 text-left">
                            <p className="text-sm font-medium text-gray-900">{t('paymentMethods')}</p>
                            <p className="text-xs text-gray-500">{t('manageCards')}</p>
                          </div>
                        </Link>
                      </DropdownMenuItem>
                    </div>

                    <DropdownMenuSeparator className="my-2" />

                    {/* Settings and Logout */}
                    <div className="px-1">
                      <DropdownMenuItem asChild className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors">
                        <Link href={`/${currentLang}/account/profile`} className="flex items-center w-full">
                          <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                            <Settings className="h-4 w-4 text-gray-600" />
                          </div>
                          <div className="flex-1 text-left">
                            <p className="text-sm font-medium text-gray-900">{t('settings')}</p>
                            <p className="text-xs text-gray-500">{t('accountPreferences')}</p>
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
                          <p className="text-sm font-medium">{t('signOut')}</p>
                          <p className="text-xs text-red-500">{t('logoutAccount')}</p>
                        </div>
                      </DropdownMenuItem>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link href={`/${currentLang}/auth/signin`}>
                    <Button variant="ghost" size="sm">
                      {t('signIn')}
                    </Button>
                  </Link>
                  <Link href={`/${currentLang}/auth/signup`}>
                    <Button size="sm">
                      {t('signUp')}
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

export default function Navbar() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NavbarContent />
    </Suspense>
  )
}
