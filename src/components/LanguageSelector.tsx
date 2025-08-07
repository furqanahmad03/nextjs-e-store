"use client"

import * as React from "react"
import { useRouter, usePathname } from "next/navigation"
import { Globe } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
]

export default function LanguageSelector() {
  const router = useRouter()
  const pathname = usePathname()
  
  // Extract current language from pathname
  const currentLang = pathname.split('/')[1] || 'en'
  const currentLanguage = languages.find(lang => lang.code === currentLang) || languages[0]

  const handleLanguageChange = (newLang: string) => {
    // Replace the current language in the pathname with the new one
    const pathWithoutLang = pathname.split('/').slice(2).join('/')
    const newPath = `/${newLang}${pathWithoutLang ? `/${pathWithoutLang}` : ''}`
    router.push(newPath)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-9 px-3">
          <Globe className="h-4 w-4 mr-2" />
          <span className="hidden sm:inline-block mr-1">{currentLanguage.name}</span>
          <span className="sm:hidden">{currentLanguage.flag}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            className={`cursor-pointer ${
              currentLang === language.code ? 'bg-gray-100 font-medium' : ''
            }`}
          >
            <span className="mr-2">{language.flag}</span>
            {language.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 