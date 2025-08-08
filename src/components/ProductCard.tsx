"use client"

import React from "react"
import { Product } from "@/types/Product"
import { useCart } from "@/contexts/CartContext"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { toast } from "sonner"
import { useTranslations } from "next-intl"
import { usePathname } from "next/navigation"

interface Props {
  product: Product
}

export default function ProductCard({ product }: Props) {
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useCart()
  const [isAddingToCart, setIsAddingToCart] = React.useState(false)
  const [isWishlistLoading, setIsWishlistLoading] = React.useState(false)
  const t = useTranslations('products')
  const pathname = usePathname()
  
  // Extract current language from pathname
  const currentLang = pathname.split('/')[1] || 'en'

  const handleAddToCart = async () => {
    try {
      setIsAddingToCart(true)
      await addToCart(product.id)
    } catch (error) {
      console.error('Error adding to cart:', error)
      toast.error(t('toast.failedToAddToCart'))
    } finally {
      setIsAddingToCart(false)
    }
  }

  const handleWishlistToggle = async () => {
    try {
      setIsWishlistLoading(true)
      
      if (isInWishlist(product.id)) {
        removeFromWishlist(product.id)
      } else {
        addToWishlist({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          images: product.images || [product.image],
          category: product.category,
          subcategory: product.subcategory,
          brand: product.brand,
          rating: product.rating,
          stock: product.stock,
          isSale: product.isSale,
        })
      }
    } catch (error) {
      console.error('Error toggling wishlist:', error)
      toast.error(t('toast.failedToUpdateWishlist'))
    } finally {
      setIsWishlistLoading(false)
    }
  }

  return (
    <div className="group relative bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Product Image */}
      <div className="aspect-square bg-gray-200 relative overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Sale Badge */}
        {product.isSale && (
          <Badge className="absolute top-2 left-2 bg-red-500 text-white">
            {t('discount')}
          </Badge>
        )}
        
        {/* Wishlist Button */}
        <Button
          size="sm"
          variant="ghost"
          onClick={handleWishlistToggle}
          disabled={isWishlistLoading}
          className={`absolute top-2 right-2 w-8 h-8 p-0 rounded-full transition-all duration-200 ${
            isInWishlist(product.id)
              ? 'bg-red-500 text-white hover:bg-red-600'
              : 'bg-white text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Heart 
            className={`w-4 h-4 ${isInWishlist(product.id) ? 'fill-current' : ''}`} 
          />
        </Button>
        
        {/* Stock Badge */}
        {product.stock === 0 && (
          <Badge className="absolute bottom-2 left-2 bg-gray-500 text-white">
            {t('outOfStock')}
          </Badge>
        )}

        {/* Add to Cart Button - Slides up from bottom of image */}
        <div className="absolute bottom-0 left-0 right-0 bg-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
          <Button 
            onClick={handleAddToCart} 
            disabled={isAddingToCart || product.stock === 0} 
            className="w-full bg-black rounded-none text-white font-bold py-3 px-4 uppercase tracking-wide hover:bg-gray-900 transition-colors duration-200 disabled:opacity-50"
          >
            {isAddingToCart ? 'Adding...' : t('addToCart')}
          </Button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <div className="space-y-2">
          {/* Category and Brand */}
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>{product.category}</span>
            <span>{product.brand}</span>
          </div>

          {/* Product Name */}
          <Link href={`/${currentLang}/products/${product.id}`}>
            <h3 className="font-medium text-gray-900 line-clamp-2 min-h-[2.5rem] hover:text-red-500 transition-colors duration-200">
              {product.name}
            </h3>
          </Link>

          {/* Rating */}
          <div className="flex items-center gap-1">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${
                    i < Math.floor(product.rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-600">({product.rating})</span>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg text-gray-900">
                ${(product.price || 0).toFixed(2)}
              </span>
              {product.isSale && (
                <Badge variant="secondary" className="text-xs">
                  {t('discount')}
                </Badge>
              )}
            </div>
            <span className="text-xs text-gray-500">
              {product.stock > 0 ? `${product.stock} ${t('inStock')}` : t('outOfStock')}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
} 