"use client"

import * as React from "react"
import { Package, Heart, CreditCard } from "lucide-react"
import AccountLayout from "@/components/AccountLayout"
import { useEffect } from "react"
import { useTranslations } from "next-intl"

export default function AccountPage() {
  const t = useTranslations('accountPages')

  useEffect(() => {
    document.title = `${t('accountOverview')} | E-Store`;
  }, [t]);

  return (
    <AccountLayout title={t('accountOverview')}>
      <h2 className="text-xl font-bold text-red-500 mb-6">{t('accountOverview')}</h2>
      
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-600 font-medium">{t('totalOrders')}</p>
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
              <p className="text-sm text-green-600 font-medium">{t('wishlistItems')}</p>
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
              <p className="text-sm text-purple-600 font-medium">{t('totalSpent')}</p>
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
        <h3 className="text-lg font-semibold text-gray-900">{t('recentActivity')}</h3>
        
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
              <Package className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-900">{t('orderDelivered')}</p>
              <p className="text-sm text-gray-600">{t('orderDeliveredDesc')}</p>
            </div>
            <span className="text-sm text-gray-500">2 {t('daysAgo')}</span>
          </div>

          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-900">{t('addedToWishlist')}</p>
              <p className="text-sm text-gray-600">{t('addedToWishlistDesc')}</p>
            </div>
            <span className="text-sm text-gray-500">1 {t('weekAgo')}</span>
          </div>

          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-900">{t('paymentMethodUpdated')}</p>
              <p className="text-sm text-gray-600">{t('paymentMethodUpdatedDesc')}</p>
            </div>
            <span className="text-sm text-gray-500">2 {t('weeksAgo')}</span>
          </div>
        </div>
      </div>
    </AccountLayout>
  )
} 