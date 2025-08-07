"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CreditCard, Edit, Trash2, Plus } from "lucide-react"
import AccountLayout from "@/components/AccountLayout"
import { useEffect } from "react"
import { useTranslations } from "next-intl"

// Mock payment methods data
const paymentMethods = [
  {
    id: 1,
    type: "Visa",
    name: "Md Rimel",
    number: "**** **** **** 1234",
    expiry: "12/25",
    isDefault: true
  },
  {
    id: 2,
    type: "Mastercard",
    name: "Md Rimel",
    number: "**** **** **** 5678",
    expiry: "09/26",
    isDefault: false
  },
  {
    id: 3,
    type: "American Express",
    name: "Md Rimel",
    number: "**** **** **** 9012",
    expiry: "03/27",
    isDefault: false
  }
]

export default function PaymentPage() {
  const t = useTranslations('accountPages.payment')

  useEffect(() => {
    document.title = `${t('title')} | E-Store`;
  }, [t]);

  return (
    <AccountLayout 
      title={t('title')}
      breadcrumbItems={[
        { label: t('title'), isCurrent: true }
      ]}
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-red-500">{t('title')}</h2>
        <Button className="bg-red-500 hover:bg-red-600 text-white">
          <Plus className="w-4 h-4 mr-2" />
          {t('addNewCard')}
        </Button>
      </div>
      
      <div className="space-y-4">
        {paymentMethods.map((method) => (
          <div key={method.id} className="border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-semibold text-gray-900">{method.type}</h3>
                    {method.isDefault && (
                      <Badge className="bg-green-100 text-green-800">
                        {t('defaultPayment')}
                      </Badge>
                    )}
                  </div>
                  <p className="text-gray-600 mb-1">{method.name}</p>
                  <p className="text-sm text-gray-500">{method.number} • Expires {method.expiry}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="border-gray-300">
                  <Edit className="w-4 h-4 mr-2" />
                  {t('editCard')}
                </Button>
                <Button variant="outline" size="sm" className="border-red-300 text-red-600 hover:bg-red-50">
                  <Trash2 className="w-4 h-4 mr-2" />
                  {t('deleteCard')}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {paymentMethods.length === 0 && (
        <div className="text-center py-12">
          <CreditCard className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Payment Methods Yet</h3>
          <p className="text-gray-600 mb-6">{t('noCards')}</p>
          <Button className="bg-red-500 hover:bg-red-600 text-white">
            <Plus className="w-4 h-4 mr-2" />
            Add Your First Payment Method
          </Button>
        </div>
      )}
    </AccountLayout>
  )
} 