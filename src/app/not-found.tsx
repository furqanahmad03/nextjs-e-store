"use client"

import * as React from "react"
import Link from "next/link"
import { Home, ArrowLeft, ShoppingBag } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  const router = useRouter()

  const handleGoBack = () => {
    router.back()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* 404 Number */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-gray-300 select-none">404</h1>
          <div className="relative -mt-20">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Page Not Found</h2>
          </div>
        </div>

        {/* Main Message */}
        <div className="mb-8">
          <p className="text-xl text-gray-600 mb-4">
            Oops! The page you're looking for doesn't exist.
          </p>
          <p className="text-gray-500">
            It might have been moved, deleted, or you entered the wrong URL.
          </p>
        </div>



        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            onClick={handleGoBack}
            className="inline-flex items-center justify-center gap-2 min-w-[140px] px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </Button>
          
          <Link 
            href="/"
            className="inline-flex items-center justify-center gap-2 min-w-[140px] px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors duration-200"
          >
            <Home className="w-4 h-4" />
            Homepage
          </Link>
          
          <Link 
            href="/products"
            className="inline-flex items-center justify-center gap-2 min-w-[140px] px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-colors duration-200"
          >
            <ShoppingBag className="w-4 h-4" />
            Browse Products
          </Link>
        </div>

        {/* Quick Links */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <h4 className="text-sm font-medium text-gray-600 mb-4">Quick Links</h4>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link href="/products" className="text-red-500 hover:text-red-600 hover:underline">
              All Products
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-gray-800 hover:underline">
              About Us
            </Link>
            <Link href="/contact" className="text-gray-600 hover:text-gray-800 hover:underline">
              Contact
            </Link>
            <Link href="/cart" className="text-gray-600 hover:text-gray-800 hover:underline">
              Cart
            </Link>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 opacity-10">
          <div className="w-20 h-20 bg-red-500 rounded-full"></div>
        </div>
        <div className="absolute bottom-10 right-10 opacity-10">
          <div className="w-16 h-16 bg-blue-500 rounded-full"></div>
        </div>
      </div>
    </div>
  )
} 