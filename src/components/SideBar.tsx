"use client"

import * as React from "react"
import Link from "next/link"
import { useTranslations } from "next-intl"
import { usePathname } from "next/navigation"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

export default function SideBar() {
  const t = useTranslations('sidebar')
  const pathname = usePathname()
  
  // Extract current language from pathname
  const currentLang = pathname.split('/')[1] || 'en'

  const womenFashionItems = [
    { title: t('shoes'), href: `/${currentLang}/products?category=Woman+Fashion&subCategory=Shoes` },
    { title: t('clothes'), href: `/${currentLang}/products?category=Woman+Fashion&subCategory=Clothes` },
    { title: t('bags'), href: `/${currentLang}/products?category=Woman+Fashion&subCategory=Bags` },
    { title: t('accessories'), href: `/${currentLang}/products?category=Woman+Fashion&subCategory=Accessories` },
    { title: t('jewelry'), href: `/${currentLang}/products?category=Woman+Fashion&subCategory=Jewelry` },
    { title: t('watches'), href: `/${currentLang}/products?category=Woman+Fashion&subCategory=Watches` },
  ]

  const menFashionItems = [
    { title: t('shoes'), href: `/${currentLang}/products?category=Men+Fashion&subCategory=Shoes` },
    { title: t('clothes'), href: `/${currentLang}/products?category=Men+Fashion&subCategory=Clothes` },
    { title: t('bags'), href: `/${currentLang}/products?category=Men+Fashion&subCategory=Bags` },
    { title: t('accessories'), href: `/${currentLang}/products?category=Men+Fashion&subCategory=Accessories` },
    { title: t('watches'), href: `/${currentLang}/products?category=Men+Fashion&subCategory=Watches` },
    { title: t('sunglasses'), href: `/${currentLang}/products?category=Men+Fashion&subCategory=Sunglasses` },
  ]

  return (
    <div className="min-w-[200px] hidden md:block bg-white border-r border-gray-200 shadow-sm relative">
      <div className="p-3">
        <h2 className="text-base font-semibold text-gray-900 mb-3">{t('categories')}</h2>
        <NavigationMenu orientation="vertical" className="w-full" viewport={false}>
          <NavigationMenuList className="flex-col items-start">
            {/* Women's Fashion - Expandable */}
            <NavigationMenuItem className="w-full relative">
              <NavigationMenuTrigger className="w-full justify-between px-2 py-1.5 text-sm">
                {t('womensFashion')}
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
                {t('mensFashion')}
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
                  href={`/${currentLang}/products?category=Electronics`}
                  className="block w-full px-2 py-1.5 text-sm font-medium text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
                >
                  {t('electronics')}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem className="w-full">
              <NavigationMenuLink asChild>
                <Link 
                  href={`/${currentLang}/products?category=Home+Lifestyle`}
                  className="block w-full px-2 py-1.5 text-sm font-medium text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
                >
                  {t('homeLifestyle')}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem className="w-full">
              <NavigationMenuLink asChild>
                <Link 
                  href={`/${currentLang}/products?category=Medicine`}
                  className="block w-full px-2 py-1.5 text-sm font-medium text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
                >
                  {t('medicine')}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem className="w-full">
              <NavigationMenuLink asChild>
                <Link 
                  href={`/${currentLang}/products?category=Sports+Outdoor`}
                  className="block w-full px-2 py-1.5 text-sm font-medium text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
                >
                  {t('sportsOutdoor')}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem className="w-full">
              <NavigationMenuLink asChild>
                <Link 
                  href={`/${currentLang}/products?category=Automotive`}
                  className="block w-full px-2 py-1.5 text-sm font-medium text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
                >
                  {t('automotive')}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem className="w-full">
              <NavigationMenuLink asChild>
                <Link 
                  href={`/${currentLang}/products?category=Books`}
                  className="block w-full px-2 py-1.5 text-sm font-medium text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
                >
                  {t('books')}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem className="w-full">
              <NavigationMenuLink asChild>
                <Link 
                  href={`/${currentLang}/products?category=Baby+Toys`}
                  className="block w-full px-2 py-1.5 text-sm font-medium text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
                >
                  {t('babyToys')}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem className="w-full">
              <NavigationMenuLink asChild>
                <Link 
                  href={`/${currentLang}/products?category=Groceries+Pets`}
                  className="block w-full px-2 py-1.5 text-sm font-medium text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
                >
                  {t('groceriesPets')}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem className="w-full">
              <NavigationMenuLink asChild>
                <Link 
                  href={`/${currentLang}/products?category=Health+Beauty`}
                  className="block w-full px-2 py-1.5 text-sm font-medium text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
                >
                  {t('healthBeauty')}
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