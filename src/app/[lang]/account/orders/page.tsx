"use client"

import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { 
  Package, 
  Truck, 
  CheckCircle, 
  XCircle, 
  RotateCcw, 
  Clock, 
  MapPin, 
  CreditCard, 
  Calendar,
  Eye,
  AlertCircle,
  RefreshCw,
} from "lucide-react"
import Image from "next/image"
import AccountLayout from "@/components/AccountLayout"
import { toast } from "sonner"
import Link from "next/link"
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
}

const getStatusIcon = (status: Order['status']) => {
  switch (status) {
    case 'pending':
      return <Clock className="w-4 h-4 text-yellow-500" />
    case 'dispatched':
      return <Truck className="w-4 h-4 text-purple-500" />
    case 'delivered':
      return <CheckCircle className="w-4 h-4 text-green-500" />
    case 'received':
      return <CheckCircle className="w-4 h-4 text-blue-500" />
    case 'cancelled':
      return <XCircle className="w-4 h-4 text-red-500" />
    case 'returned':
      return <RotateCcw className="w-4 h-4 text-orange-500" />
    default:
      return <Package className="w-4 h-4 text-gray-500" />
  }
}

const getStatusColor = (status: Order['status']) => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-800'
    case 'dispatched':
      return 'bg-blue-100 text-blue-800'
    case 'delivered':
      return 'bg-green-100 text-green-800'
    case 'received':
      return 'bg-blue-100 text-blue-800'
    case 'cancelled':
      return 'bg-red-100 text-red-800'
    case 'returned':
      return 'bg-orange-100 text-orange-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
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

