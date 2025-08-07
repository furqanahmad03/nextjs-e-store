"use client"

import * as React from "react"
import Link from "next/link"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Shield, CreditCard, Truck, AlertTriangle, Calendar, Users } from "lucide-react"
import { useTranslations } from "next-intl"
import { usePathname } from "next/navigation"
import { useEffect } from "react"

export default function TermsOfUsePage() {
  const t = useTranslations('terms')
  const pathname = usePathname()
  
  // Extract current language from pathname
  const currentLang = pathname.split('/')[1] || 'en'

  useEffect(() => {
    document.title = `${t('title')} | E-Store`;
  }, [t]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-allowed mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-2 h-8 bg-red-500 rounded"></div>
            <div>
              <p className="text-sm text-red-600 font-medium">{t('legal')}</p>
              <h1 className="text-3xl font-bold text-gray-900">{t('termsOfUse')}</h1>
            </div>
          </div>

          {/* Breadcrumb */}
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href={`/${currentLang}`}>{t('home')}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{t('termsOfUse')}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Last Updated */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-600" />
            <p className="text-blue-800">
              <span className="font-semibold">{t('lastUpdated')}</span> {t('lastUpdatedDate')}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Agreement */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-red-500" />
                  Agreement to Terms
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-700">
                <p>
                  These Terms of Use (&quot;Terms&quot;) govern your use of the Eco-Site website and services. 
                  By accessing or using our website, you agree to be bound by these Terms and all applicable laws and regulations.
                </p>
                <p>
                  If you do not agree with any of these terms, you are prohibited from using or accessing this site. 
                  The materials contained in this website are protected by applicable copyright and trademark law.
                </p>
              </CardContent>
            </Card>

            {/* Use License */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-red-500" />
                  Use License
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-700">
                <p>Permission is granted to temporarily download one copy of the materials on Eco-Site&apos;s website for personal, non-commercial transitory viewing only.</p>
                <p>This is the grant of a license, not a transfer of title, and under this license you may not:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Modify or copy the materials</li>
                  <li>Use the materials for any commercial purpose or for any public display</li>
                  <li>Attempt to reverse engineer any software contained on the website</li>
                  <li>Remove any copyright or other proprietary notations from the materials</li>
                  <li>Transfer the materials to another person or &quot;mirror&quot; the materials on any other server</li>
                </ul>
              </CardContent>
            </Card>

            {/* Account Registration */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-red-500" />
                  Account Registration and Responsibilities
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-700">
                <p>To access certain features of our website, you may be required to create an account. You agree to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Provide accurate, current, and complete information during registration</li>
                  <li>Maintain and update your account information</li>
                  <li>Keep your password secure and confidential</li>
                  <li>Accept responsibility for all activities under your account</li>
                  <li>Notify us immediately of any unauthorized use of your account</li>
                </ul>
                <p>We reserve the right to terminate accounts that violate these terms or for any other reason at our discretion.</p>
              </CardContent>
            </Card>

            {/* Purchase Terms */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-red-500" />
                  Purchase Terms and Conditions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-700">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Order Acceptance</h4>
                  <p>All orders are subject to acceptance and availability. We reserve the right to refuse any order for any reason.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Pricing</h4>
                  <p>All prices are subject to change without notice. Prices do not include applicable taxes, shipping, or handling fees.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Payment</h4>
                  <p>Payment must be made at the time of order placement. We accept major credit cards and other payment methods as indicated on our website.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Order Confirmation</h4>
                  <p>You will receive an order confirmation email once your order is successfully placed and payment is processed.</p>
                </div>
              </CardContent>
            </Card>

            {/* Shipping and Delivery */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="w-5 h-5 text-red-500" />
                  Shipping and Delivery
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-700">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Shipping Methods</h4>
                  <p>We offer various shipping options with different delivery times and costs. Shipping times are estimates and may vary.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Delivery</h4>
                  <p>Risk of loss and title for items purchased pass to you upon delivery of the items to the carrier.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">International Shipping</h4>
                  <p>International orders may be subject to additional customs duties, taxes, and fees that are the responsibility of the customer.</p>
                </div>
              </CardContent>
            </Card>

            {/* Returns and Refunds */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                  Returns and Refunds
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-700">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Return Policy</h4>
                  <p>Most items can be returned within 30 days of delivery for a full refund or exchange, subject to our return policy conditions.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Return Conditions</h4>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Items must be unused and in original packaging</li>
                    <li>Some items may not be eligible for return</li>
                    <li>Return shipping costs may apply</li>
                    <li>Refunds will be processed within 5-7 business days</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Intellectual Property */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-red-500" />
                  Intellectual Property Rights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-700">
                <p>The content on this website, including but not limited to text, graphics, images, logos, and software, is the property of Eco-Site and is protected by copyright laws.</p>
                <p>You may not reproduce, distribute, modify, or create derivative works from any content on this website without our express written consent.</p>
              </CardContent>
            </Card>

            {/* Disclaimers */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                  Disclaimers and Limitations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-700">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Website Availability</h4>
                  <p>We strive to maintain website availability but do not guarantee uninterrupted access. We may suspend or terminate access at any time.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Product Information</h4>
                  <p>While we strive for accuracy, product descriptions, prices, and availability are subject to change without notice.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Limitation of Liability</h4>
                  <p>In no event shall Eco-Site be liable for any indirect, incidental, special, or consequential damages arising from your use of our website or services.</p>
                </div>
              </CardContent>
            </Card>

            {/* Governing Law */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-red-500" />
                  Governing Law and Jurisdiction
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-700">
                <p>These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which Eco-Site operates.</p>
                <p>Any disputes arising from these Terms or your use of our website shall be resolved in the courts of competent jurisdiction in our operating jurisdiction.</p>
              </CardContent>
            </Card>

            {/* Changes to Terms */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-red-500" />
                  Changes to Terms
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-700">
                <p>We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting on our website.</p>
                <p>Your continued use of our website after changes are posted constitutes acceptance of the modified Terms.</p>
                <p>We encourage you to review these Terms periodically for any updates.</p>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-red-500" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-700">
                <p>If you have any questions about these Terms of Use, please contact us:</p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p><strong>Email:</strong> legal@eco-site.com</p>
                  <p><strong>Phone:</strong> +1 (555) 123-4567</p>
                  <p><strong>Address:</strong> 123 Commerce St, Business City, BC 12345</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Links */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Link href="/privacy" className="block text-red-500 hover:text-red-600 hover:underline">
                  Privacy Policy
                </Link>
                <Link href="/contact" className="block text-gray-600 hover:text-gray-800 hover:underline">
                  Contact Us
                </Link>
                <Link href="/about" className="block text-gray-600 hover:text-gray-800 hover:underline">
                  About Us
                </Link>
              </CardContent>
            </Card>

            {/* Legal Support */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Legal Questions?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-gray-600">
                  Need clarification on our terms?
                </p>
                <Link 
                  href="/contact" 
                  className="inline-block bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm transition-colors"
                >
                  Contact Legal Team
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
} 