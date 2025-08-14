"use client"

import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { 
  Package, 
  RotateCcw, 
  Calendar,
  Eye,
  AlertCircle,
  MapPin,
  CreditCard,
  Link
} from "lucide-react"
import AccountLayout from "@/components/AccountLayout"
import { useTranslations } from "next-intl"
import { usePathname } from "next/navigation"

interface Product {
  id: number
  name: string
  description: string
  price: number
  category: string
  subcategory: string
  image: string
  images: string[]
  date_added: string
  brand: string
  rating: number
  stock: number
  isSale: boolean
}

interface Order {
  id: string
  customerName: string
  customerEmail: string
  products: Array<{
    productId: number
    name: string
    quantity: number
    price: number
  }>
  totalAmount: number
  orderDate: string
  status: 'pending' | 'dispatched' | 'delivered' | 'received' | 'returned' | 'cancelled'
  shippingAddress: string
  paymentMethod: string
  customerPhone: string
  billingAddress: string
  subtotal: number
  shipping: number
  tax: number
  codFee: number
  returnReason?: string
  returnedAt?: string
}

const getPaymentMethodIcon = (method: string) => {
  switch (method) {
    case 'card':
      return <CreditCard className="w-4 h-4" />
    case 'paypal':
      return <span className="text-blue-500 font-bold text-xs">PayPal</span>
    case 'cod':
      return <span className="text-green-600 font-bold text-xs">COD</span>
    default:
      return <CreditCard className="w-4 h-4" />
  }
}

