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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-allowed mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-2 h-8 bg-red-500 rounded"></div>
              <div>
                <p className="text-sm text-red-600 font-medium">{t('account')}</p>
                <h1 className="text-3xl font-bold text-gray-900">{t('myAccount')}</h1>
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
          {/* Left Sidebar */}
          <div className="lg:col-span-1">
            <AccountSidebar />
          </div>

          {/* Right Content Area */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 