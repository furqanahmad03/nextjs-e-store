"use client"

import React, { useState } from "react"
import { useCart, Order } from "@/contexts/CartContext"
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
} from "lucide-react"
import Image from "next/image"
import AccountLayout from "@/components/AccountLayout"
import { toast } from "sonner"
import Link from "next/link"

const getStatusIcon = (status: Order['status']) => {
  switch (status) {
    case 'pending':
      return <Clock className="w-4 h-4 text-yellow-500" />
    case 'confirmed':
      return <CheckCircle className="w-4 h-4 text-blue-500" />
    case 'shipped':
      return <Truck className="w-4 h-4 text-purple-500" />
    case 'delivered':
      return <CheckCircle className="w-4 h-4 text-green-500" />
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
    case 'confirmed':
      return 'bg-blue-100 text-blue-800'
    case 'shipped':
      return 'bg-purple-100 text-purple-800'
    case 'delivered':
      return 'bg-green-100 text-green-800'
    case 'cancelled':
      return 'bg-red-100 text-red-800'
    case 'returned':
      return 'bg-orange-100 text-orange-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const getPaymentMethodIcon = (method: Order['paymentMethod']) => {
  switch (method) {
    case 'card':
      return <CreditCard className="w-4 h-4" />
    case 'paypal':
      return <span className="text-blue-500 font-bold text-xs">PayPal</span>
    case 'cod':
      return <span className="text-green-600 font-bold text-xs">COD</span>
  }
}

export default function OrdersPage() {
  const { orders, cancelOrder, returnOrder } = useCart()
  const [cancelReason, setCancelReason] = useState("")
  const [returnReason, setReturnReason] = useState("")
  const [isCancelling, setIsCancelling] = useState(false)
  const [isReturning, setIsReturning] = useState(false)

  const handleCancelOrder = async (orderId: string) => {
    if (!cancelReason.trim()) {
      toast.error('Please provide a reason for cancellation')
      return
    }

    setIsCancelling(true)
    try {
      cancelOrder(orderId, cancelReason)
      setCancelReason("")
    } catch (error) {
      toast.error('Failed to cancel order')
    } finally {
      setIsCancelling(false)
    }
  }

  const handleReturnOrder = async (orderId: string) => {
    if (!returnReason.trim()) {
      toast.error('Please provide a reason for return')
      return
    }

    setIsReturning(true)
    try {
      returnOrder(orderId, returnReason)
      setReturnReason("")
    } catch (error) {
      toast.error('Failed to submit return request')
    } finally {
      setIsReturning(false)
    }
  }

  const canCancel = (order: Order) => {
    return ['pending', 'confirmed'].includes(order.status)
  }

  const canReturn = (order: Order) => {
    return order.status === 'delivered'
  }

  if (orders.length === 0) {
    return (
      <AccountLayout 
        title="My Orders"
        breadcrumbItems={[
          { label: "My Orders", isCurrent: true }
        ]}
      >
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <Package className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Orders Yet</h3>
          <p className="text-gray-600 mb-6">You haven&apos;t placed any orders yet.</p>
          <Button asChild className="bg-red-500 hover:bg-red-600 text-white">
            <Link href="/products">Start Shopping</Link>
          </Button>
        </div>
      </AccountLayout>
    )
  }

  return (
    <AccountLayout 
      title="My Orders"
      breadcrumbItems={[
        { label: "My Orders", isCurrent: true }
      ]}
    >
      <div className="space-y-4">
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
                        {order.items.length} {order.items.length === 1 ? 'item' : 'items'} • ${order.total.toFixed(2)}
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
                        Order Summary
                      </h4>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p><span className="font-medium">Items:</span> {order.items.length} {order.items.length === 1 ? 'item' : 'items'}</p>
                        <p><span className="font-medium">Total:</span> ${order.total.toFixed(2)}</p>
                        <p><span className="font-medium">Order Date:</span> {new Date(order.orderDate).toLocaleDateString()}</p>
                        {order.estimatedDelivery && (
                          <p><span className="font-medium">Estimated Delivery:</span> {new Date(order.estimatedDelivery).toLocaleDateString()}</p>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                        {getPaymentMethodIcon(order.paymentMethod)}
                        Payment Details
                      </h4>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p className="capitalize">{order.paymentMethod.replace('cod', 'Cash on Delivery')}</p>
                        <p>Status: <span className={`font-medium ${order.paymentStatus === 'paid' ? 'text-green-600' : 'text-yellow-600'}`}>
                          {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                        </span></p>
                      </div>
                    </div>
                  </div>

                  {/* Shipping Address */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      Shipping Address
                    </h4>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>{order.shippingAddress.firstName} {order.shippingAddress.lastName}</p>
                      <p>{order.shippingAddress.address}</p>
                      <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}</p>
                      <p>{order.shippingAddress.country}</p>
                      <p>{order.shippingAddress.email}</p>
                      <p>{order.shippingAddress.phone}</p>
                    </div>
                  </div>

                  {/* Cancellation/Return Info */}
                  {(order.cancellationReason || order.returnReason) && (
                    <div className="p-4 bg-gray-50 rounded-lg border-l-4 border-orange-500">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-orange-500 mt-0.5" />
                <div>
                          <h5 className="font-medium text-gray-900">
                            {order.cancellationReason ? 'Cancellation Reason' : 'Return Reason'}
                          </h5>
                          <p className="text-sm text-gray-600 mt-1">
                            {order.cancellationReason || order.returnReason}
                          </p>
                          <p className="text-xs text-gray-500 mt-2">
                            {order.cancellationReason ? 'Cancelled on' : 'Returned on'}: {
                              new Date(order.cancellationDate || order.returnDate || '').toLocaleDateString()
                            }
                          </p>
                        </div>
                </div>
              </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex items-center gap-3 pt-4 border-t">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          View Full Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Order Details - #{order.id}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="font-medium">Order Date:</span>
                              <p>{new Date(order.orderDate).toLocaleString()}</p>
                            </div>
                            <div>
                              <span className="font-medium">Estimated Delivery:</span>
                              <p>{new Date(order.estimatedDelivery).toLocaleDateString()}</p>
              </div>
            </div>

            {/* Order Items */}
                          <div className="space-y-3">
                            <h4 className="font-medium text-gray-900">Order Items</h4>
              {order.items.map((item) => (
                              <div key={item.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                <div className="relative w-16 h-16 bg-white rounded-md overflow-hidden border border-gray-200 flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                                  <h5 className="font-medium text-gray-900">{item.name}</h5>
                    <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                                  <p className="font-semibold text-gray-900">${item.total.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>

                          {/* Shipping Address in Dialog */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <h4 className="font-medium text-gray-900 mb-2">Shipping Address</h4>
                              <div className="text-sm text-gray-600 space-y-1">
                                <p>{order.shippingAddress.firstName} {order.shippingAddress.lastName}</p>
                                <p>{order.shippingAddress.address}</p>
                                <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}</p>
                                <p>{order.shippingAddress.country}</p>
                                <p>{order.shippingAddress.email}</p>
                                <p>{order.shippingAddress.phone}</p>
                              </div>
                            </div>
                            
                            <div>
                              <h4 className="font-medium text-gray-900 mb-2">Payment Details</h4>
                              <div className="text-sm text-gray-600 space-y-1">
                                <p className="capitalize">{order.paymentMethod.replace('cod', 'Cash on Delivery')}</p>
                                <p>Status: <span className={`font-medium ${order.paymentStatus === 'paid' ? 'text-green-600' : 'text-yellow-600'}`}>
                                  {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                                </span></p>
                                <p>Total: <span className="font-semibold">${order.total.toFixed(2)}</span></p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>

                    {canCancel(order) && (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" className="text-red-600 border-red-600 hover:bg-red-50">
                            <XCircle className="w-4 h-4 mr-2" />
                            Cancel Order
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Cancel Order #{order.id}</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <Label htmlFor="cancelReason">Reason for cancellation</Label>
                              <Textarea
                                id="cancelReason"
                                value={cancelReason}
                                onChange={(e) => setCancelReason(e.target.value)}
                                placeholder="Please provide a reason for cancelling this order..."
                                rows={3}
                              />
                            </div>
                            <div className="flex gap-3">
                              <Button
                                onClick={() => handleCancelOrder(order.id)}
                                disabled={isCancelling}
                                className="bg-red-500 hover:bg-red-600"
                              >
                                {isCancelling ? 'Cancelling...' : 'Cancel Order'}
                              </Button>
                              <Button variant="outline" onClick={() => setCancelReason("")}>
                                Cancel
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    )}

                    {canReturn(order) && (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" className="text-orange-600 border-orange-600 hover:bg-orange-50">
                            <RotateCcw className="w-4 h-4 mr-2" />
                            Return Order
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Return Order #{order.id}</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                <div>
                              <Label htmlFor="returnReason">Reason for return</Label>
                              <Textarea
                                id="returnReason"
                                value={returnReason}
                                onChange={(e) => setReturnReason(e.target.value)}
                                placeholder="Please provide a reason for returning this order..."
                                rows={3}
                              />
                </div>
                <div className="flex gap-3">
                              <Button
                                onClick={() => handleReturnOrder(order.id)}
                                disabled={isReturning}
                                className="bg-orange-500 hover:bg-orange-600"
                              >
                                {isReturning ? 'Submitting...' : 'Submit Return'}
                  </Button>
                              <Button variant="outline" onClick={() => setReturnReason("")}>
                                Cancel
                  </Button>
                </div>
              </div>
                        </DialogContent>
                      </Dialog>
                    )}
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