"use client"

import * as React from "react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button"
import { Menu, ChevronDown, X } from "lucide-react"
import AccountSidebar from "./AccountSidebar"
import Link from "next/link"
import { useTranslations } from "next-intl"
import { usePathname } from "next/navigation"

// Mock user data
const userData = {
  firstName: "Md",
  lastName: "Rimel",
  email: "rimell111@gmail.com",
}

interface AccountLayoutProps {
  children: React.ReactNode
  title: string
  breadcrumbItems?: Array<{
    label: string
    href?: string
    isCurrent?: boolean
  }>
}

export default function AccountLayout({ children, title, breadcrumbItems = [] }: AccountLayoutProps) {
  const t = useTranslations('account')
  const tNav = useTranslations('navigation')
  const pathname = usePathname()
  
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)

  const isActive = (path: string) => pathname.includes(path)

  // Update open states when pathname changes
  React.useEffect(() => {
    setIsProfileOpen(isProfileSection)
    setIsOrdersOpen(isOrdersSection)
  }, [pathname, isProfileSection, isOrdersSection])

  // Close mobile menu when pathname changes
  React.useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-allowed mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              {/* Mobile Menu Button */}
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="lg:hidden p-2 hover:bg-gray-100"
                  >
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80 p-0">
                  <SheetHeader className="p-6 border-b">
                    <SheetTitle className="text-left">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-8 bg-red-500 rounded"></div>
                        <div>
                          <p className="text-sm text-red-600 font-medium">{t('account')}</p>
                          <h2 className="text-xl font-bold text-gray-900">{t('myAccount')}</h2>
                        </div>
                      </div>
                    </SheetTitle>
                  </SheetHeader>
                  
                  {/* Mobile Sidebar Content */}
                  <div className="p-6">
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
                </SheetContent>
              </Sheet>

              {/* Desktop Account Header */}
              <div className="hidden lg:flex items-center gap-3">
                <div className="w-2 h-8 bg-red-500 rounded"></div>
                <div>
                  <p className="text-sm text-red-600 font-medium">{t('account')}</p>
                  <h1 className="text-3xl font-bold text-gray-900">{t('myAccount')}</h1>
                </div>
              </div>

              {/* Mobile Account Header */}
              <div className="lg:hidden flex items-center gap-3">
                <div className="w-2 h-8 bg-red-500 rounded"></div>
                <div>
                  <p className="text-sm text-red-600 font-medium">{t('account')}</p>
                  <h1 className="text-2xl font-bold text-gray-900">{t('myAccount')}</h1>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">{t('welcome')}</p>
              <p className="font-semibold text-gray-900">{userData.firstName} {userData.lastName}</p>
            </div>
          </div>
          
          {/* Breadcrumb */}
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href={`/${currentLang}`}>{tNav('home')}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href={`/${currentLang}/account`}>{t('myAccount')}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              {breadcrumbItems.map((item, index) => (
                <React.Fragment key={index}>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    {item.isCurrent ? (
                      <BreadcrumbPage>{item.label}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink asChild>
                        <Link href={item.href || "#"}>
                          {item.label}
                        </Link>
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                </React.Fragment>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar - Desktop Only */}
          <div className="hidden lg:block lg:col-span-1">
            <AccountSidebar />
          </div>

          {/* Right Content Area */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 