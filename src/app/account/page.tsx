"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Package, Heart, CreditCard } from "lucide-react"
import Link from "next/link"
import AccountLayout from "@/components/AccountLayout"
import { useEffect } from "react"

export default function AccountPage() {
  useEffect(() => {
    document.title = "Account Overview | E-Store";
  }, []);

  return (
    <AccountLayout title="Account Overview">
      <h2 className="text-xl font-bold text-red-500 mb-6">Account Overview</h2>
      
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-600 font-medium">Total Orders</p>
              <p className="text-2xl font-bold text-blue-900">12</p>
            </div>
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-600 font-medium">Wishlist Items</p>
              <p className="text-2xl font-bold text-green-900">8</p>
            </div>
            <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-purple-600 font-medium">Total Spent</p>
              <p className="text-2xl font-bold text-purple-900">$2,450</p>
            </div>
            <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
        
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
              <Package className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-900">Order #ORD-001 Delivered</p>
              <p className="text-sm text-gray-600">Your order has been successfully delivered</p>
            </div>
            <span className="text-sm text-gray-500">2 days ago</span>
          </div>

          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-900">Added to Wishlist</p>
              <p className="text-sm text-gray-600">Wireless Headphones added to your wishlist</p>
            </div>
            <span className="text-sm text-gray-500">1 week ago</span>
          </div>

          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-900">Payment Method Updated</p>
              <p className="text-sm text-gray-600">New credit card added to your account</p>
            </div>
            <span className="text-sm text-gray-500">2 weeks ago</span>
          </div>
        </div>
      </div>
    </AccountLayout>
  )
} 