"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import Image from "next/image"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Link from "next/link"
import { useEffect } from "react"

// Mock order data
const orderItems = [
  {
    id: 1,
    name: "LCD Monitor",
    price: 650,
    image: "/iphone-banner.jpg",
  },
  {
    id: 2,
    name: "H1 Gamepad",
    price: 1100,
    image: "/iphone-banner.jpg",
  },
]

export default function CheckoutPage() {
  useEffect(() => {
    document.title = "Checkout | E-Store";
  }, []);

  const [formData, setFormData] = React.useState({
    firstName: "",
    companyName: "",
    streetAddress: "",
    apartment: "",
    townCity: "",
    phoneNumber: "",
    emailAddress: "",
    saveInfo: true,
  })
  const [paymentMethod, setPaymentMethod] = React.useState("cash")
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
    "HOLIDAY25": 25, // 25% off (max $150)
  }

  // Calculate totals
  const subtotal = orderItems.reduce((sum, item) => sum + item.price, 0)
  const shipping = 0 // Free shipping
  
  // Calculate discount
  const discount = appliedCoupon ? 
    appliedCoupon.code === "FLASH50" ? 
      Math.min(100, subtotal * 0.5) : // Max $100 for FLASH50
      subtotal * (appliedCoupon.discount / 100) : 
    0
  
  const total = subtotal + shipping - discount

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
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

  const handlePlaceOrder = () => {
    // Handle order placement logic here
    console.log("Placing order with:", { formData, paymentMethod, total, appliedCoupon })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-allowed mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-2 h-8 bg-red-500 rounded"></div>
            <div>
              <p className="text-sm text-red-600 font-medium">Checkout</p>
              <h1 className="text-3xl font-bold text-gray-900">Billing Details</h1>
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
                <BreadcrumbLink asChild>
                  <Link href="/cart">My Cart</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Checkout</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Section: Billing Details */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Billing Details</h2>
            
            <div className="space-y-6">
              {/* First Name */}
              <div>
                <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                  First Name*
                </Label>
                <Input
                  id="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  className="mt-1"
                  required
                />
              </div>

              {/* Company Name */}
              <div>
                <Label htmlFor="companyName" className="text-sm font-medium text-gray-700">
                  Company Name
                </Label>
                <Input
                  id="companyName"
                  type="text"
                  value={formData.companyName}
                  onChange={(e) => handleInputChange("companyName", e.target.value)}
                  className="mt-1"
                />
              </div>

              {/* Street Address */}
              <div>
                <Label htmlFor="streetAddress" className="text-sm font-medium text-gray-700">
                  Street Address*
                </Label>
                <Input
                  id="streetAddress"
                  type="text"
                  value={formData.streetAddress}
                  onChange={(e) => handleInputChange("streetAddress", e.target.value)}
                  className="mt-1"
                  required
                />
              </div>

              {/* Apartment */}
              <div>
                <Label htmlFor="apartment" className="text-sm font-medium text-gray-700">
                  Apartment, suite, etc. (optional)
                </Label>
                <Input
                  id="apartment"
                  type="text"
                  value={formData.apartment}
                  onChange={(e) => handleInputChange("apartment", e.target.value)}
                  className="mt-1"
                />
              </div>

              {/* Town/City */}
              <div>
                <Label htmlFor="townCity" className="text-sm font-medium text-gray-700">
                  Town/City*
                </Label>
                <Input
                  id="townCity"
                  type="text"
                  value={formData.townCity}
                  onChange={(e) => handleInputChange("townCity", e.target.value)}
                  className="mt-1"
                  required
                />
              </div>

              {/* Phone Number */}
              <div>
                <Label htmlFor="phoneNumber" className="text-sm font-medium text-gray-700">
                  Phone Number*
                </Label>
                <Input
                  id="phoneNumber"
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                  className="mt-1"
                  required
                />
              </div>

              {/* Email Address */}
              <div>
                <Label htmlFor="emailAddress" className="text-sm font-medium text-gray-700">
                  Email Address*
                </Label>
                <Input
                  id="emailAddress"
                  type="email"
                  value={formData.emailAddress}
                  onChange={(e) => handleInputChange("emailAddress", e.target.value)}
                  className="mt-1"
                  required
                />
              </div>

              {/* Save Information */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="saveInfo"
                  checked={formData.saveInfo}
                  onCheckedChange={(checked) => handleInputChange("saveInfo", checked as boolean)}
                />
                <Label htmlFor="saveInfo" className="text-sm text-gray-700">
                  Save this information for faster check-out next time
                </Label>
              </div>
            </div>
          </div>

          {/* Right Section: Order Summary & Payment */}
          <div className="space-y-6">
            {/* Order Summary */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
              
              {/* Order Items */}
              <div className="space-y-4 mb-6">
                {orderItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    <div className="w-16 h-16 relative rounded-lg overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{item.name}</h4>
                      <p className="text-sm text-gray-600">Qty: 1</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">${item.price.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Totals */}
              <div className="space-y-2 border-t border-gray-200 pt-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping:</span>
                  <span className="font-medium text-green-600">Free</span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between">
                    <span>Discount ({appliedCoupon.code}):</span>
                    <span className="font-medium text-green-600">-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-bold border-t border-gray-200 pt-2">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Method</h3>
              
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                <div className="space-y-4">
                  {/* Credit Card Option */}
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card" className="flex items-center gap-3">
                      Credit Card
                      <div className="flex gap-1">
                        <div className="w-8 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">
                          VISA
                        </div>
                        <div className="w-8 h-5 bg-orange-500 rounded text-white text-xs flex items-center justify-center font-bold">
                          MC
                        </div>
                        <div className="w-8 h-5 bg-orange-600 rounded text-white text-xs flex items-center justify-center font-bold">
                          NGD
                        </div>
                      </div>
                    </Label>
                  </div>

                  {/* Cash on Delivery Option */}
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="cash" id="cash" />
                    <Label htmlFor="cash">Cash on delivery</Label>
                  </div>
                </div>
              </RadioGroup>
            </div>

            {/* Coupon Code */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Coupon Code</h3>
              
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
                  placeholder="Enter coupon code"
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
                  <span>HOLIDAY25 - 25% off</span>
                  <span>FREESHIP - Free shipping</span>
                </div>
                <div className="mt-2">
                  <a href="/coupons" className="text-red-500 hover:text-red-600 text-xs font-medium">
                    View all available coupons →
                  </a>
                </div>
              </div>
            </div>

            {/* Place Order Button */}
            <Button 
              onClick={handlePlaceOrder}
              className="w-full bg-red-500 hover:bg-red-600 text-white py-4 text-lg font-semibold"
            >
              Place Order
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
} 