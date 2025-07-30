"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Package, Download, Eye } from "lucide-react"
import Image from "next/image"
import AccountLayout from "@/components/AccountLayout"
import { useEffect } from "react"

// Mock returns data
const returns = [
  {
    id: "RET-001",
    orderId: "ORD-001",
    date: "January 10, 2024",
    status: "Approved",
    reason: "Wrong size received",
    items: [
      {
        id: 1,
        name: "Nike Air Max 270",
        image: "/iphone-banner.jpg",
        quantity: 1,
        price: 129.99,
        returnReason: "Wrong size received"
      }
    ],
    refundAmount: 129.99,
    trackingNumber: "TRK123456789"
  },
  {
    id: "RET-002",
    orderId: "ORD-003",
    date: "December 28, 2023",
    status: "Processing",
    reason: "Defective product",
    items: [
      {
        id: 2,
        name: "Wireless Bluetooth Headphones",
        image: "/iphone-banner.jpg",
        quantity: 1,
        price: 89.99,
        returnReason: "Defective product"
      }
    ],
    refundAmount: 89.99,
    trackingNumber: "TRK987654321"
  },
  {
    id: "RET-003",
    orderId: "ORD-005",
    date: "December 15, 2023",
    status: "Completed",
    reason: "Changed mind",
    items: [
      {
        id: 3,
        name: "Samsung Galaxy Watch",
        image: "/iphone-banner.jpg",
        quantity: 1,
        price: 299.99,
        returnReason: "Changed mind"
      }
    ],
    refundAmount: 299.99,
    trackingNumber: "TRK456789123"
  }
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "Approved":
      return "bg-green-100 text-green-800"
    case "Processing":
      return "bg-yellow-100 text-yellow-800"
    case "Completed":
      return "bg-blue-100 text-blue-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export default function ReturnsPage() {
  useEffect(() => {
    document.title = "My Returns | E-Store";
  }, []);

  return (
    <AccountLayout 
      title="My Returns"
      breadcrumbItems={[
        { label: "My Orders", href: "/account/orders" },
        { label: "My Returns", isCurrent: true }
      ]}
    >
      <h2 className="text-xl font-bold text-red-500 mb-6">My Returns</h2>
      
      <div className="space-y-6">
        {returns.map((returnItem) => (
          <div key={returnItem.id} className="border border-gray-200 rounded-lg p-6">
            {/* Return Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
                  <Package className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Return #{returnItem.id}</h3>
                  <p className="text-sm text-gray-600">Order #{returnItem.orderId}</p>
                </div>
              </div>
              <div className="text-right">
                <Badge className={getStatusColor(returnItem.status)}>
                  {returnItem.status}
                </Badge>
                <p className="text-sm text-gray-600 mt-1">{returnItem.date}</p>
              </div>
            </div>

            {/* Return Items */}
            <div className="space-y-4">
              {returnItem.items.map((item) => (
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
                    <p className="text-sm text-gray-600">Reason: {item.returnReason}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">${item.price.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Return Details */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Tracking Number</p>
                  <p className="font-medium text-gray-900">{returnItem.trackingNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Refund Amount</p>
                  <p className="font-semibold text-green-600">${returnItem.refundAmount.toFixed(2)}</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-4 flex gap-3">
              <Button variant="outline" size="sm" className="border-gray-300">
                <Eye className="w-4 h-4 mr-2" />
                View Details
              </Button>
              <Button variant="outline" size="sm" className="border-gray-300">
                <Download className="w-4 h-4 mr-2" />
                Download Label
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {returns.length === 0 && (
        <div className="text-center py-12">
          <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Returns Yet</h3>
          <p className="text-gray-600 mb-6">You haven't made any returns yet.</p>
          <Button asChild className="bg-red-500 hover:bg-red-600 text-white">
            <a href="/account/orders">View My Orders</a>
          </Button>
        </div>
      )}
    </AccountLayout>
  )
} 