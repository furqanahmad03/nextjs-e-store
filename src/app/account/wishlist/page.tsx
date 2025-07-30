"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, ShoppingCart, Trash2 } from "lucide-react"
import Image from "next/image"
import AccountLayout from "@/components/AccountLayout"
import { useEffect } from "react"

// Mock wishlist data
const wishlistItems = [
  {
    id: 1,
    name: "Apple iPhone 15 Pro",
    image: "/iphone-banner.jpg",
    price: 999.99,
    originalPrice: 1099.99,
    inStock: true,
    rating: 4.8,
    reviews: 124
  },
  {
    id: 2,
    name: "Sony PlayStation 5",
    image: "/iphone-banner.jpg",
    price: 499.99,
    originalPrice: 499.99,
    inStock: false,
    rating: 4.9,
    reviews: 89
  },
  {
    id: 3,
    name: "MacBook Air M2",
    image: "/iphone-banner.jpg",
    price: 1199.99,
    originalPrice: 1299.99,
    inStock: true,
    rating: 4.7,
    reviews: 156
  },
  {
    id: 4,
    name: "Samsung Galaxy Watch",
    image: "/iphone-banner.jpg",
    price: 299.99,
    originalPrice: 349.99,
    inStock: true,
    rating: 4.6,
    reviews: 203
  }
]

export default function WishlistPage() {
  useEffect(() => {
    document.title = "My Wishlist | E-Store";
  }, []);

  return (
    <AccountLayout 
      title="My Wishlist"
      breadcrumbItems={[
        { label: "My Wishlist", isCurrent: true }
      ]}
    >
      <h2 className="text-xl font-bold text-red-500 mb-6">My Wishlist</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlistItems.map((item) => (
          <div key={item.id} className="border border-gray-200 rounded-lg p-4 group">
            {/* Product Image */}
            <div className="relative mb-4">
              <div className="w-full h-48 relative rounded-lg overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute top-2 right-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-8 h-8 p-0 bg-white hover:bg-red-50 border-red-200"
                >
                  <Trash2 className="w-4 h-4 text-red-600" />
                </Button>
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-900 line-clamp-2">{item.name}</h3>
              
              {/* Rating */}
              <div className="flex items-center gap-1">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={i < Math.floor(item.rating) ? "text-yellow-400" : "text-gray-300"}>
                      ★
                    </span>
                  ))}
                </div>
                <span className="text-sm text-gray-600">({item.reviews})</span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-2">
                <span className="font-bold text-gray-900">${item.price.toFixed(2)}</span>
                {item.originalPrice > item.price && (
                  <span className="text-sm text-gray-500 line-through">
                    ${item.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>

              {/* Stock Status */}
              <div className="flex items-center justify-between">
                <Badge className={item.inStock ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                  {item.inStock ? "In Stock" : "Out of Stock"}
                </Badge>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-2">
                <Button 
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white"
                  disabled={!item.inStock}
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {wishlistItems.length === 0 && (
        <div className="text-center py-12">
          <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Your Wishlist is Empty</h3>
          <p className="text-gray-600 mb-6">Start adding items to your wishlist to save them for later.</p>
          <Button asChild className="bg-red-500 hover:bg-red-600 text-white">
            <a href="/products">Start Shopping</a>
          </Button>
        </div>
      )}
    </AccountLayout>
  )
} 