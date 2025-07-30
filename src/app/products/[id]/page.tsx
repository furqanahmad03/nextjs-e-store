"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { 
  Heart, 
  ShoppingCart, 
  Share2, 
  Star, 
  ChevronLeft, 
  ChevronRight,
  Minus,
  Plus,
  Truck,
  Shield,
  RotateCcw,
  CheckCircle,
  MessageCircle,
  Package,
  Clock,
  MapPin,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Copy,
  Eye,
  EyeOff
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import productsData from "@/app/api/products/products.json"
import { Product, ProductCardProps } from "@/types/Product"
import ProductCard from "@/components/ProductCard"

// Extended product interface for detail page
interface ProductDetail extends Product {
  images: string[]
  specifications: Record<string, string>
  features: string[]
  reviews: {
    id: number
    user: string
    rating: number
    date: string
    comment: string
    helpful: number
  }[]
  relatedProducts: number[]
  warranty: string
  returnPolicy: string
  shippingInfo: string
}


export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const productId = parseInt(params.id as string)
  
  const [product, setProduct] = useState<ProductDetail | null>(null)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isInWishlist, setIsInWishlist] = useState(false)
  const [isInCart, setIsInCart] = useState(false)
  const [showShareMenu, setShowShareMenu] = useState(false)
  const [copied, setCopied] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    document.title = `${product?.name} | Eco-Site`;
  }, [product]);

  // Generate mock product data
  useEffect(() => {
    const mockProduct = productsData.find(p => p.id === productId)
    
    if (mockProduct) {
      // Add missing isInSale property
      const productWithSale: Product = {
        ...mockProduct,
        isInSale: Math.random() > 0.5 // Randomly assign sale status
      }
      
      // Create extended product data
      const extendedProduct: ProductDetail = {
        ...productWithSale,
        images: [
          productWithSale.image,
          "/iphone-banner.jpg",
          "/summer-banner.jpg", 
          "/electronics-banner.jpg",
          "/women-collection.png"
        ],
        specifications: {
          "Brand": mockProduct.brand,
          "Category": mockProduct.category,
          "Subcategory": mockProduct.subcategory,
          "Material": "Premium Quality",
          "Color": "Multiple Options",
          "Size": "Standard",
          "Weight": "0.5 kg",
          "Dimensions": "10 x 5 x 2 inches",
          "Warranty": "1 Year",
          "Country of Origin": "United States"
        },
        features: [
          "High-quality materials",
          "Durable construction",
          "Comfortable design",
          "Easy to maintain",
          "Versatile usage",
          "Modern styling"
        ],
        reviews: [
          {
            id: 1,
            user: "John Doe",
            rating: 5,
            date: "2024-01-15",
            comment: "Excellent product! Exceeded my expectations. The quality is outstanding and it's very comfortable to use.",
            helpful: 12
          },
          {
            id: 2,
            user: "Jane Smith",
            rating: 4,
            date: "2024-01-10",
            comment: "Great product overall. Good value for money. Would recommend to others.",
            helpful: 8
          },
          {
            id: 3,
            user: "Mike Johnson",
            rating: 5,
            date: "2024-01-05",
            comment: "Perfect! Exactly what I was looking for. Fast delivery and excellent customer service.",
            helpful: 15
          }
        ],
        relatedProducts: [2, 3, 4, 5],
        warranty: "1 Year Manufacturer Warranty",
        returnPolicy: "30-day return policy with full refund",
        shippingInfo: "Free shipping on orders over $50"
      }
      
      setProduct(extendedProduct)
    }
    setLoading(false)
  }, [productId])

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= product?.stock!) {
      setQuantity(newQuantity)
    }
  }

  const addToCart = () => {
    setIsInCart(true)
    // TODO: Implement actual cart functionality
    console.log(`Added ${quantity} of ${product?.name} to cart`)
  }

  const toggleWishlist = () => {
    setIsInWishlist(!isInWishlist)
    // TODO: Implement actual wishlist functionality
    console.log(`${isInWishlist ? 'Removed from' : 'Added to'} wishlist: ${product?.name}`)
  }

  const shareProduct = async (platform: string) => {
    const url = window.location.href
    const text = `Check out this amazing product: ${product?.name}`
    
    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`)
        break
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`)
        break
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`)
        break
      case 'copy':
        await navigator.clipboard.writeText(url)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
        break
    }
    setShowShareMenu(false)
  }

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % product!.images.length)
  }

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + product!.images.length) % product!.images.length)
  }

  // Convert product to ProductCardProps format
  const convertToProductCardProps = (product: Product): ProductCardProps => {
    const discount = product.isInSale ? 15 : 0
    const originalPrice = product.price
    const currentPrice = originalPrice * (1 - discount / 100)
    
    return {
      id: product.id,
      name: product.name,
      image: product.image,
      currentPrice: Math.round(currentPrice * 100) / 100,
      originalPrice: Math.round(originalPrice * 100) / 100,
      discount,
      rating: product.rating,
      reviews: 50 + (product.id % 100) // Mock review count
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-500"></div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
          <Button onClick={() => router.push('/products')}>
            Back to Products
          </Button>
        </div>
      </div>
    )
  }

  const averageRating = product.reviews.reduce((sum, review) => sum + review.rating, 0) / product.reviews.length
  const discount = product.isInSale ? 15 : 0
  const discountedPrice = product.price * (1 - discount / 100)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
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
                <BreadcrumbLink asChild>
                  <Link href="/products">Products</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href={`/products?category=${product.category.toLowerCase().replace(' ', '-')}`}>
                    {product.category}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{product.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square bg-white rounded-lg overflow-hidden border border-gray-200">
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                className="object-cover"
              />
              
              {/* Navigation Arrows */}
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {/* Sale Badge */}
              {product.isInSale && (
                <div className="absolute top-4 left-4">
                  <Badge className="bg-red-500 text-white">SALE {discount}% OFF</Badge>
                </div>
              )}

              {/* Stock Badge */}
              <div className="absolute top-4 right-4">
                <Badge className={product.stock > 10 ? "bg-green-500" : product.stock > 0 ? "bg-yellow-500" : "bg-red-500"}>
                  {product.stock > 10 ? "In Stock" : product.stock > 0 ? `Only ${product.stock} left` : "Out of Stock"}
                </Badge>
              </div>
            </div>

            {/* Thumbnail Images */}
            {product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index ? 'border-red-500' : 'border-gray-200'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Product Header */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <p className="text-gray-600 mb-4">{product.brand}</p>
              
              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(averageRating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {averageRating.toFixed(1)} ({product.reviews.length} reviews)
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-gray-900">
                  ${discountedPrice.toFixed(2)}
                </span>
                {product.isInSale && (
                  <span className="text-xl text-gray-500 line-through">
                    ${product.price.toFixed(2)}
                  </span>
                )}
                {product.isInSale && (
                  <Badge className="bg-red-500 text-white">
                    Save ${(product.price - discountedPrice).toFixed(2)}
                  </Badge>
                )}
              </div>
              <p className="text-sm text-gray-600">
                Free shipping on orders over $50
              </p>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            {/* Quantity Selector */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-900">Quantity</label>
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => handleQuantityChange(quantity - 1)}
                    className="p-2 hover:bg-gray-100 transition-colors"
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <Input
                    type="number"
                    value={quantity}
                    onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                    className="w-16 text-center border-0 focus:ring-0"
                    min="1"
                    max={product.stock}
                  />
                  <button
                    onClick={() => handleQuantityChange(quantity + 1)}
                    className="p-2 hover:bg-gray-100 transition-colors"
                    disabled={quantity >= product.stock}
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-sm text-gray-600">
                  {product.stock} available
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={addToCart}
                disabled={product.stock === 0}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 text-lg font-semibold"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                {isInCart ? 'Added to Cart' : 'Add to Cart'}
              </Button>
              
              <Button
                onClick={toggleWishlist}
                variant="outline"
                className="px-6 border-gray-300 hover:bg-gray-50"
              >
                <Heart className={`w-5 h-5 mr-2 ${isInWishlist ? 'fill-red-500 text-red-500' : ''}`} />
                {isInWishlist ? 'Saved' : 'Wishlist'}
              </Button>

              <div className="relative">
                <Button
                  onClick={() => setShowShareMenu(!showShareMenu)}
                  variant="outline"
                  className="px-6 border-gray-300 hover:bg-gray-50"
                >
                  <Share2 className="w-5 h-5 mr-2" />
                  Share
                </Button>

                {/* Share Menu */}
                {showShareMenu && (
                  <div className="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-2 z-10">
                    <button
                      onClick={() => shareProduct('facebook')}
                      className="flex items-center w-full px-3 py-2 text-left hover:bg-gray-50 rounded"
                    >
                      <Facebook className="w-4 h-4 mr-2 text-blue-600" />
                      Facebook
                    </button>
                    <button
                      onClick={() => shareProduct('twitter')}
                      className="flex items-center w-full px-3 py-2 text-left hover:bg-gray-50 rounded"
                    >
                      <Twitter className="w-4 h-4 mr-2 text-blue-400" />
                      Twitter
                    </button>
                    <button
                      onClick={() => shareProduct('linkedin')}
                      className="flex items-center w-full px-3 py-2 text-left hover:bg-gray-50 rounded"
                    >
                      <Linkedin className="w-4 h-4 mr-2 text-blue-700" />
                      LinkedIn
                    </button>
                    <button
                      onClick={() => shareProduct('copy')}
                      className="flex items-center w-full px-3 py-2 text-left hover:bg-gray-50 rounded"
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      {copied ? 'Copied!' : 'Copy Link'}
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Truck className="w-4 h-4" />
                Free Shipping
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Shield className="w-4 h-4" />
                Secure Payment
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <RotateCcw className="w-4 h-4" />
                Easy Returns
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle className="w-4 h-4" />
                Quality Guaranteed
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full h-fit grid-cols-4">
              <TabsTrigger className="py-3" value="description">Description</TabsTrigger>
              <TabsTrigger className="py-3" value="specifications">Specifications</TabsTrigger>
              <TabsTrigger className="py-3" value="reviews">Reviews ({product.reviews.length})</TabsTrigger>
              <TabsTrigger className="py-3" value="shipping">Shipping & Returns</TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-6">
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Product Description</h3>
                <p className="text-gray-600 leading-relaxed mb-6">{product.description}</p>
                
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Key Features</h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="specifications" className="mt-6">
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Product Specifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                      <span className="font-medium text-gray-900">{key}</span>
                      <span className="text-gray-600">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-gray-900">Customer Reviews</h3>
                  <Button variant="outline">Write a Review</Button>
                </div>

                <div className="space-y-6">
                  {product.reviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-100 pb-6 last:border-b-0">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-900">{review.user}</span>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">{review.date}</span>
                      </div>
                      <p className="text-gray-600 mb-2">{review.comment}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <button className="flex items-center gap-1 hover:text-gray-700">
                          <MessageCircle className="w-4 h-4" />
                          Helpful ({review.helpful})
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="shipping" className="mt-6">
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <Truck className="w-5 h-5" />
                      Shipping Information
                    </h4>
                    <p className="text-gray-600">{product.shippingInfo}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <RotateCcw className="w-5 h-5" />
                      Return Policy
                    </h4>
                    <p className="text-gray-600">{product.returnPolicy}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <Shield className="w-5 h-5" />
                      Warranty
                    </h4>
                    <p className="text-gray-600">{product.warranty}</p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Related Products</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {product.relatedProducts.slice(0, 4).map((relatedId) => {
              const relatedProduct = productsData.find(p => p.id === relatedId)
              if (!relatedProduct) return null
              
              // Add missing isInSale property for related products
              const relatedProductWithSale: Product = {
                ...relatedProduct,
                isInSale: Math.random() > 0.5
              }
              
              return (
                <ProductCard 
                  key={relatedId} 
                  product={convertToProductCardProps(relatedProductWithSale)} 
                />
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
