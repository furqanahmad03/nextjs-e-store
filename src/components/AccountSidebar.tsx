"use client"

import * as React from "react"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronDown } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTranslations } from "next-intl"

export default function AccountSidebar() {
  const pathname = usePathname()
  const t = useTranslations('account')
  
  // Extract current language from pathname
  const currentLang = pathname.split('/')[1] || 'en'
  
  // Determine which section should be open based on current path
  const isProfileSection = pathname.includes('/account/profile') || 
                          pathname.includes('/account/address') || 
                          pathname.includes('/account/payment')
  
  const isOrdersSection = pathname.includes('/account/orders') || 
                         pathname.includes('/account/returns') || 
                         pathname.includes('/account/cancellations') ||
                         pathname.includes('/account/coupons')
  
  const [isProfileOpen, setIsProfileOpen] = React.useState(isProfileSection)
  const [isOrdersOpen, setIsOrdersOpen] = React.useState(isOrdersSection)

  const isActive = (path: string) => pathname.includes(path)

  // Update open states when pathname changes
  React.useEffect(() => {
    setIsProfileOpen(isProfileSection)
    setIsOrdersOpen(isOrdersSection)
  }, [pathname, isProfileSection, isOrdersSection])

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 h-fit sticky top-8">
      <nav className="space-y-6">
        {/* Manage My Account Section */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-3">{t('manageMyAccount')}</h3>
          <Collapsible open={isProfileOpen} onOpenChange={setIsProfileOpen}>
            <CollapsibleTrigger asChild>
              <button className="flex items-center justify-between w-full text-left text-sm text-gray-700 hover:text-gray-900 py-2">
                <span>{t('myProfile')}</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
              </button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-2 mt-2">
              <Link 
                href={`/${currentLang}/account/profile`}
                className={`block text-sm py-2 px-3 rounded-md transition-colors ${
                  isActive('/account/profile') 
                    ? 'bg-red-500 text-white' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {t('myProfile')}
              </Link>
              <Link 
                href={`/${currentLang}/account/address`}
                className={`block text-sm py-2 px-3 rounded-md transition-colors ${
                  isActive('/account/address') 
                    ? 'bg-red-500 text-white' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {t('addressBook')}
              </Link>
              <Link 
                href={`/${currentLang}/account/payment`}
                className={`block text-sm py-2 px-3 rounded-md transition-colors ${
                  isActive('/account/payment') 
                    ? 'bg-red-500 text-white' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {t('myPaymentOptions')}
              </Link>
            </CollapsibleContent>
          </Collapsible>
        </div>

        {/* My Orders Section */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-3">{t('myOrders')}</h3>
          <Collapsible open={isOrdersOpen} onOpenChange={setIsOrdersOpen}>
            <CollapsibleTrigger asChild>
              <button className="flex items-center justify-between w-full text-left text-sm text-gray-700 hover:text-gray-900 py-2">
                <span>{t('orders')}</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${isOrdersOpen ? 'rotate-180' : ''}`} />
              </button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-2 mt-2">
              <Link 
                href={`/${currentLang}/account/orders`}
                className={`block text-sm py-2 px-3 rounded-md transition-colors ${
                  isActive('/account/orders') 
                    ? 'bg-red-500 text-white' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {t('myOrders')}
              </Link>
              <Link 
                href={`/${currentLang}/account/returns`}
                className={`block text-sm py-2 px-3 rounded-md transition-colors ${
                  isActive('/account/returns') 
                    ? 'bg-red-500 text-white' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {t('myReturns')}
              </Link>
              <Link 
                href={`/${currentLang}/account/cancellations`}
                className={`block text-sm py-2 px-3 rounded-md transition-colors ${
                  isActive('/account/cancellations') 
                    ? 'bg-red-500 text-white' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {t('myCancellations')}
              </Link>
              <Link 
                href={`/${currentLang}/account/coupons`}
                className={`block text-sm py-2 px-3 rounded-md transition-colors ${
                  isActive('/account/coupons') 
                    ? 'bg-red-500 text-white' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {t('availableCoupons')}
              </Link>
            </CollapsibleContent>
          </Collapsible>
        </div>

        {/* My WishList */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-3">{t('myWishList')}</h3>
          <Link 
            href={`/${currentLang}/account/wishlist`}
            className={`block text-sm py-2 px-3 rounded-md transition-colors ${
              isActive('/account/wishlist') 
                ? 'bg-red-500 text-white' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            {t('myWishList')}
          </Link>
        </div>
      </nav>
    </div>
  )
} 