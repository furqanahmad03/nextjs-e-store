"use client"

import React from "react"
import { useCart, Order } from "@/contexts/CartContext"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { 
  Package, 
  XCircle, 
  Calendar,
  Eye,
  AlertCircle,
  MapPin,
  CreditCard
} from "lucide-react"
import Image from "next/image"
import AccountLayout from "@/components/AccountLayout"
import { useTranslations } from "next-intl"
import { usePathname } from "next/navigation"

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

export default function CancellationsPage() {
  const { orders } = useCart()
  const t = useTranslations('accountPages.cancellations')
  const pathname = usePathname()
  
  // Extract current language from pathname
  const currentLang = pathname.split('/')[1] || 'en'
  
  // Filter only cancelled orders
  const cancelledOrders = orders.filter(order => order.status === 'cancelled')

  if (cancelledOrders.length === 0) {
    return (
      <AccountLayout 
        title={t('title')}
        breadcrumbItems={[
          { label: t('title'), isCurrent: true }
        ]}
      >
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <XCircle className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">{t('noCancellations')}</h3>
          <p className="text-gray-600 mb-6">{t('noCancellations')}</p>
          <Button asChild className="bg-red-500 hover:bg-red-600 text-white">
            <a href={`/${currentLang}/account/orders`}>{t('viewAllOrders')}</a>
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
          {cancelledOrders.map((order, index) => (
            <AccordionItem key={order.id} value={`item-${index}`} className="border border-gray-200 rounded-lg mb-4">
              <AccordionTrigger className="px-6 py-4 hover:no-underline">
                <div className="flex items-center justify-between w-full pr-4">
                  {/* Order Summary */}
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <XCircle className="w-4 h-4 text-red-500" />
                      <Badge className="bg-red-100 text-red-800">
                        {t('status.cancelled')}
                      </Badge>
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-gray-900">{t('cancellationNumber')}{order.id}</p>
                      <p className="text-sm text-gray-600">
                        {order.items.length} {order.items.length === 1 ? t('item') : t('items')} • ${order.total.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  
                  {/* Cancellation Date */}
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    {order.cancellationDate ? new Date(order.cancellationDate).toLocaleDateString() : 'N/A'}
                  </div>
                </div>
              </AccordionTrigger>
              
              <AccordionContent className="px-6 pb-6">
                <div className="space-y-6">
                  {/* Cancellation Details */}
                  <div className="p-4 bg-red-50 rounded-lg border-l-4 border-red-500">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
                      <div>
                        <h5 className="font-medium text-red-900">{t('cancellationDetails')}</h5>
                        <p className="text-sm text-red-700 mt-1">
                          {order.cancellationReason || t('noReasonProvided')}
                        </p>
                        <p className="text-xs text-red-600 mt-2">
                          {t('cancelledOn')}: {order.cancellationDate ? new Date(order.cancellationDate).toLocaleString() : 'N/A'}
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
                        <p><span className="font-medium">{t('items')}:</span> {order.items.length} {order.items.length === 1 ? t('item') : t('items')}</p>
                        <p><span className="font-medium">{t('total')}:</span> ${order.total.toFixed(2)}</p>
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
                        <p>{t('status')}: <span className="font-medium text-gray-600">
                          {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                        </span></p>
                      </div>
                    </div>
                  </div>

                  {/* Shipping Address */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {t('shippingAddress')}
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
                          <DialogTitle>{t('cancelledOrderDetails')} - #{order.id}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          {/* Cancellation Info */}
                          <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                            <div className="flex items-start gap-3">
                              <XCircle className="w-5 h-5 text-red-500 mt-0.5" />
                              <div>
                                <h4 className="font-medium text-red-900">Cancellation Information</h4>
                                <p className="text-sm text-red-700 mt-1">
                                  {order.cancellationReason || 'No reason provided'}
                                </p>
                                <p className="text-xs text-red-600 mt-2">
                                  Cancelled on: {order.cancellationDate ? new Date(order.cancellationDate).toLocaleString() : 'N/A'}
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="font-medium">Order Date:</span>
                              <p>{new Date(order.orderDate).toLocaleString()}</p>
                            </div>
                            <div>
                              <span className="font-medium">Cancellation Date:</span>
                              <p>{order.cancellationDate ? new Date(order.cancellationDate).toLocaleString() : 'N/A'}</p>
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