export default function OrdersPage() {
  const t = useTranslations('accountPages.orders')
  const pathname = usePathname()
  const [orders, setOrders] = useState<Order[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [cancelReason, setCancelReason] = useState("")
  const [returnReason, setReturnReason] = useState("")
  const [isCancelling, setIsCancelling] = useState(false)
  const [isReturning, setIsReturning] = useState(false)
  const [isMarkingReceived, setIsMarkingReceived] = useState(false)
  
  // Extract current language from pathname
  const currentLang = pathname.split('/')[1] || 'en'

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

  const refreshOrders = async () => {
    try {
      setLoading(true)

      // Fetch orders
      const ordersResponse = await fetch('/api/orders')
      if (ordersResponse.ok) {
        const ordersData = await ordersResponse.json()
        if (ordersData.success) {
          setOrders(ordersData.orders)
          toast.success(`Orders refreshed successfully! Found ${ordersData.orders.length} orders`)
        } else {
          toast.error('Failed to refresh orders')
        }
      } else {
        toast.error('Failed to refresh orders')
      }

      // Fetch products (to ensure images are up to date)
      const productsResponse = await fetch('/api/products/products.json')
      if (productsResponse.ok) {
        const productsData = await productsResponse.json()
        setProducts(productsData)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
      toast.error('Failed to refresh data')
    } finally {
      setLoading(false)
    }
  }

  // Helper function to get product image by productId
  const getProductImage = (productId: number) => {
    const product = products.find(p => p.id === productId)
    return product ? product.image : '/productImages/default.jpg'
  }

  const handleCancelOrder = async (orderId: string) => {
    if (!cancelReason.trim()) {
      toast.error(t('orderDetails.provideCancellationReason'))
      return
    }

    setIsCancelling(true)
    try {
      // Assuming a cancellation API endpoint exists
      const response = await fetch(`/api/orders/${orderId}/cancel`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reason: cancelReason }),
      })

      if (response.ok) {
        const data = await response.json()
        if (data.success) {
      toast.success(t('orderCancelledSuccess'))
      setCancelReason("")
          refreshOrders() // Refresh orders to update status
        } else {
          toast.error(data.message || t('toast.failedToCancelOrder'))
        }
      } else {
        toast.error(t('toast.failedToCancelOrder'))
      }
    } catch (error) {
      console.error('Error cancelling order:', error)
      toast.error(t('toast.failedToCancelOrder'))
    } finally {
      setIsCancelling(false)
    }
  }

  const handleReturnOrder = async (orderId: string) => {
    if (!returnReason.trim()) {
      toast.error(t('orderDetails.provideReturnReason'))
      return
    }

    setIsReturning(true)
    try {
      // Assuming a return API endpoint exists
      const response = await fetch(`/api/orders/${orderId}/return`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reason: returnReason }),
      })

      if (response.ok) {
        const data = await response.json()
        if (data.success) {
      toast.success(t('toast.returnRequestSubmitted'))
      setReturnReason("")
          refreshOrders() // Refresh orders to update status
        } else {
          toast.error(data.message || t('toast.failedToSubmitReturn'))
        }
      } else {
        toast.error(t('toast.failedToSubmitReturn'))
      }
    } catch (error) {
      console.error('Error returning order:', error)
      toast.error(t('toast.failedToSubmitReturn'))
    } finally {
      setIsReturning(false)
    }
  }

  const handleMarkReceived = async (orderId: string) => {
    setIsMarkingReceived(true)
    try {
      // Update local state immediately for better UX
      const updatedOrders = orders.map(order => 
        order.id === orderId 
          ? { ...order, status: 'received' as const }
          : order
      );
      
      setOrders(updatedOrders);
      
      // Update the order status in the backend
      const response = await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'received' }),
      });
      
      if (!response.ok) {
        console.error('Failed to update order status in backend');
        toast.error(t('toast.failedToMarkReceived'));
        // Revert local state if backend update fails
        setOrders(orders);
      } else {
        toast.success(t('toast.orderMarkedReceived'));
      }
    } catch (error) {
      console.error('Error marking order as received:', error);
      toast.error(t('toast.failedToMarkReceived'));
      // Revert local state if there's an error
      setOrders(orders);
    } finally {
      setIsMarkingReceived(false)
    }
  }

  const canCancel = (order: Order) => {
    return order.status === 'pending'
  }

  const canReturn = (order: Order) => {
    return order.status === 'delivered'
  }

  if (loading && orders.length === 0) {
    return (
      <AccountLayout
        title={t('title')}
        breadcrumbItems={[
          { label: t('title'), isCurrent: true }
        ]}
      >
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <RefreshCw className="w-12 h-12 text-gray-400 animate-spin" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">{t('loadingOrders')}</h3>
          <p className="text-gray-600 mb-6">{t('loadingOrdersDescription')}</p>
          <Button onClick={refreshOrders} className="bg-blue-500 hover:bg-blue-600 text-white">
            <RefreshCw className="w-4 h-4 mr-2" /> {t('refreshOrders')}
          </Button>
        </div>
      </AccountLayout>
    )
  }

  if (orders.length === 0) {
    return (
      <AccountLayout 
        title={t('title')}
        breadcrumbItems={[
          { label: t('title'), isCurrent: true }
        ]}
      >
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <Package className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">{t('noOrders')}</h3>
          <p className="text-gray-600 mb-6">{t('noOrders')}</p>
          <Button asChild className="bg-red-500 hover:bg-red-600 text-white">
            <Link href={`/${currentLang}/products`}>{t('startShopping')}</Link>
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
        {/* Header with refresh button */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{t('title')}</h2>
            <p className="text-sm text-gray-600">View and manage your orders</p>
          </div>
          <Button
            variant="outline"
            onClick={refreshOrders}
            disabled={loading}
            className="flex items-center gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            {loading ? 'Refreshing...' : 'Refresh Orders'}
          </Button>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {orders.map((order, index) => (
            <AccordionItem key={order.id} value={`item-${index}`} className="border border-gray-200 rounded-lg mb-4">
              <AccordionTrigger className="px-6 py-4 hover:no-underline">
                <div className="flex items-center justify-between w-full pr-4">
                  {/* Order Summary */}
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(order.status)}
                      <Badge className={getStatusColor(order.status)}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </Badge>
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-gray-900">Order #{order.id}</p>
                      <p className="text-sm text-gray-600">
                        {order.products.length} {order.products.length === 1 ? 'item' : 'items'} • ${order.totalAmount.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  
                  {/* Order Date */}
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    {new Date(order.orderDate).toLocaleDateString()}
                  </div>
                </div>
              </AccordionTrigger>
              
              <AccordionContent className="px-6 pb-6">
                <div className="space-y-6">
                  {/* Order Summary */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                        <Package className="w-4 h-4" />
                        {t('orderDetails.orderSummary')}
                      </h4>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p><span className="font-medium">{t('orderDetails.items')}</span> {order.products.length} {order.products.length === 1 ? t('item') : t('items')}</p>
                        <p><span className="font-medium">{t('orderDetails.total')}</span> ${order.totalAmount.toFixed(2)}</p>
                        <p><span className="font-medium">{t('orderDetails.orderDate')}</span> {new Date(order.orderDate).toLocaleDateString()}</p>
                        {/* Assuming estimatedDelivery is not directly available in the new order structure */}
                        {/* {order.estimatedDelivery && (
                          <p><span className="font-medium">{t('orderDetails.estimatedDelivery')}</span> {new Date(order.estimatedDelivery).toLocaleDateString()}</p>
                        )} */}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                        {getPaymentMethodIcon(order.paymentMethod)}
                        {t('orderDetails.paymentDetails')}
                      </h4>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p className="capitalize">{order.paymentMethod.replace('cod', t('orderDetails.cashOnDelivery'))}</p>
                        {/* Assuming paymentStatus is not directly available in the new order structure */}
                        {/* <p>{t('orderDetails.status')} <span className={`font-medium ${order.paymentStatus === 'paid' ? 'text-green-600' : 'text-yellow-600'}`}>
                          {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                        </span></p> */}
                      </div>
                    </div>
                  </div>

                  {/* Shipping Address */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {t('orderDetails.shippingAddress')}
                    </h4>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>{order.shippingAddress}</p>
                      <p>{order.billingAddress}</p>
                      <p>{order.customerPhone}</p>
                      <p>{order.customerEmail}</p>
                    </div>
                  </div>

                  

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3">
                    {canCancel(order) && (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" className="text-red-600 hover:text-red-700 border-red-200 hover:border-red-300">
                            <XCircle className="w-4 h-4 mr-2" />
                            {t('cancelOrder')}
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>{t('cancelOrder')}</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <Label htmlFor="cancelReason">{t('orderDetails.cancellationReason')}</Label>
                              <Textarea
                                id="cancelReason"
                                value={cancelReason}
                                onChange={(e) => setCancelReason(e.target.value)}
                                placeholder={t('orderDetails.provideCancellationReason')}
                                rows={3}
                              />
                            </div>
                            <div className="flex justify-end gap-3">
                              <Button variant="outline" onClick={() => setCancelReason("")}>
                                {t('cancel')}
                              </Button>
                              <Button
                                onClick={() => handleCancelOrder(order.id)}
                                disabled={isCancelling}
                                className="bg-red-500 hover:bg-red-600 text-white"
                              >
                                {isCancelling ? t('cancelling') : t('confirmCancel')}
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    )}

                    {canReturn(order) && (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" className="text-orange-600 hover:text-orange-700 border-orange-200 hover:border-orange-300">
                            <RotateCcw className="w-4 h-4 mr-2" />
                            {t('returnOrder')}
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>{t('returnOrder')}</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <Label htmlFor="returnReason">{t('orderDetails.returnReason')}</Label>
                              <Textarea
                                id="returnReason"
                                value={returnReason}
                                onChange={(e) => setReturnReason(e.target.value)}
                                placeholder={t('orderDetails.provideReturnReason')}
                                rows={3}
                              />
                            </div>
                            <div className="flex justify-end gap-3">
                              <Button variant="outline" onClick={() => setReturnReason("")}>
                                {t('cancel')}
                              </Button>
                              <Button
                                onClick={() => handleReturnOrder(order.id)}
                                disabled={isReturning}
                                className="bg-orange-500 hover:bg-orange-600 text-white"
                              >
                                {isReturning ? t('submitting') : t('submitReturn')}
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    )}

                    {/* View Order Details Button */}
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="text-blue-600 hover:text-blue-700 border-blue-200 hover:border-blue-300">
                          <Eye className="w-4 h-4 mr-2" />
                          {t('viewDetails')}
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>{t('orderDetails.title')} #{order.id}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-6">
                          {/* Order Summary */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <h4 className="font-medium text-gray-900 mb-2">{t('orderDetails.orderSummary')}</h4>
                              <div className="text-sm text-gray-600 space-y-1">
                                <p><span className="font-medium">{t('orderDetails.items')}</span> {order.products.length} {order.products.length === 1 ? t('item') : t('items')}</p>
                                <p><span className="font-medium">{t('orderDetails.total')}</span> ${order.totalAmount.toFixed(2)}</p>
                                <p><span className="font-medium">{t('orderDetails.orderDate')}</span> {new Date(order.orderDate).toLocaleDateString()}</p>
                              </div>
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900 mb-2">{t('orderDetails.paymentInfo')}</h4>
                              <div className="text-sm text-gray-600 space-y-1">
                                <p className="capitalize">{order.paymentMethod.replace('cod', t('orderDetails.cashOnDelivery'))}</p>
                                <p>{t('orderDetails.total')} <span className="font-semibold">${order.totalAmount.toFixed(2)}</span></p>
                              </div>
                            </div>
                          </div>

                          {/* Order Items */}
                          <div>
                            <h4 className="font-medium text-gray-900 mb-3">{t('orderDetails.orderItems')}</h4>
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
                                    <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                                    <p className="text-sm text-gray-600">Price: ${item.price.toFixed(2)} each</p>
                                  </div>
                                  <div className="text-right">
                                    <p className="font-semibold text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Addresses */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <h4 className="font-medium text-gray-900 mb-2">{t('orderDetails.shippingAddress')}</h4>
                              <div className="text-sm text-gray-600 space-y-1">
                                <p>{order.shippingAddress}</p>
                                <p>{order.customerPhone}</p>
                                <p>{order.customerEmail}</p>
                              </div>
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900 mb-2">{t('orderDetails.billingAddress')}</h4>
                              <div className="text-sm text-gray-600 space-y-1">
                                <p>{order.billingAddress}</p>
                              </div>
                            </div>
                          </div>

                          {/* Order Timeline */}
                          <div>
                            <h4 className="font-medium text-gray-900 mb-3">{t('orderDetails.orderTimeline')}</h4>
                            <div className="space-y-3">
                              <div className="flex items-center gap-3">
                                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                <div className="text-sm">
                                  <span className="font-medium">{t('orderDetails.orderPlaced')}</span>
                                  <p className="text-gray-600">{new Date(order.orderDate).toLocaleString()}</p>
                                </div>
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