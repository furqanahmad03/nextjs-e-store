"use client"

import React, { useState } from "react"
import { useCart, CartItem } from "@/contexts/CartContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Trash2, Minus, Plus, ShoppingCart, RefreshCw } from "lucide-react"
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
import { toast } from "sonner"
import { useTranslations } from "next-intl"
import { usePathname } from "next/navigation"

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, getCartTotal, clearCart } = useCart()
  const [updatingItems, setUpdatingItems] = useState<Set<number>>(new Set())
  const [tempQuantities, setTempQuantities] = useState<Record<number, number | string>>({})
  const t = useTranslations('cart')
  const pathname = usePathname()
  
  // Extract current language from pathname
  const currentLang = pathname.split('/')[1] || 'en'

  // Initialize temp quantities when items change
  React.useEffect(() => {
    console.log('Items changed, initializing tempQuantities:', items)
    const initialQuantities: Record<number, number> = {}
    items.forEach(item => {
      initialQuantities[item.id] = item.quantity
    })
    console.log('Setting tempQuantities to:', initialQuantities)
    setTempQuantities(initialQuantities)
  }, [items])

  const handleQuantityChange = async (productId: number, newQuantity: number) => {
    try {
      setUpdatingItems(prev => new Set(prev).add(productId))
      await updateQuantity(productId, newQuantity)
    } catch (error) {
      console.error('Error updating quantity:', error)
      toast.error(t('failedToUpdateQuantity'))
    } finally {
      setUpdatingItems(prev => {
        const newSet = new Set(prev)
        newSet.delete(productId)
        return newSet
      })
    }
  }

  const handleTempQuantityChange = (productId: number, value: string) => {
    console.log('handleTempQuantityChange called:', { productId, value })
    
    // Allow empty string for better UX
    if (value === '') {
      setTempQuantities(prev => ({
        ...prev,
        [productId]: ''
      }))
      return
    }

    const numValue = parseInt(value)
    if (isNaN(numValue)) {
      console.log('Invalid number value:', value)
      return
    }

    const item = items.find(item => item.id === productId)
    if (!item) {
      console.log('Item not found for productId:', productId)
      return
    }

    // Ensure the value doesn't exceed stock and is at least 1
    const validQuantity = Math.min(Math.max(1, numValue), item.stock)
    console.log('Setting valid quantity:', { productId, validQuantity, originalValue: numValue, stock: item.stock })
    
    setTempQuantities(prev => ({
      ...prev,
      [productId]: validQuantity
    }))
  }

  const handleUpdateQuantity = async (productId: number) => {
    const tempQty = tempQuantities[productId]
    const newQuantity = typeof tempQty === 'string' ? 1 : (tempQty || 1)
    const item = items.find(item => item.id === productId)
    
    console.log('handleUpdateQuantity called:', { productId, newQuantity, item })
    
    if (!item) {
      console.log('Item not found')
      return
    }

    // Validate against actual stock
    if (newQuantity > item.stock) {
      toast.error(`${t('maxAvailableQuantity')} ${item.stock}`)
      // Reset to current quantity
      setTempQuantities(prev => ({
        ...prev,
        [productId]: item.quantity
      }))
      return
    }

    if (newQuantity === item.quantity) {
      toast.info(t('quantityAlreadyUpToDate'))
      return
    }

    console.log('Calling handleQuantityChange with:', { productId, newQuantity })
    await handleQuantityChange(productId, newQuantity)
  }

  const handleRemoveItem = async (productId: number) => {
    try {
      await removeFromCart(productId)
    } catch (error) {
      console.error('Error removing item:', error)
    }
  }

  const handleClearCart = () => {
    clearCart()
  }

  if (items.length === 0) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-allowed mx-auto px-4 py-8">
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
                <BreadcrumbPage>{t('cart')}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* Empty Cart */}
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingCart className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('yourCartIsEmpty')}</h2>
            <p className="text-gray-600 mb-8">{t('emptyCartMessage')}</p>
            <Link href={`/${currentLang}/products`}>
              <Button className="bg-red-500 hover:bg-red-600 text-white">
                {t('startShopping')}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-allowed mx-auto px-4 py-8">
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
              <BreadcrumbPage>{t('cart')}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{t('shoppingCart')}</h1>
            <p className="text-gray-600 mt-2">
              {items.length} {items.length !== 1 ? t('itemsInCart') : t('itemInCart')}
            </p>
          </div>
          <Button
            onClick={handleClearCart}
            variant="outline"
            className="text-red-600 border-red-600 hover:bg-red-50 w-full sm:w-auto"
          >
            {t('clearCart')}
          </Button>
        </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-4 sm:p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">{t('cartItems')}</h2>
                <div className="space-y-4 sm:space-y-6">
                {items.map((item) => (
                    <div key={item.id} className="border border-gray-100 rounded-lg p-4">
                      {/* Mobile Layout - Stacked */}
                      <div className="block sm:hidden">
                        {/* Product Image and Info Row */}
                        <div className="flex items-start gap-3 mb-4">
                          <div className="relative w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-gray-900 text-sm">{item.name}</h3>
                            <p className="text-gray-600 text-sm">${(item.price || 0).toFixed(2)}</p>
                            <p className="text-xs text-gray-500 mt-1">{t('maxAvailable')}: {item.stock}</p>
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleRemoveItem(item.id)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50 p-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>

                        {/* Quantity Controls Row */}
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                const currentQty = tempQuantities[item.id] !== undefined ? tempQuantities[item.id] : item.quantity
                                const currentQtyNum = typeof currentQty === 'string' ? item.quantity : currentQty
                                const newQty = Math.max(1, currentQtyNum - 1)
                                setTempQuantities(prev => ({ ...prev, [item.id]: newQty }))
                              }}
                              disabled={updatingItems.has(item.id)}
                              className="w-8 h-8 p-0"
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <Input
                              type="number"
                              value={tempQuantities[item.id] !== undefined && tempQuantities[item.id] !== '' ? tempQuantities[item.id] : item.quantity}
                              onChange={(e) => handleTempQuantityChange(item.id, e.target.value)}
                              className="w-16 text-center"
                              min="1"
                              max={item.stock} 
                              disabled={updatingItems.has(item.id)} 
                            />
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                const currentQty = tempQuantities[item.id] !== undefined ? tempQuantities[item.id] : item.quantity
                                const currentQtyNum = typeof currentQty === 'string' ? item.quantity : currentQty
                                const newQty = Math.min(item.stock, currentQtyNum + 1)
                                setTempQuantities(prev => ({ ...prev, [item.id]: newQty }))
                              }}
                              disabled={updatingItems.has(item.id)}
                              className="w-8 h-8 p-0"
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>
                          <Button
                            size="sm"
                            onClick={() => handleUpdateQuantity(item.id)}
                            disabled={updatingItems.has(item.id) || (tempQuantities[item.id] !== undefined ? tempQuantities[item.id] : item.quantity) === item.quantity}
                            className="px-3"
                          >
                            {updatingItems.has(item.id) ? (
                              <RefreshCw className="w-3 h-3 animate-spin" />
                            ) : (
                              t('update')
                            )}
                          </Button>
                        </div>

                        {/* Total Price Row */}
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">{t('total')}:</span>
                          <p className="font-semibold text-gray-900">${(item.total || 0).toFixed(2)}</p>
                        </div>
                      </div>

                      {/* Desktop Layout - Horizontal */}
                      <div className="hidden sm:flex items-center gap-4">
                      {/* Product Image */}
                      <div className="relative w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                    </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-900 truncate">{item.name}</h3>
                        <p className="text-gray-600 text-sm">${(item.price || 0).toFixed(2)}</p>
                        <p className="text-xs text-gray-500 mt-1">{t('maxAvailable')}: {item.stock}</p>
                    </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            const currentQty = tempQuantities[item.id] !== undefined ? tempQuantities[item.id] : item.quantity
                            const currentQtyNum = typeof currentQty === 'string' ? item.quantity : currentQty
                            const newQty = Math.max(1, currentQtyNum - 1)
                            setTempQuantities(prev => ({ ...prev, [item.id]: newQty }))
                          }}
                          disabled={updatingItems.has(item.id)}
                          className="w-8 h-8 p-0"
                      >
                        <Minus className="w-3 h-3" />
                        </Button>
                      <Input
                        type="number"
                          value={tempQuantities[item.id] !== undefined && tempQuantities[item.id] !== '' ? tempQuantities[item.id] : item.quantity}
                          onChange={(e) => handleTempQuantityChange(item.id, e.target.value)}
                        className="w-16 text-center"
                        min="1"
                          max={item.stock} 
                          disabled={updatingItems.has(item.id)} 
                        />
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            const currentQty = tempQuantities[item.id] !== undefined ? tempQuantities[item.id] : item.quantity
                            const currentQtyNum = typeof currentQty === 'string' ? item.quantity : currentQty
                            const newQty = Math.min(item.stock, currentQtyNum + 1)
                            setTempQuantities(prev => ({ ...prev, [item.id]: newQty }))
                          }}
                          disabled={updatingItems.has(item.id)}
                          className="w-8 h-8 p-0"
                      >
                        <Plus className="w-3 h-3" />
                        </Button>
                        
                        {/* Update Button */}
                        <Button
                          size="sm"
                          onClick={() => handleUpdateQuantity(item.id)}
                          disabled={updatingItems.has(item.id) || (tempQuantities[item.id] !== undefined ? tempQuantities[item.id] : item.quantity) === item.quantity}
                          className="ml-2 px-3"
                        >
                          {updatingItems.has(item.id) ? (
                            <RefreshCw className="w-3 h-3 animate-spin" />
                          ) : (
                            t('update')
                          )}
                  </Button>
                </div>

                      {/* Total Price */}
                      <div className="text-right min-w-0">
                        <p className="font-semibold text-gray-900">${(item.total || 0).toFixed(2)}</p>
                      </div>

                      {/* Remove Button */}
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                      </div>
                    </div>
                  ))}
                </div>
                </div>
              </div>
            </div>

          {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 sticky top-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">{t('orderSummary')}</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{t('subtotal')} ({items.length} items)</span>
                  <span className="font-medium">${getCartTotal().toFixed(2)}</span>
                  </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{t('shipping')}</span>
                  <span className="font-medium text-green-600">{t('free')}</span>
                  </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{t('tax')}</span>
                  <span className="font-medium">${(getCartTotal() * 0.1).toFixed(2)}</span>
                    </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>{t('total')}</span>
                    <span>${(getCartTotal() * 1.1).toFixed(2)}</span>
                  </div>
                  </div>
                </div>

              <div className="space-y-3">
                <Link href={`/${currentLang}/cart/checkout`} className="w-full block">
                  <Button className="w-full bg-red-500 hover:bg-red-600 text-white">
                    {t('proceedToCheckout')}
                  </Button>
                </Link>
                <Link href={`/${currentLang}/products`} className="w-full">
                  <Button variant="outline" className="w-full">
                    {t('continueShopping')}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          </div>
      </div>
    </div>
  )
}
