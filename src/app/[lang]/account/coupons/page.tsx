"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Copy, CheckCircle, AlertCircle, Info } from "lucide-react"
import AccountLayout from "@/components/AccountLayout"
import Link from "next/link"
import { useEffect } from "react"
import { useTranslations } from "next-intl"
import { usePathname } from "next/navigation"

// Available coupon codes
const availableCoupons = [
  {
    code: "SAVE10",
    title: "10% Off Your Order",
    description: "Get 10% discount on your entire order",
    discount: "10%",
    minOrder: "$50",
    maxDiscount: "No limit",
    validUntil: "December 31, 2024",
    usage: "One-time use per customer",
    category: "General",
    isActive: true
  },
  {
    code: "SAVE20",
    title: "20% Off Your Order",
    description: "Get 20% discount on your entire order",
    discount: "20%",
    minOrder: "$100",
    maxDiscount: "No limit",
    validUntil: "December 31, 2024",
    usage: "One-time use per customer",
    category: "General",
    isActive: true
  },
  {
    code: "WELCOME",
    title: "Welcome Discount",
    description: "Special 15% discount for new customers",
    discount: "15%",
    minOrder: "$30",
    maxDiscount: "No limit",
    validUntil: "December 31, 2024",
    usage: "New customers only",
    category: "New Customer",
    isActive: true
  },
  {
    code: "FLASH50",
    title: "Flash Sale - 50% Off",
    description: "Limited time 50% discount on selected items",
    discount: "50%",
    minOrder: "$200",
    maxDiscount: "$100",
    validUntil: "January 15, 2024",
    usage: "Limited time offer",
    category: "Flash Sale",
    isActive: true
  },
  {
    code: "FREESHIP",
    title: "Free Shipping",
    description: "Free shipping on your order",
    discount: "Free Shipping",
    minOrder: "$25",
    maxDiscount: "Shipping cost",
    validUntil: "December 31, 2024",
    usage: "Unlimited use",
    category: "Shipping",
    isActive: true
  },
  {
    code: "HOLIDAY25",
    title: "Holiday Special",
    description: "25% off for holiday season",
    discount: "25%",
    minOrder: "$75",
    maxDiscount: "$150",
    validUntil: "January 31, 2024",
    usage: "One-time use",
    category: "Seasonal",
    isActive: true
  }
]

const getCategoryColor = (category: string) => {
  switch (category) {
    case "Flash Sale":
      return "bg-red-100 text-red-800"
    case "New Customer":
      return "bg-blue-100 text-blue-800"
    case "Seasonal":
      return "bg-green-100 text-green-800"
    case "Shipping":
      return "bg-purple-100 text-purple-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export default function CouponsPage() {
  const t = useTranslations('accountPages.coupons')
  const pathname = usePathname()
  
  // Extract current language from pathname
  const currentLang = pathname.split('/')[1] || 'en'

  useEffect(() => {
    document.title = `${t('title')} | E-Store`;
  }, [t]);

  const [copiedCode, setCopiedCode] = React.useState<string | null>(null)

  const copyToClipboard = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code)
      setCopiedCode(code)
      setTimeout(() => setCopiedCode(null), 2000)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  return (
    <AccountLayout 
      title={t('title')}
      breadcrumbItems={[
        { label: t('title'), isCurrent: true }
      ]}
    >
      <h2 className="text-xl font-bold text-red-500 mb-6">{t('availableCouponsTitle')}</h2>

      {/* Info Section */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <h3 className="font-medium text-blue-900 mb-1">{t('howToUseCouponCodeTitle')}</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• {t('howToUseCouponCodeStep1')}</li>
              <li>• {t('howToUseCouponCodeStep2')}</li>
              <li>• {t('howToUseCouponCodeStep3')}</li>
              <li>• {t('howToUseCouponCodeStep4')}</li>
              <li>• {t('howToUseCouponCodeStep5')}</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Coupons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {availableCoupons.map((coupon) => (
          <Card key={coupon.code} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">{coupon.title}</CardTitle>
                  <CardDescription className="mt-2">
                    {coupon.description}
                  </CardDescription>
                </div>
                <Badge className={getCategoryColor(coupon.category)}>
                  {coupon.category}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Coupon Code */}
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-lg text-gray-900">
                      {coupon.code}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(coupon.code)}
                      className="ml-2"
                    >
                      {copiedCode === coupon.code ? (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                  {copiedCode === coupon.code && (
                    <p className="text-xs text-green-600 mt-1">{t('copiedToClipboard')}</p>
                  )}
                </div>

                {/* Coupon Details */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t('discount')}:</span>
                    <span className="font-semibold text-green-600">{coupon.discount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t('minOrder')}:</span>
                    <span className="font-medium">{coupon.minOrder}</span>
                  </div>
                  {coupon.maxDiscount !== "No limit" && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t('maxDiscount')}:</span>
                      <span className="font-medium">{coupon.maxDiscount}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t('validUntil')}:</span>
                    <span className="font-medium">{coupon.validUntil}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t('usage')}:</span>
                    <span className="font-medium">{coupon.usage}</span>
                  </div>
                </div>

                {/* Status */}
                <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
                  {coupon.isActive ? (
                    <>
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-green-600 font-medium">{t('active')}</span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-4 h-4 text-red-600" />
                      <span className="text-sm text-red-600 font-medium">{t('expired')}</span>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mt-8 text-center">
        <Button asChild className="bg-red-500 hover:bg-red-600 text-white">
          <Link href="/checkout">{t('goToCheckout')}</Link>
        </Button>
      </div>
    </AccountLayout>
  )
} 