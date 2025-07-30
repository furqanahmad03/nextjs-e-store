"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, Download, Eye, RefreshCw } from "lucide-react"
import Image from "next/image"
import AccountLayout from "@/components/AccountLayout"
import { useEffect } from "react"

// Mock cancellations data
const cancellations = [
  {
    id: "CAN-001",
    orderId: "ORD-002",
    date: "January 5, 2024",
    status: "Cancelled",
    reason: "Changed mind",
    items: [
      {
        id: 1,
        name: "Apple iPhone 15 Pro",
        image: "/iphone-banner.jpg",
        quantity: 1,
        price: 999.99,
        cancelReason: "Changed mind"
      }
    ],
    refundAmount: 999.99,
    refundStatus: "Processed",
    refundDate: "January 6, 2024"
  },
  {
    id: "CAN-002",
    orderId: "ORD-004",
    date: "December 20, 2023",
    status: "Cancelled",
    reason: "Out of stock",
    items: [
      {
        id: 2,
        name: "Sony PlayStation 5",
        image: "/iphone-banner.jpg",
        quantity: 1,
        price: 499.99,
        cancelReason: "Out of stock"
      }
    ],
    refundAmount: 499.99,
    refundStatus: "Processed",
    refundDate: "December 21, 2023"
  },
  {
    id: "CAN-003",
    orderId: "ORD-006",
    date: "December 10, 2023",
    status: "Cancelled",
    reason: "Delivery delay",
    items: [
      {
        id: 3,
        name: "MacBook Air M2",
        image: "/iphone-banner.jpg",
        quantity: 1,
        price: 1199.99,
        cancelReason: "Delivery delay"
      }
    ],
    refundAmount: 1199.99,
    refundStatus: "Processed",
    refundDate: "December 11, 2023"
  }
]

const getRefundStatusColor = (status: string) => {
  switch (status) {
    case "Processed":
      return "bg-green-100 text-green-800"
    case "Pending":
      return "bg-yellow-100 text-yellow-800"
    case "Failed":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export default function CancellationsPage() {
  useEffect(() => {
    document.title = "My Cancellations | E-Store";
  }, []);

  return (
    <AccountLayout 
      title="My Cancellations"
      breadcrumbItems={[
        { label: "My Orders", href: "/account/orders" },
        { label: "My Cancellations", isCurrent: true }
      ]}
    >
      <h2 className="text-xl font-bold text-red-500 mb-6">My Cancellations</h2>
      
      <div className="space-y-6">
        {cancellations.map((cancellation) => (
          <div key={cancellation.id} className="border border-gray-200 rounded-lg p-6">
            {/* Cancellation Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
                  <X className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Cancellation #{cancellation.id}</h3>
                  <p className="text-sm text-gray-600">Order #{cancellation.orderId}</p>
                </div>
              </div>
              <div className="text-right">
                <Badge className="bg-red-100 text-red-800">
                  {cancellation.status}
                </Badge>
                <p className="text-sm text-gray-600 mt-1">{cancellation.date}</p>
              </div>
            </div>

            {/* Cancelled Items */}
            <div className="space-y-4">
              {cancellation.items.map((item) => (
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
                    <p className="text-sm text-gray-600">Reason: {item.cancelReason}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">${item.price.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Refund Details */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Refund Amount</p>
                  <p className="font-semibold text-green-600">${cancellation.refundAmount.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Refund Status</p>
                  <Badge className={getRefundStatusColor(cancellation.refundStatus)}>
                    {cancellation.refundStatus}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Refund Date</p>
                  <p className="font-medium text-gray-900">{cancellation.refundDate}</p>
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
                Download Invoice
              </Button>
              <Button variant="outline" size="sm" className="border-gray-300">
                <RefreshCw className="w-4 h-4 mr-2" />
                Reorder
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {cancellations.length === 0 && (
        <div className="text-center py-12">
          <X className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Cancellations Yet</h3>
          <p className="text-gray-600 mb-6">You haven't cancelled any orders yet.</p>
          <Button asChild className="bg-red-500 hover:bg-red-600 text-white">
            <a href="/account/orders">View My Orders</a>
          </Button>
        </div>
      )}
    </AccountLayout>
  )
} 