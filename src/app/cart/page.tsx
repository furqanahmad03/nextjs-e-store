"use client"

import * as React from "react"
import { X, Minus, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import Link from "next/link"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { useEffect } from "react"

// Mock cart data
const cartItems = [
  {
    id: 1,
    name: "LCD Monitor",
    price: 650,
    quantity: 1,
    image: "/iphone-banner.jpg",
  },
  {
    id: 2,
    name: "H1 Gamepad",
    price: 550,
    quantity: 2,
    image: "/iphone-banner.jpg",
  },
]

export default function CartPage() {
  useEffect(() => {
    document.title = "Cart | E-Store";
  }, []);

  const [items, setItems] = React.useState(cartItems)
  const [couponCode, setCouponCode] = React.useState("")
  const [appliedCoupon, setAppliedCoupon] = React.useState<{ code: string; discount: number } | null>(null)
  const [couponMessage, setCouponMessage] = React.useState("")

  // Sample coupon codes
  const validCoupons = {
    "SAVE10": 10, // 10% off
    "SAVE20": 20, // 20% off
    "FREESHIP": 0, // Free shipping (already free)
    "WELCOME": 15, // 15% off
    "FLASH50": 50, // 50% off (max $100)
  }

  // Calculate totals
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const shipping = 0 // Free shipping
  
  // Calculate discount
  const discount = appliedCoupon ? 
    appliedCoupon.code === "FLASH50" ? 
      Math.min(50, subtotal * 0.5) : // Max $100 for FLASH50
      subtotal * (appliedCoupon.discount / 100) : 
    0
  
  const total = subtotal + shipping - discount

  // Update quantity
  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return
    setItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    )
  }

  // Remove item
  const removeItem = (id: number) => {
    setItems(prev => prev.filter(item => item.id !== id))
  }

  // Apply coupon
  const applyCoupon = () => {
    const code = couponCode.toUpperCase().trim()
    
    if (!code) {
      setCouponMessage("Please enter a coupon code")
      return
    }

    if (appliedCoupon) {
      setCouponMessage("A coupon is already applied. Remove it first to apply a new one.")
      return
    }

    if (validCoupons[code as keyof typeof validCoupons] !== undefined) {
      const discountPercent = validCoupons[code as keyof typeof validCoupons]
      setAppliedCoupon({ code, discount: discountPercent })
      setCouponMessage(`Coupon "${code}" applied successfully! ${discountPercent}% discount.`)
      setCouponCode("")
    } else {
      setCouponMessage("Invalid coupon code. Please try again.")
    }
  }

  // Remove coupon
  const removeCoupon = () => {
    setAppliedCoupon(null)
    setCouponMessage("Coupon removed successfully!")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-allowed mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-2 h-8 bg-red-500 rounded"></div>
            <div>
              <p className="text-sm text-red-600 font-medium">Cart</p>
              <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
            </div>
          </div>
          
          {/* Breadcrumb */}
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
                  <Link href="/account">My Account</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/account/orders">My Orders</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>My Cart</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {items.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                {/* Table Header */}
                <div className="grid grid-cols-12 gap-4 p-6 border-b border-gray-200 font-semibold text-gray-900">
                  <div className="col-span-6">Product</div>
                  <div className="col-span-2 text-center">Price</div>
                  <div className="col-span-2 text-center">Quantity</div>
                  <div className="col-span-2 text-center">Subtotal</div>
                </div>

                {/* Cart Items */}
                {items.map((item) => (
                  <div key={item.id} className="grid grid-cols-12 gap-4 p-6 border-b border-gray-100 items-center">
                    {/* Product */}
                    <div className="col-span-6 flex items-center gap-4">
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                        <button
                          onClick={() => removeItem(item.id)}
                          className="absolute top-0 left-0 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                      <span className="font-medium text-gray-900">{item.name}</span>
                    </div>

                    {/* Price */}
                    <div className="col-span-2 text-center text-gray-600">
                      ${item.price}
                    </div>

                    {/* Quantity */}
                    <div className="col-span-2 flex items-center justify-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <Input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                        className="w-16 text-center"
                        min="1"
                      />
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Subtotal */}
                    <div className="col-span-2 text-center font-semibold text-gray-900">
                      ${item.price * item.quantity}
                    </div>
                  </div>
                ))}

                {/* Cart Actions */}
                <div className="p-6 flex justify-between items-center">
                  <Button variant="outline" className="border-black text-black hover:bg-black hover:text-white">
                    Return To Shop
                  </Button>
                  <Button variant="outline" className="border-black text-black hover:bg-black hover:text-white">
                    Update Cart
                  </Button>
                </div>
              </div>

              {/* Coupon Section */}
              <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Apply Coupon</h3>
                
                {/* Coupon Message */}
                {couponMessage && (
                  <div className={`mb-4 p-3 rounded-md text-sm ${
                    couponMessage.includes("successfully") 
                      ? "bg-green-100 text-green-700 border border-green-200" 
                      : "bg-red-100 text-red-700 border border-red-200"
                  }`}>
                    {couponMessage}
                  </div>
                )}

                {/* Applied Coupon Display */}
                {appliedCoupon && (
                  <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-medium text-green-800">Applied: {appliedCoupon.code}</span>
                        <span className="text-green-600 ml-2">({appliedCoupon.discount}% off)</span>
                      </div>
                      <button
                        onClick={removeCoupon}
                        className="text-red-500 hover:text-red-700 text-sm font-medium"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                )}

                <div className="flex gap-4">
                  <Input
                    type="text"
                    placeholder="Coupon Code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1"
                    disabled={!!appliedCoupon}
                  />
                  <Button 
                    onClick={applyCoupon}
                    className="bg-red-500 hover:bg-red-600 text-white"
                    disabled={!!appliedCoupon}
                  >
                    Apply Coupon
                  </Button>
                </div>

                {/* Available Coupons Hint */}
                <div className="mt-4 text-sm text-gray-500">
                  <p className="font-medium mb-2">Available coupon codes:</p>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <span>SAVE10 - 10% off</span>
                    <span>SAVE20 - 20% off</span>
                    <span>WELCOME - 15% off</span>
                    <span>FLASH50 - 50% off (max $100)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Cart Total */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Cart Total</h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal:</span>
                    <span>${subtotal}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping:</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  {appliedCoupon && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount ({appliedCoupon.code}):</span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="border-t border-gray-200 pt-4 flex justify-between font-bold text-lg text-gray-900">
                    <span>Total:</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                <Link href="/cart/checkout">
                  <Button className="w-full bg-red-500 hover:bg-red-600 text-white py-3 text-lg font-semibold">
                    Proceed to checkout
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ) : (
          /* Empty Cart */
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🛒</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Your cart is empty</h3>
            <p className="text-gray-600 mb-6">Looks like you haven't added any items to your cart yet.</p>
            <Button asChild className="bg-red-500 hover:bg-red-600 text-white">
              <Link href="/products">Continue Shopping</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
