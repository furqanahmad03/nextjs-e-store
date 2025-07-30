"use client"

import * as React from "react"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

const womenFashionItems = [
  { title: "Shoes", href: "/products?category=Woman+Fashion&subCategory=Shoes" },
  { title: "Clothes", href: "/products?category=Woman+Fashion&subCategory=Clothes" },
  { title: "Bags", href: "/products?category=Woman+Fashion&subCategory=Bags" },
  { title: "Accessories", href: "/products?category=Woman+Fashion&subCategory=Accessories" },
  { title: "Jewelry", href: "/products?category=Woman+Fashion&subCategory=Jewelry" },
  { title: "Watches", href: "/products?category=Woman+Fashion&subCategory=Watches" },
]

const menFashionItems = [
  { title: "Shoes", href: "/products?category=Men+Fashion&subCategory=Shoes" },
  { title: "Clothes", href: "/products?category=Men+Fashion&subCategory=Clothes" },
  { title: "Bags", href: "/products?category=Men+Fashion&subCategory=Bags" },
  { title: "Accessories", href: "/products?category=Men+Fashion&subCategory=Accessories" },
  { title: "Watches", href: "/products?category=Men+Fashion&subCategory=Watches" },
  { title: "Sunglasses", href: "/products?category=Men+Fashion&subCategory=Sunglasses" },
]

export default function SideBar() {
  return (
    <div className="min-w-[200px] bg-white border-r border-gray-200 shadow-sm relative">
      <div className="p-3">
        <h2 className="text-base font-semibold text-gray-900 mb-3">Categories</h2>
        <NavigationMenu orientation="vertical" className="w-full" viewport={false}>
          <NavigationMenuList className="flex-col items-start">
            {/* Women's Fashion - Expandable */}
            <NavigationMenuItem className="w-full relative">
              <NavigationMenuTrigger className="w-full justify-between px-2 py-1.5 text-sm">
                Women's Fashion
              </NavigationMenuTrigger>
              <NavigationMenuContent className="absolute left-full !top-[-5px] ml-1 z-50">
                <ul className="grid w-[150px] bg-white">
                  {womenFashionItems.map((item) => (
                    <ListItem key={item.title} title={item.title} href={item.href}>
                      {item.title}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* Men's Fashion - Expandable */}
            <NavigationMenuItem className="w-full relative">
              <NavigationMenuTrigger className="w-full justify-between px-2 py-1.5 text-sm">
                Men's Fashion
              </NavigationMenuTrigger>
              <NavigationMenuContent className="absolute left-full !top-[-5px] ml-1 z-50">
                <ul className="grid w-[150px] bg-white p-0">
                  {menFashionItems.map((item) => (
                    <ListItem key={item.title} title={item.title} href={item.href} className="!p-0">
                      {item.title}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* Simple Links - Non-expandable */}
            <NavigationMenuItem className="w-full">
              <NavigationMenuLink asChild>
                <Link 
                  href="/products?category=Electronics"
                  className="block w-full px-2 py-1.5 text-sm font-medium text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
                >
                  Electronics
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem className="w-full">
              <NavigationMenuLink asChild>
                <Link 
                  href="/products?category=Home+Lifestyle"
                  className="block w-full px-2 py-1.5 text-sm font-medium text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
                >
                  Home & Lifestyle
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem className="w-full">
              <NavigationMenuLink asChild>
                <Link 
                  href="/products?category=Medicine"
                  className="block w-full px-2 py-1.5 text-sm font-medium text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
                >
                  Medicine
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem className="w-full">
              <NavigationMenuLink asChild>
                <Link 
                  href="/products?category=Sports+Outdoor"
                  className="block w-full px-2 py-1.5 text-sm font-medium text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
                >
                  Sports & Outdoor
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem className="w-full">
              <NavigationMenuLink asChild>
                <Link 
                  href="/products?category=Babies+Toys"
                  className="block w-full px-2 py-1.5 text-sm font-medium text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
                >
                  Babies & Toys
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem className="w-full">
              <NavigationMenuLink asChild>
                <Link 
                  href="/products?category=Groceries+Pets"
                  className="block w-full px-2 py-1.5 text-sm font-medium text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
                >
                  Groceries & Pets
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem className="w-full">
              <NavigationMenuLink asChild>
                <Link 
                    href="/products?category=Health+Beauty"
                  className="block w-full px-2 py-1.5 text-sm font-medium text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
                >
                  Health & Beauty
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  )
}

function ListItem({
  title,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link 
          href={href}
        >
          <div className="text-sm font-medium leading-none text-gray-900 px-1.5 py-0.5">{title}</div>
        </Link>
      </NavigationMenuLink>
    </li>
  )
} 