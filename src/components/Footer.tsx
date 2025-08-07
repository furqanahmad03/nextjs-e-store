"use client"

import * as React from "react"
import { Send, Facebook, Twitter, Instagram, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useTranslations } from "next-intl"
import { usePathname } from "next/navigation"

export default function Footer() {
  const t = useTranslations('footer')
  const pathname = usePathname()
  
  // Extract current language from pathname
  const currentLang = pathname.split('/')[1] || 'en'

  return (
    <footer className="w-full bg-black text-white">
      {/* Main Footer Content */}
      <div className="max-w-allowed mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Column 1: Exclusive */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">{t('exclusive')}</h3>
            <div>
              <h4 className="font-bold mb-2">{t('subscribe')}</h4>
              <p className="text-gray-300 mb-4 text-sm">{t('subscribeText')}</p>
              <div className="relative">
                <Input
                  type="email"
                  placeholder={t('emailPlaceholder')}
                  className="bg-transparent border-gray-500 text-white placeholder-gray-400 pr-12"
                />
                <Button
                  size="sm"
                  className="absolute right-0 top-0 bg-transparent text-gray-300 hover:bg-gray-100 p-2 h-9 w-9"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Column 2: Support */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">{t('support')}</h3>
            <div className="space-y-2 text-gray-300 text-sm">
              <p>{t('supportAddress')}</p>
              <p><Link href="mailto:exclusive@gmail.com">{t('supportEmail')}</Link></p>
              <p><Link href="tel:+88015-88888-9999">{t('supportPhone')}</Link></p>
            </div>
          </div>

          {/* Column 3: Account */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">{t('account')}</h3>
            <div className="space-y-2 text-sm">
              <Link href={`/${currentLang}/account`} className="block text-gray-300 hover:text-white transition-colors">{t('myAccount')}</Link>
              <Link href={`/${currentLang}/auth/signin`} className="block text-gray-300 hover:text-white transition-colors">{t('loginRegister')}</Link>
              <Link href={`/${currentLang}/cart`} className="block text-gray-300 hover:text-white transition-colors">{t('cart')}</Link>
              <Link href={`/${currentLang}/account/wishlist`} className="block text-gray-300 hover:text-white transition-colors">{t('wishlist')}</Link>
              <Link href={`/${currentLang}/products`} className="block text-gray-300 hover:text-white transition-colors">{t('shop')}</Link>
            </div>
          </div>

          {/* Column 4: Quick Link */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">{t('quickLink')}</h3>
            <div className="space-y-2 text-sm">
              <Link href={`/${currentLang}/privacy`} className="block text-gray-300 hover:text-white transition-colors">{t('privacyPolicy')}</Link>
              <Link href={`/${currentLang}/terms`} className="block text-gray-300 hover:text-white transition-colors">{t('termsOfUse')}</Link>
              <Link href={`/${currentLang}/faqs`} className="block text-gray-300 hover:text-white transition-colors">{t('faqs')}</Link>
              <Link href={`/${currentLang}/contact`} className="block text-gray-300 hover:text-white transition-colors">{t('contact')}</Link>
            </div>
          </div>

          {/* Column 5: Download App */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">{t('downloadApp')}</h3>
            <p className="text-gray-300 mb-4 text-sm">{t('downloadAppText')}</p>
          </div>
        </div>
      </div>

      {/* Bottom Section - Social Media & Copyright */}
      <div className="border-t border-gray-700">
        <div className="max-w-allowed mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <p className="text-gray-400 text-sm">
              {t('copyright')}
            </p>
            
            {/* Social Media Icons */}
            <div className="flex space-x-4">
              <Link href="https://www.x.com/furqanahmad03" className="text-white hover:text-gray-300 transition-colors">
                <Facebook className="w-5 h-5" />
              </Link>
              <Link href="https://www.x.com/furqanahmad03" className="text-white hover:text-gray-300 transition-colors">
                <Twitter className="w-5 h-5" />
              </Link>
              <Link href="https://www.instagram.com/furqanahmad03" className="text-white hover:text-gray-300 transition-colors">
                <Instagram className="w-5 h-5" />
              </Link>
              <Link href="https://www.linkedin.com/in/furqanahmad03" className="text-white hover:text-gray-300 transition-colors">
                <Linkedin className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 