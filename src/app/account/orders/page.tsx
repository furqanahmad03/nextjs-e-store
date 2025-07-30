"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Package, Download, Eye } from "lucide-react"
import Image from "next/image"
import AccountLayout from "@/components/AccountLayout"
import { useEffect } from "react"

// Mock orders data
const orders = [
  {
    id: "ORD-001",
    date: "January 15, 2024",
    status: "Delivered",
    total: 129.99,
    trackingNumber: "TRK123456789",
    items: [
      {
        id: 1,
        name: "Nike Air Max 270",
        image: "/iphone-banner.jpg",
        quantity: 1,
        price: 129.99
      }
    ]
  },
  {
    id: "ORD-002",
    date: "January 10, 2024",
    status: "Processing",
    total: 89.99,
    trackingNumber: "TRK987654321",
    items: [
      {
        id: 2,
        name: "Wireless Bluetooth Headphones",
        image: "/iphone-banner.jpg",
        quantity: 1,
        price: 89.99
      }
    ]
  },
  {
    id: "ORD-003",
    date: "January 5, 2024",
    status: "Shipped",
    total: 299.99,
    trackingNumber: "TRK456789123",
    items: [
      {
        id: 3,
        name: "Samsung Galaxy Watch",
        image: "/iphone-banner.jpg",
        quantity: 1,
        price: 299.99
      }
    ]
  }
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "Delivered":
      return "bg-green-100 text-green-800"
    case "Shipped":
      return "bg-blue-100 text-blue-800"
    case "Processing":
      return "bg-yellow-100 text-yellow-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export default function OrdersPage() {
  useEffect(() => {
    document.title = "My Orders | E-Store";
  }, []);

  return (
    <AccountLayout 
      title="My Orders"
      breadcrumbItems={[
        { label: "My Orders", isCurrent: true }
      ]}
    >
      <h2 className="text-xl font-bold text-red-500 mb-6">My Orders</h2>
      
      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order.id} className="border border-gray-200 rounded-lg p-6">
            {/* Order Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
                  <Package className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Order #{order.id}</h3>
                  <p className="text-sm text-gray-600">{order.date}</p>
                </div>
              </div>
              <div className="text-right">
                <Badge className={getStatusColor(order.status)}>
                  {order.status}
                </Badge>
                <p className="text-sm text-gray-600 mt-1">Total: ${order.total.toFixed(2)}</p>
              </div>
            </div>

            {/* Order Items */}
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
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
                    <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">${item.price.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Details */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Tracking Number</p>
                  <p className="font-medium text-gray-900">{order.trackingNumber}</p>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" size="sm" className="border-gray-300">
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                  <Button variant="outline" size="sm" className="border-gray-300">
                    <Download className="w-4 h-4 mr-2" />
                    Download Invoice
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {orders.length === 0 && (
        <div className="text-center py-12">
          <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Orders Yet</h3>
          <p className="text-gray-600 mb-6">You haven't placed any orders yet.</p>
          <Button asChild className="bg-red-500 hover:bg-red-600 text-white">
            <a href="/products">Start Shopping</a>
          </Button>
        </div>
      )}
    </AccountLayout>
  )
} 