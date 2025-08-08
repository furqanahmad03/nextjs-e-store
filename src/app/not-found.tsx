"use client"

import * as React from "react"
import Link from "next/link"
import { Home, ArrowLeft, ShoppingBag } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"

export default function NotFound() {
  const router = useRouter()
  const pathname = usePathname()
  
  // Extract current language from pathname
  const currentLang = pathname.split('/')[1] || 'en'

  const handleGoBack = () => {
    router.back()
  }

  // Simple translations object based on language
  const getTranslations = (lang: string) => {
    const translations = {
      en: {
        pageNotFoundTitle: "Page Not Found",
        pageNotFoundMessage: "Oops! The page you're looking for doesn't exist.",
        pageNotFoundSubMessage: "It might have been moved, deleted, or you entered the wrong URL.",
        goBackButton: "Go Back",
        homepageButton: "Homepage",
        browseProductsButton: "Browse Products",
        quickLinksTitle: "Quick Links",
        allProductsLink: "All Products",
        aboutUsLink: "About Us",
        contactLink: "Contact",
        cartLink: "Cart"
      },
      es: {
        pageNotFoundTitle: "Página No Encontrada",
        pageNotFoundMessage: "¡Ups! La página que buscas no existe.",
        pageNotFoundSubMessage: "Es posible que haya sido movida, eliminada o hayas ingresado la URL incorrecta.",
        goBackButton: "Volver",
        homepageButton: "Página Principal",
        browseProductsButton: "Explorar Productos",
        quickLinksTitle: "Enlaces Rápidos",
        allProductsLink: "Todos los Productos",
        aboutUsLink: "Acerca de Nosotros",
        contactLink: "Contacto",
        cartLink: "Carrito"
      },
      pt: {
        pageNotFoundTitle: "Página Não Encontrada",
        pageNotFoundMessage: "Ops! A página que você está procurando não existe.",
        pageNotFoundSubMessage: "Ela pode ter sido movida, excluída ou você digitou a URL errada.",
        goBackButton: "Voltar",
        homepageButton: "Página Inicial",
        browseProductsButton: "Explorar Produtos",
        quickLinksTitle: "Links Rápidos",
        allProductsLink: "Todos os Produtos",
        aboutUsLink: "Sobre Nós",
        contactLink: "Contato",
        cartLink: "Carrinho"
      }
    }
    
    return translations[lang as keyof typeof translations] || translations.en
  }

  const t = getTranslations(currentLang)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* 404 Number */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-gray-300 select-none">404</h1>
          <div className="relative -mt-20">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">{t.pageNotFoundTitle}</h2>
          </div>
        </div>

        {/* Main Message */}
        <div className="mb-8">
          <p className="text-xl text-gray-600 mb-4">
            {t.pageNotFoundMessage}
          </p>
          <p className="text-gray-500">
            {t.pageNotFoundSubMessage}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            onClick={handleGoBack}
            className="inline-flex items-center justify-center gap-2 min-w-[140px] px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            {t.goBackButton}
          </Button>
          
          <Link 
            href={`/${currentLang}`}
            className="inline-flex items-center justify-center gap-2 min-w-[140px] px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors duration-200"
          >
            <Home className="w-4 h-4" />
            {t.homepageButton}
          </Link>
          
          <Link 
            href={`/${currentLang}/products`}
            className="inline-flex items-center justify-center gap-2 min-w-[140px] px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-colors duration-200"
          >
            <ShoppingBag className="w-4 h-4" />
            {t.browseProductsButton}
          </Link>
        </div>

        {/* Quick Links */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <h4 className="text-sm font-medium text-gray-600 mb-4">{t.quickLinksTitle}</h4>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link href={`/${currentLang}/products`} className="text-red-500 hover:text-red-600 hover:underline">
              {t.allProductsLink}
            </Link>
            <Link href={`/${currentLang}/about`} className="text-gray-600 hover:text-gray-800 hover:underline">
              {t.aboutUsLink}
            </Link>
            <Link href={`/${currentLang}/contact`} className="text-gray-600 hover:text-gray-800 hover:underline">
              {t.contactLink}
            </Link>
            <Link href={`/${currentLang}/cart`} className="text-gray-600 hover:text-gray-800 hover:underline">
              {t.cartLink}
            </Link>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 opacity-10">
          <div className="w-20 h-20 bg-red-500 rounded-full"></div>
        </div>
        <div className="absolute bottom-10 right-10 opacity-10">
          <div className="w-16 h-16 bg-blue-500 rounded-full"></div>
        </div>
      </div>
    </div>
  )
} 