export default function ReturnsPage() {
  const t = useTranslations('accountPages.returns')
  const pathname = usePathname()
  const [orders, setOrders] = useState<Order[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  
  // Extract current language from pathname
  const currentLang = pathname.split('/')[1] || 'en'
  
  // Filter only returned orders
  const returnedOrders = orders.filter(order => order.status === 'returned')

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch orders
        const ordersResponse = await fetch('/api/orders')
        if (ordersResponse.ok) {
          const ordersData = await ordersResponse.json()
          if (ordersData.success) {
            setOrders(ordersData.orders)
          } else {
            setOrders([])
          }
        } else {
          setOrders([])
        }

        // Fetch products
        const productsResponse = await fetch('/api/products/products.json')
        if (productsResponse.ok) {
          const productsData = await productsResponse.json()
          setProducts(productsData)
        } else {
          setProducts([])
        }
      } catch (error) {
        console.error('Error fetching data:', error)
        setOrders([])
        setProducts([])
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Helper function to get product image by productId
  const getProductImage = (productId: number) => {
    const product = products.find(p => p.id === productId)
    return product ? product.image : '/productImages/default.jpg'
  }

  if (loading) {
    return (
      <AccountLayout 
        title={t('title')}
        breadcrumbItems={[
          { label: t('title'), isCurrent: true }
        ]}
      >
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <RotateCcw className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Loading...</h3>
          <p className="text-gray-600 mb-6">Please wait while we fetch your returned orders...</p>
        </div>
      </AccountLayout>
    )
  }

  if (returnedOrders.length === 0) {
    return (
      <AccountLayout 
        title={t('title')}
        breadcrumbItems={[
          { label: t('title'), isCurrent: true }
        ]}
      >
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <RotateCcw className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">{t('noReturns')}</h3>
          <p className="text-gray-600 mb-6">{t('noReturns')}</p>
          <Button asChild className="bg-red-500 hover:bg-red-600 text-white">
            <Link href={`/${currentLang}/account/orders`}>{t('viewAllOrders')}</Link>
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
      <div className="space-y-4">
        <Accordion type="single" collapsible className="w-full">
          {returnedOrders.map((order, index) => (
            <AccordionItem key={order.id} value={`item-${index}`} className="border border-gray-200 rounded-lg mb-4">
              <AccordionTrigger className="px-6 py-4 hover:no-underline">
                <div className="flex items-center justify-between w-full pr-4">
                  {/* Order Summary */}
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <RotateCcw className="w-4 h-4 text-orange-500" />
                      <Badge className="bg-orange-100 text-orange-800">
                        {t('status.returned')}
                      </Badge>
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-gray-900">{t('returnNumber')}{order.id}</p>
                      <p className="text-sm text-gray-600">
                        {order.products.length} {order.products.length === 1 ? t('item') : t('items')} • ${order.totalAmount.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  
                  {/* Return Date */}
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    {order.returnedAt ? new Date(order.returnedAt).toLocaleDateString() : 'N/A'}
                  </div>
                </div>
              </AccordionTrigger>
              
              <AccordionContent className="px-6 pb-6">
                <div className="space-y-6">
                  {/* Return Details */}
                  <div className="p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-orange-500 mt-0.5" />
                <div>
                        <h5 className="font-medium text-orange-900">{t('returnDetails')}</h5>
                        <p className="text-sm text-orange-700 mt-1">
                          {order.returnReason || t('noReasonProvided')}
                        </p>
                        <p className="text-xs text-orange-600 mt-2">
                          {t('returnedOn')}: {order.returnedAt ? new Date(order.returnedAt).toLocaleString() : 'N/A'}
                        </p>
                      </div>
                </div>
              </div>

                  {/* Order Summary */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                        <Package className="w-4 h-4" />
                        {t('orderSummary')}
                      </h4>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p><span className="font-medium">{t('items')}:</span> {order.products.length} {order.products.length === 1 ? t('item') : t('items')}</p>
                        <p><span className="font-medium">{t('total')}:</span> ${order.totalAmount.toFixed(2)}</p>
                        <p><span className="font-medium">{t('orderDate')}:</span> {new Date(order.orderDate).toLocaleDateString()}</p>
                        <p><span className="font-medium">{t('orderTime')}:</span> {new Date(order.orderDate).toLocaleTimeString()}</p>
                      </div>
            </div>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                        {getPaymentMethodIcon(order.paymentMethod)}
                        {t('paymentDetails')}
                      </h4>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p className="capitalize">{order.paymentMethod.replace('cod', t('cashOnDelivery'))}</p>
                        <p>{t('total')}: <span className="font-semibold">${order.totalAmount.toFixed(2)}</span></p>
                      </div>
                    </div>
                  </div>

                  {/* Order Products */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                      <Package className="w-4 h-4" />
                      {t('returnedItems')}
                    </h4>
                    <div className="space-y-3">
                      {order.products.map((item) => (
                        <div key={item.productId} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                          <div className="relative w-16 h-16 bg-white rounded-md overflow-hidden border border-gray-200 flex-shrink-0">
                            <img
                              src={getProductImage(item.productId)}
                              alt={item.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.currentTarget.src = '/productImages/default.jpg'
                              }}
                            />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">{item.name}</p>
                            <p className="text-sm text-gray-600">{t('quantity')}: {item.quantity}</p>
                            <p className="text-sm text-gray-600">{t('productPrice')}: ${item.price.toFixed(2)} each</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Shipping Address */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {t('shippingAddress')}
                    </h4>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>{order.shippingAddress}</p>
                      <p>{order.customerPhone}</p>
                      <p>{order.customerEmail}</p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-3 pt-4 border-t">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          {t('viewFullDetails')}
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>{t('returnedOrderDetails')} - #{order.id}</DialogTitle>
                        </DialogHeader>
            <div className="space-y-4">
                          {/* Return Info */}
                          <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                            <div className="flex items-start gap-3">
                              <RotateCcw className="w-5 h-5 text-orange-500 mt-0.5" />
                              <div>
                                <h4 className="font-medium text-orange-900">{t('returnInformation')}</h4>
                                <p className="text-sm text-orange-700 mt-1">
                                  {order.returnReason || t('noReasonProvided')}
                                </p>
                                <p className="text-xs text-orange-600 mt-2">
                                  {t('returnedOn')}: {order.returnedAt ? new Date(order.returnedAt).toLocaleString() : 'N/A'}
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="font-medium">{t('orderDate')}:</span>
                              <p>{new Date(order.orderDate).toLocaleString()}</p>
                            </div>
                            <div>
                              <span className="font-medium">{t('returnedOn')}:</span>
                              <p>{order.returnedAt ? new Date(order.returnedAt).toLocaleString() : 'N/A'}</p>
                            </div>
                          </div>
                          
                          {/* Order Items */}
                          <div className="space-y-3">
                            <h4 className="font-medium text-gray-900">{t('returnedItems')}</h4>
                            {order.products.map((item) => (
                              <div key={item.productId} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                <div className="relative w-16 h-16 bg-white rounded-md overflow-hidden border border-gray-200 flex-shrink-0">
                                  <img
                                    src={getProductImage(item.productId)}
                      alt={item.name}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                      e.currentTarget.src = '/productImages/default.jpg'
                                    }}
                    />
                  </div>
                  <div className="flex-1">
                                  <h5 className="font-medium text-gray-900">{item.name}</h5>
                                  <p className="text-sm text-gray-600">{t('quantity')}: {item.quantity}</p>
                                  <p className="text-sm text-gray-600">{t('productPrice')}: ${item.price.toFixed(2)} each</p>
                  </div>
                  <div className="text-right">
                                  <p className="font-semibold text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>

                          {/* Shipping Address in Dialog */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                              <h4 className="font-medium text-gray-900 mb-2">{t('shippingAddress')}</h4>
                              <div className="text-sm text-gray-600 space-y-1">
                                <p>{order.shippingAddress}</p>
                                <p>{order.customerPhone}</p>
                                <p>{order.customerEmail}</p>
                              </div>
                </div>
                            
                <div>
                              <h4 className="font-medium text-gray-900 mb-2">{t('paymentDetails')}</h4>
                              <div className="text-sm text-gray-600 space-y-1">
                                <p className="capitalize">{order.paymentMethod.replace('cod', t('cashOnDelivery'))}</p>
                                <p>{t('total')}: <span className="font-semibold">${order.totalAmount.toFixed(2)}</span></p>
                              </div>
                </div>
              </div>
            </div>
                      </DialogContent>
                    </Dialog>
            </div>
          </div>
              </AccordionContent>
            </AccordionItem>
        ))}
        </Accordion>
      </div>
    </AccountLayout>
  )
} 