"use client"

import * as React from "react"
import { Send, Facebook, Twitter, Instagram, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="w-full bg-black text-white">
      {/* Main Footer Content */}
      <div className="max-w-allowed mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Column 1: Exclusive */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Exclusive</h3>
            <div>
              <h4 className="font-bold mb-2">Subscribe</h4>
              <p className="text-gray-300 mb-4 text-sm">Get 10% off your first order</p>
              <div className="relative">
                <Input
                  type="email"
                  placeholder="Enter your email"
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
            <h3 className="text-xl font-bold">Support</h3>
            <div className="space-y-2 text-gray-300 text-sm">
              <p>111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.</p>
              <p><Link href="mailto:exclusive@gmail.com">exclusive@gmail.com</Link></p>
              <p><Link href="tel:+88015-88888-9999">+88015-88888-9999</Link></p>
            </div>
          </div>

          {/* Column 3: Account */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Account</h3>
            <div className="space-y-2 text-sm">
              <Link href="/account" className="block text-gray-300 hover:text-white transition-colors">My Account</Link>
              <Link href="/auth/sign-in" className="block text-gray-300 hover:text-white transition-colors">Login / Register</Link>
              <Link href="/cart" className="block text-gray-300 hover:text-white transition-colors">Cart</Link>
              <Link href="/account/wishlist" className="block text-gray-300 hover:text-white transition-colors">Wishlist</Link>
              <Link href="/products" className="block text-gray-300 hover:text-white transition-colors">Shop</Link>
            </div>
          </div>

          {/* Column 4: Quick Link */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Quick Link</h3>
            <div className="space-y-2 text-sm">
              <Link href="/privacy" className="block text-gray-300 hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="block text-gray-300 hover:text-white transition-colors">Terms Of Use</Link>
              <Link href="/faqs" className="block text-gray-300 hover:text-white transition-colors">FAQs</Link>
              <Link href="/contact" className="block text-gray-300 hover:text-white transition-colors">Contact</Link>
            </div>
          </div>

          {/* Column 5: Download App */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Download App</h3>
            <p className="text-gray-300 mb-4 text-sm">Save $3 with App New User Only</p>
          </div>
        </div>
      </div>

      {/* Bottom Section - Social Media & Copyright */}
      <div className="border-t border-gray-700">
        <div className="max-w-allowed mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <p className="text-gray-400 text-sm">
              © Copyright Rimel 2022. All right reserved
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