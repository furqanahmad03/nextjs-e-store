"use client"

import React, { useState } from "react"
import { useCart } from "@/contexts/CartContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, CreditCard, Truck, MapPin, Package, ShoppingBag, Receipt, Shield, Clock, CheckCircle } from "lucide-react"
import Link from "next/link"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { toast } from "sonner"
import Image from "next/image"
import { useTranslations } from "next-intl"
import { usePathname, useRouter } from "next/navigation"

interface CheckoutForm {
  // Shipping Information
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  zipCode: string
  country: string
  
  // Billing Information
  sameAsShipping: boolean
  billingFirstName: string
  billingLastName: string
  billingAddress: string
  billingCity: string
  billingState: string
  billingZipCode: string
  billingCountry: string
  
  // Payment Information
  paymentMethod: 'card' | 'paypal' | 'cod'
  cardNumber: string
  cardName: string
  expiryMonth: string
  expiryYear: string
  cvv: string
}

export default function CheckoutPage() {
  const { items, getCartTotal, createOrder } = useCart()
  const [isProcessing, setIsProcessing] = useState(false)
  const t = useTranslations('checkout')
  const pathname = usePathname()
  const router = useRouter()
  // Extract current language from pathname
  const currentLang = pathname.split('/')[1] || 'en'
  
  const [formData, setFormData] = useState<CheckoutForm>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
    sameAsShipping: true,
    billingFirstName: "",
    billingLastName: "",
    billingAddress: "",
    billingCity: "",
    billingState: "",
    billingZipCode: "",
    billingCountry: "United States",
    paymentMethod: 'card',
    cardNumber: "",
    cardName: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
  })

  const handleInputChange = (field: keyof CheckoutForm, value: string | boolean) => {
    // For payment method changes, update immediately without complex logic
    if (field === 'paymentMethod') {
      setFormData(prev => ({
        ...prev,
        [field]: value as 'card' | 'paypal' | 'cod'
      }))
      return
    }

    setFormData(prev => ({
      ...prev,
      [field]: value
    }))

    // Auto-fill billing if same as shipping
    if (field === 'sameAsShipping' && value === true) {
      setFormData(prev => ({
        ...prev,
        billingFirstName: prev.firstName,
        billingLastName: prev.lastName,
        billingAddress: prev.address,
        billingCity: prev.city,
        billingState: prev.state,
        billingZipCode: prev.zipCode,
        billingCountry: prev.country,
      }))
    }
  }

  const validateForm = (): boolean => {
    const requiredFields = [
      'firstName', 'lastName', 'email', 'phone', 'address', 
      'city', 'state', 'zipCode', 'country'
    ]

    for (const field of requiredFields) {
      if (!formData[field as keyof CheckoutForm]) {
        toast.error(`Please fill in ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`)
        return false
      }
    }

    if (!formData.sameAsShipping) {
      const billingFields = [
        'billingFirstName', 'billingLastName', 'billingAddress',
        'billingCity', 'billingState', 'billingZipCode', 'billingCountry'
      ]
      for (const field of billingFields) {
        if (!formData[field as keyof CheckoutForm]) {
          toast.error(`Please fill in billing ${field.replace('billing', '').replace(/([A-Z])/g, ' $1').toLowerCase()}`)
          return false
        }
      }
    }

    // Validate payment method specific fields
    if (formData.paymentMethod === 'card') {
      if (!formData.cardNumber || !formData.cardName || !formData.expiryMonth || 
          !formData.expiryYear || !formData.cvv) {
        toast.error('Please fill in all credit card information')
        return false
      }
    }

    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsProcessing(true)
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Create order data
      const orderData = {
        items: items.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          image: item.image,
          quantity: item.quantity,
          total: item.total
        })),
        total: total,
        shippingAddress: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          country: formData.country,
        },
        billingAddress: {
          firstName: formData.sameAsShipping ? formData.firstName : formData.billingFirstName,
          lastName: formData.sameAsShipping ? formData.lastName : formData.billingLastName,
          address: formData.sameAsShipping ? formData.address : formData.billingAddress,
          city: formData.sameAsShipping ? formData.city : formData.billingCity,
          state: formData.sameAsShipping ? formData.state : formData.billingState,
          zipCode: formData.sameAsShipping ? formData.zipCode : formData.billingZipCode,
          country: formData.sameAsShipping ? formData.country : formData.billingCountry,
        },
        paymentMethod: formData.paymentMethod,
      }

      // Create the order
      createOrder(orderData)
      
      // Redirect to orders page
      // window.location.href = `/${currentLang}/account/orders`
      router.push(`/${currentLang}/account/orders`);
    } catch (error) {
      toast.error('Failed to process order. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  if (items.length === 0) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-allowed mx-auto px-4 py-8">
          <Breadcrumb className="mb-8">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href={`/${currentLang}`}>{t('home')}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href={`/${currentLang}/cart`}>{t('cart')}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{t('title')}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="text-center py-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('yourCartIsEmpty')}</h2>
            <p className="text-gray-600 mb-8">{t('addItemsToCart')}</p>
            <Link href={`/${currentLang}/products`}>
              <Button className="bg-red-500 hover:bg-red-600 text-white">
                {t('continueShopping')}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const subtotal = getCartTotal()
  const shipping = 0 // Free shipping
  const tax = subtotal * 0.1
  const codFee = formData.paymentMethod === 'cod' ? 5 : 0
  const total = subtotal + shipping + tax + codFee

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <Breadcrumb className="mb-8">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={`/${currentLang}`}>{t('home')}</Link>
              </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                <Link href={`/${currentLang}/cart`}>{t('cart')}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{t('title')}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href={`/${currentLang}/cart`}>
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t('backToCart')}
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{t('title')}</h1>
            <p className="text-gray-600 mt-1">{t('description')}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Shipping Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="w-5 h-5" />
                  {t('shippingInformation')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                    <Label htmlFor="firstName">{t('firstName')} *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">{t('lastName')} *</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                  required
                />
                  </div>
              </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">{t('email')} *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      required
                    />
                  </div>
              <div>
                    <Label htmlFor="phone">{t('phone')} *</Label>
                <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      required
                    />
                  </div>
              </div>

              <div>
                  <Label htmlFor="address">{t('address')} *</Label>
                <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                  required
                />
              </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                    <Label htmlFor="city">{t('city')} *</Label>
                <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      required
                />
              </div>
              <div>
                    <Label htmlFor="state">{t('state')} *</Label>
                <Input
                      id="state"
                      value={formData.state}
                      onChange={(e) => handleInputChange('state', e.target.value)}
                  required
                />
              </div>
              <div>
                    <Label htmlFor="zipCode">{t('zipCode')} *</Label>
                <Input
                      id="zipCode"
                      value={formData.zipCode}
                      onChange={(e) => handleInputChange('zipCode', e.target.value)}
                  required
                />
                  </div>
              </div>

              <div>
                  <Label htmlFor="country">{t('country')} *</Label>
                <Input
                    id="country"
                    value={formData.country}
                    onChange={(e) => handleInputChange('country', e.target.value)}
                  required
                />
              </div>
            </CardContent>
          </Card>

            {/* Billing Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  {t('billingInformation')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                    id="sameAsShipping"
                    checked={formData.sameAsShipping}
                    onCheckedChange={(checked) => handleInputChange('sameAsShipping', checked as boolean)}
                  />
                  <Label htmlFor="sameAsShipping">{t('sameAsShipping')}</Label>
                </div>

                {!formData.sameAsShipping && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="billingFirstName">{t('billingFirstName')} *</Label>
                        <Input
                          id="billingFirstName"
                          value={formData.billingFirstName}
                          onChange={(e) => handleInputChange('billingFirstName', e.target.value)}
                          required={!formData.sameAsShipping}
                        />
              </div>
                      <div>
                        <Label htmlFor="billingLastName">{t('billingLastName')} *</Label>
                        <Input
                          id="billingLastName"
                          value={formData.billingLastName}
                          onChange={(e) => handleInputChange('billingLastName', e.target.value)}
                          required={!formData.sameAsShipping}
                        />
            </div>
          </div>

                    <div>
                      <Label htmlFor="billingAddress">{t('billingAddress')} *</Label>
                      <Input
                        id="billingAddress"
                        value={formData.billingAddress}
                        onChange={(e) => handleInputChange('billingAddress', e.target.value)}
                        required={!formData.sameAsShipping}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="billingCity">{t('billingCity')} *</Label>
                        <Input
                          id="billingCity"
                          value={formData.billingCity}
                          onChange={(e) => handleInputChange('billingCity', e.target.value)}
                          required={!formData.sameAsShipping}
                        />
                      </div>
                      <div>
                        <Label htmlFor="billingState">{t('billingState')} *</Label>
                        <Input
                          id="billingState"
                          value={formData.billingState}
                          onChange={(e) => handleInputChange('billingState', e.target.value)}
                          required={!formData.sameAsShipping}
                        />
                      </div>
                      <div>
                        <Label htmlFor="billingZipCode">{t('billingZipCode')} *</Label>
                        <Input
                          id="billingZipCode"
                          value={formData.billingZipCode}
                          onChange={(e) => handleInputChange('billingZipCode', e.target.value)}
                          required={!formData.sameAsShipping}
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="billingCountry">{t('billingCountry')} *</Label>
                      <Input
                        id="billingCountry"
                        value={formData.billingCountry}
                        onChange={(e) => handleInputChange('billingCountry', e.target.value)}
                        required={!formData.sameAsShipping}
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Payment Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  {t('paymentMethod')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Payment Method Selection */}
                <div className="space-y-4">
                  <Label className="text-base font-medium">{t('paymentMethod')}</Label>
                  
                  {/* Credit Card Option */}
                  <div className={`border-2 rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                    formData.paymentMethod === 'card' 
                      ? 'border-red-500 bg-red-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`} onClick={() => handleInputChange('paymentMethod', 'card')}>
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        id="card"
                        name="paymentMethod"
                        value="card"
                        checked={formData.paymentMethod === 'card'}
                        onChange={() => {}} // Handled by onClick
                        className="w-4 h-4 text-red-500"
                      />
                      <div className="flex items-center gap-3 flex-1">
                        <div className="w-10 h-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded flex items-center justify-center">
                          <CreditCard className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <Label htmlFor="card" className="font-medium cursor-pointer">{t('creditCard')}</Label>
                          <p className="text-sm text-gray-500">Visa, Mastercard, American Express</p>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <div className="w-8 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">VISA</div>
                        <div className="w-8 h-5 bg-orange-500 rounded text-white text-xs flex items-center justify-center font-bold">MC</div>
                        <div className="w-8 h-5 bg-blue-800 rounded text-white text-xs flex items-center justify-center font-bold">AMEX</div>
                      </div>
                    </div>
                        </div>

                  {/* PayPal Option */}
                  <div className={`border-2 rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                    formData.paymentMethod === 'paypal' 
                      ? 'border-red-500 bg-red-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`} onClick={() => handleInputChange('paymentMethod', 'paypal')}>
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        id="paypal"
                        name="paymentMethod"
                        value="paypal"
                        checked={formData.paymentMethod === 'paypal'}
                        onChange={() => {}} // Handled by onClick
                        className="w-4 h-4 text-red-500"
                      />
                      <div className="flex items-center gap-3 flex-1">
                        <div className="w-10 h-6 bg-blue-500 rounded flex items-center justify-center">
                          <span className="text-white font-bold text-xs">PayPal</span>
                        </div>
                        <div>
                          <Label htmlFor="paypal" className="font-medium cursor-pointer">{t('paypal')}</Label>
                          <p className="text-sm text-gray-500">Pay with your PayPal account</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Cash on Delivery Option */}
                  <div className={`border-2 rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                    formData.paymentMethod === 'cod' 
                      ? 'border-red-500 bg-red-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`} onClick={() => handleInputChange('paymentMethod', 'cod')}>
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        id="cod"
                        name="paymentMethod"
                        value="cod"
                        checked={formData.paymentMethod === 'cod'}
                        onChange={() => {}} // Handled by onClick
                        className="w-4 h-4 text-red-500"
                      />
                      <div className="flex items-center gap-3 flex-1">
                        <div className="w-10 h-6 bg-green-600 rounded flex items-center justify-center">
                          <span className="text-white font-bold text-xs">COD</span>
                        </div>
                        <div>
                          <Label htmlFor="cod" className="font-medium cursor-pointer">{t('cashOnDelivery')}</Label>
                          <p className="text-sm text-gray-500">Pay when you receive your order</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Credit Card Details - Only show when card is selected */}
                {formData.paymentMethod === 'card' && (
                  <div className="space-y-4 border-t pt-6">
                    <Label className="text-base font-medium">Card Details</Label>
                    
                    <div>
                      <Label htmlFor="cardName">Name on Card *</Label>
                      <Input
                        id="cardName"
                        value={formData.cardName}
                        onChange={(e) => handleInputChange('cardName', e.target.value)}
                        placeholder="John Doe"
                        required={formData.paymentMethod === 'card'}
                      />
            </div>

                    <div>
                      <Label htmlFor="cardNumber">Card Number *</Label>
                      <Input
                        id="cardNumber"
                        value={formData.cardNumber}
                        onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                        required={formData.paymentMethod === 'card'}
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="expiryMonth">Month *</Label>
                        <Input
                          id="expiryMonth"
                          value={formData.expiryMonth}
                          onChange={(e) => handleInputChange('expiryMonth', e.target.value)}
                          placeholder="MM"
                          maxLength={2}
                          required={formData.paymentMethod === 'card'}
                        />
                      </div>
                      <div>
                        <Label htmlFor="expiryYear">Year *</Label>
                        <Input
                          id="expiryYear"
                          value={formData.expiryYear}
                          onChange={(e) => handleInputChange('expiryYear', e.target.value)}
                          placeholder="YY"
                          maxLength={2}
                          required={formData.paymentMethod === 'card'}
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV *</Label>
                        <Input
                          id="cvv"
                          value={formData.cvv}
                          onChange={(e) => handleInputChange('cvv', e.target.value)}
                          placeholder="123"
                          maxLength={4}
                          required={formData.paymentMethod === 'card'}
                        />
                      </div>
                    </div>
                </div>
              )}

                {/* PayPal Info - Only show when PayPal is selected */}
                {formData.paymentMethod === 'paypal' && (
                  <div className="border-t pt-6">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-xs">P</span>
                        </div>
                    <div>
                          <p className="font-medium text-blue-900">PayPal Payment</p>
                          <p className="text-sm text-blue-700">You will be redirected to PayPal to complete your payment after placing the order.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Cash on Delivery Info - Only show when COD is selected */}
                {formData.paymentMethod === 'cod' && (
                  <div className="border-t pt-6">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-xs">$</span>
                        </div>
                        <div>
                          <p className="font-medium text-green-900">Cash on Delivery</p>
                          <p className="text-sm text-green-700">Pay with cash when your order is delivered. Additional $5.00 fee applies.</p>
                        </div>
                      </div>
                  </div>
                </div>
              )}
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8 border-2 border-gray-100 shadow-lg pt-0">
              <CardHeader className="bg-gradient-to-r from-red-50 to-orange-50 p-6 border-b border-gray-200">
                <CardTitle className="flex items-center gap-2 text-gray-800">
                  <ShoppingBag className="w-5 h-5 text-red-500" />
                  {t('orderSummary')}
                  <span className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                    {items.length} {items.length === 1 ? t('item') : t('items')}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {/* Items List */}
                <div className="p-6 border-b border-gray-100">
                  <div className="space-y-4 max-h-64 overflow-y-auto">
                    {items.map((item) => (
                      <div key={item.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                        {/* Product Image */}
                        <div className="relative w-12 h-12 bg-white rounded-md overflow-hidden border border-gray-200 flex-shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
              </div>

                        {/* Product Details */}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm text-gray-900 truncate">{item.name}</h4>
                          <div className="flex items-center justify-between mt-1">
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded-full">
                                Qty: {item.quantity}
                              </span>
                              <span className="text-xs text-gray-500">×</span>
                              <span className="text-sm font-medium text-gray-700">${item.price.toFixed(2)}</span>
                            </div>
                            <span className="font-semibold text-gray-900">${item.total.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="p-6 bg-gray-50">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2 text-gray-600">
                        <Receipt className="w-4 h-4" />
                        {t('subtotal')}
                      </span>
                      <span className="font-medium">${subtotal.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2 text-gray-600">
                        <Truck className="w-4 h-4 text-green-500" />
                        {t('shipping')}
                      </span>
                      <span className="font-medium text-green-600 flex items-center gap-1">
                        <CheckCircle className="w-4 h-4" />
                        {t('free')}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2 text-gray-600">
                        <Package className="w-4 h-4" />
                        {t('tax')}
                      </span>
                      <span className="font-medium">${tax.toFixed(2)}</span>
                    </div>
                    
                    {formData.paymentMethod === 'cod' && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-2 text-gray-600">
                          <Shield className="w-4 h-4 text-green-500" />
                          {t('codFee')}
                        </span>
                        <span className="font-medium">${codFee.toFixed(2)}</span>
                      </div>
                    )}
                    
                    <div className="border-t border-gray-300 pt-3">
                      <div className="flex items-center justify-between text-lg font-bold text-gray-900">
                        <span className="flex items-center gap-2">
                          <Shield className="w-5 h-5 text-red-500" />
                          {t('total')}
                        </span>
                        <span className="text-xl">${total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order Benefits */}
                <div className="p-6 bg-white border-t border-gray-100">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <Shield className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{t('secureCheckout')}</p>
                        <p className="text-xs text-gray-500">{t('secureCheckoutDescription')}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <Clock className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{t('orderConfirmation')}</p>
                        <p className="text-xs text-gray-500">{t('orderConfirmationDescription')}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-purple-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{t('needHelp')}</p>
                        <p className="text-xs text-gray-500">{t('contactSupportDescription')}</p>
                      </div>
                </div>
              </div>
            </div>

            {/* Place Order Button */}
                <div className="p-6 bg-white border-t border-gray-100">
            <Button 
                    type="submit"
                    className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-200"
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        {t('processing')}
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <CreditCard className="w-5 h-5" />
                        {t('placeOrder')} - ${total.toFixed(2)}
                      </div>
                    )}
            </Button>
                  
                  <p className="text-xs text-gray-500 text-center mt-3">
                    {t('agreementText')}{' '}
                    <Link href={`/${currentLang}/terms`} className="text-red-500 hover:text-red-600 underline">
                      {t('termsOfService')}
                    </Link>
                    {' '}{t('and')}{' '}
                    <Link href={`/${currentLang}/privacy`} className="text-red-500 hover:text-red-600 underline">
                      {t('privacyPolicy')}
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </form>
      </div>
    </div>
  )
} 