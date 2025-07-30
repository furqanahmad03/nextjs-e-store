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

// Mock user data
const userData = {
  firstName: "Md",
  lastName: "Rimel",
  email: "rimell111@gmail.com",
}

export default function AccountSidebar() {
  const pathname = usePathname()
  
  // Determine which section should be open based on current path
  const isProfileSection = pathname === '/account/profile' || 
                          pathname === '/account/address' || 
                          pathname === '/account/payment'
  
  const isOrdersSection = pathname === '/account/orders' || 
                         pathname === '/account/returns' || 
                         pathname === '/account/cancellations' ||
                         pathname === '/account/coupons'
  
  const [isProfileOpen, setIsProfileOpen] = React.useState(isProfileSection)
  const [isOrdersOpen, setIsOrdersOpen] = React.useState(isOrdersSection)

  const isActive = (path: string) => pathname === path

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
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Manage My Account</h3>
          <Collapsible open={isProfileOpen} onOpenChange={setIsProfileOpen}>
            <CollapsibleTrigger asChild>
              <button className="flex items-center justify-between w-full text-left text-sm text-gray-700 hover:text-gray-900 py-2">
                <span>My Profile</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
              </button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-2 mt-2">
              <Link 
                href="/account/profile" 
                className={`block text-sm py-2 px-3 rounded-md transition-colors ${
                  isActive('/account/profile') 
                    ? 'bg-red-500 text-white' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                My Profile
              </Link>
              <Link 
                href="/account/address" 
                className={`block text-sm py-2 px-3 rounded-md transition-colors ${
                  isActive('/account/address') 
                    ? 'bg-red-500 text-white' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                Address Book
              </Link>
              <Link 
                href="/account/payment" 
                className={`block text-sm py-2 px-3 rounded-md transition-colors ${
                  isActive('/account/payment') 
                    ? 'bg-red-500 text-white' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                My Payment Options
              </Link>
            </CollapsibleContent>
          </Collapsible>
        </div>

        {/* My Orders Section */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-3">My Orders</h3>
          <Collapsible open={isOrdersOpen} onOpenChange={setIsOrdersOpen}>
            <CollapsibleTrigger asChild>
              <button className="flex items-center justify-between w-full text-left text-sm text-gray-700 hover:text-gray-900 py-2">
                <span>Orders</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${isOrdersOpen ? 'rotate-180' : ''}`} />
              </button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-2 mt-2">
              <Link 
                href="/account/orders" 
                className={`block text-sm py-2 px-3 rounded-md transition-colors ${
                  isActive('/account/orders') 
                    ? 'bg-red-500 text-white' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                My Orders
              </Link>
              <Link 
                href="/account/returns" 
                className={`block text-sm py-2 px-3 rounded-md transition-colors ${
                  isActive('/account/returns') 
                    ? 'bg-red-500 text-white' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                My Returns
              </Link>
              <Link 
                href="/account/cancellations" 
                className={`block text-sm py-2 px-3 rounded-md transition-colors ${
                  isActive('/account/cancellations') 
                    ? 'bg-red-500 text-white' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                My Cancellations
              </Link>
              <Link 
                href="/account/coupons" 
                className={`block text-sm py-2 px-3 rounded-md transition-colors ${
                  isActive('/account/coupons') 
                    ? 'bg-red-500 text-white' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                Available Coupons
              </Link>
            </CollapsibleContent>
          </Collapsible>
        </div>

        {/* My WishList */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-3">My WishList</h3>
          <Link 
            href="/account/wishlist" 
            className={`block text-sm py-2 px-3 rounded-md transition-colors ${
              isActive('/account/wishlist') 
                ? 'bg-red-500 text-white' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            My WishList
          </Link>
        </div>
      </nav>
    </div>
  )
} 