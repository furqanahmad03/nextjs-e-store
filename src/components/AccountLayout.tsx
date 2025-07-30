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
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-allowed mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-2 h-8 bg-red-500 rounded"></div>
              <div>
                <p className="text-sm text-red-600 font-medium">Account</p>
                <h1 className="text-3xl font-bold text-gray-900">My Account</h1>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Welcome!</p>
              <p className="font-semibold text-gray-900">{userData.firstName} {userData.lastName}</p>
            </div>
          </div>
          
          {/* Breadcrumb */}
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/account">My Account</Link>
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