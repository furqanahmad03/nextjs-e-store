"use client"

import React from "react"
import { useCart, WishlistItem } from "@/contexts/CartContext"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Heart, 
  ShoppingCart, 
  Trash2, 
  Star,
  Package
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import AccountLayout from "@/components/AccountLayout"
import { toast } from "sonner"
import { useTranslations } from "next-intl"
import { usePathname } from "next/navigation"

export default function WishlistPage() {
  const { wishlist, removeFromWishlist, addToCart } = useCart()
  const t = useTranslations('accountPages.wishlist')
  const pathname = usePathname()
  
  // Extract current language from pathname
  const currentLang = pathname.split('/')[1] || 'en'

  const handleAddToCart = async (item: WishlistItem) => {
    try {
      await addToCart(item.id, 1)
    } catch (error) {
      console.error('Error adding to cart:', error)
      toast.error('Failed to add item to cart')
    }
  }

  const handleRemoveFromWishlist = (item: WishlistItem) => {
    removeFromWishlist(item.id)
  }

  if (wishlist.length === 0) {
    return (
      <AccountLayout 
        title={t('title')}
        breadcrumbItems={[
          { label: t('title'), isCurrent: true }
        ]}
      >
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">{t('noWishlistItems')}</h3>
          <p className="text-gray-600 mb-6">{t('noWishlistItems')}</p>
          <Button asChild className="bg-red-500 hover:bg-red-600 text-white">
            <Link href={`/${currentLang}/products`}>{t('browseProducts')}</Link>
          </Button>
        </div>
      </AccountLayout>
    )
  }

  return (
    <AccountLayout 
      title={t('title')}
      breadcrumbItems={[
        { label: t('title'), isCurrent: true }
      ]}
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{t('title')}</h2>
            <p className="text-gray-600 mt-1">
              {wishlist.length} {wishlist.length === 1 ? t('item') : t('items')} {t('inWishlist')}
            </p>
          </div>
          <Button asChild variant="outline">
            <Link href={`/${currentLang}/products`}>
              <Package className="w-4 h-4 mr-2" />
              {t('continueShopping')}
            </Link>
          </Button>
        </div>

        {/* Wishlist Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((item) => (
            <Card key={item.id} className="group p-0 gap-0 relative overflow-hidden hover:shadow-lg transition-shadow duration-300">
              {/* Product Image */}
              <div className="relative aspect-square bg-gray-100 overflow-hidden">
                <Image
                  src={item.images?.[0] || item.image || "/ps5.png"}
                  alt={item.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Sale Badge */}
                {item.isSale && (
                  <Badge className="absolute top-2 left-2 bg-red-500 text-white">
                    SALE
                  </Badge>
                )}
                
                {/* Stock Badge */}
                {item.stock === 0 && (
                  <Badge className="absolute top-2 right-2 bg-gray-500 text-white">
                    Out of Stock
                  </Badge>
                )}
                
                {/* Quick Actions Overlay */}
                <div className="absolute inset-0 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => handleAddToCart(item)}
                      disabled={item.stock === 0}
                      className="bg-white text-gray-900 hover:bg-gray-100"
                    >
                      <ShoppingCart className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleRemoveFromWishlist(item)}
                      className="bg-white text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <div>
                  {/* Category and Brand */}
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{item.category}</span>
                    <span>{item.brand}</span>
                  </div>

                  {/* Product Name */}
                  <h3 className="font-medium text-gray-900 line-clamp-2 mb-0">
                    <Link href={`/${currentLang}/products/${item.id}`} className="hover:text-red-500">{item.name}</Link>
                  </h3>

                  {/* Rating */}
                  <div className="flex items-center gap-1">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i < Math.floor(item.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-600">({item.rating})</span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-lg text-gray-900">
                        ${(item.price || 0).toFixed(2)}
                      </span>
                      {item.isSale && (
                        <Badge variant="secondary" className="text-xs">
                          SALE
                        </Badge>
                      )}
                    </div>
                    <span className="text-xs text-gray-500">
                      {item.stock > 0 ? `${item.stock} in stock` : 'Out of stock'}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-2">
                    <Button
                      onClick={() => handleAddToCart(item)}
                      disabled={item.stock === 0}
                      className="flex-1 bg-red-500 hover:bg-red-600 text-white"
                      size="sm"
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      {t('addToCart')}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleRemoveFromWishlist(item)}
                      className="text-red-600 border-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Added Date */}
                  <div className="text-xs text-gray-500 pt-2 border-t">
                    Added on {new Date(item.dateAdded).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Empty State for Mobile */}
        {wishlist.length === 0 && (
          <div className="text-center py-8 md:hidden">
            <Heart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Your wishlist is empty</h3>
            <p className="text-gray-600 mb-4">Start adding products you love!</p>
            <Button asChild className="bg-red-500 hover:bg-red-600 text-white">
              <Link href={`/${currentLang}/products`}>Browse Products</Link>
            </Button>
          </div>
        )}
      </div>
    </AccountLayout>
  )
} 