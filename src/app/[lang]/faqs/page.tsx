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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { HelpCircle, ShoppingBag, Truck, CreditCard, Shield, MessageCircle, ArrowRight } from "lucide-react"
import { useTranslations } from "next-intl"
import { usePathname } from "next/navigation"
import { useEffect } from "react"

export default function FAQsPage() {
  const t = useTranslations('faqs')
  const pathname = usePathname()
  
  // Extract current language from pathname
  const currentLang = pathname.split('/')[1] || 'en'

  useEffect(() => {
    document.title = `${t('title')} | E-Store`;
  }, [t]);

  const faqCategories = [
    {
      title: t('categories.shoppingOrders.title'),
      icon: ShoppingBag,
      questions: [
        {
          question: t('categories.shoppingOrders.placeOrder.question'),
          answer: t('categories.shoppingOrders.placeOrder.answer')
        },
        {
          question: t('categories.shoppingOrders.modifyOrder.question'),
          answer: t('categories.shoppingOrders.modifyOrder.answer')
        },
        {
          question: t('categories.shoppingOrders.trackOrder.question'),
          answer: t('categories.shoppingOrders.trackOrder.answer')
        },
        {
          question: t('categories.shoppingOrders.paymentMethods.question'),
          answer: t('categories.shoppingOrders.paymentMethods.answer')
        }
      ]
    },
    {
      title: t('categories.shippingDelivery.title'),
      icon: Truck,
      questions: [
        {
          question: t('categories.shippingDelivery.shippingTime.question'),
          answer: t('categories.shippingDelivery.shippingTime.answer')
        },
        {
          question: t('categories.shippingDelivery.freeShipping.question'),
          answer: t('categories.shippingDelivery.freeShipping.answer')
        },
        {
          question: t('categories.shippingDelivery.internationalShipping.question'),
          answer: t('categories.shippingDelivery.internationalShipping.answer')
        },
        {
          question: t('categories.shippingDelivery.lostPackage.question'),
          answer: t('categories.shippingDelivery.lostPackage.answer')
        }
      ]
    },
    {
      title: t('categories.returnsRefunds.title'),
      icon: Shield,
      questions: [
        {
          question: t('categories.returnsRefunds.returnPolicy.question'),
          answer: t('categories.returnsRefunds.returnPolicy.answer')
        },
        {
          question: t('categories.returnsRefunds.howToReturn.question'),
          answer: t('categories.returnsRefunds.howToReturn.answer')
        },
        {
          question: t('categories.returnsRefunds.refundTime.question'),
          answer: t('categories.returnsRefunds.refundTime.answer')
        },
        {
          question: t('categories.returnsRefunds.returnShipping.question'),
          answer: t('categories.returnsRefunds.returnShipping.answer')
        }
      ]
    },
    {
      title: t('categories.accountSecurity.title'),
      icon: CreditCard,
      questions: [
        {
          question: t('categories.accountSecurity.createAccount.question'),
          answer: t('categories.accountSecurity.createAccount.answer')
        },
        {
          question: t('categories.accountSecurity.resetPassword.question'),
          answer: t('categories.accountSecurity.resetPassword.answer')
        },
        {
          question: t('categories.accountSecurity.security.question'),
          answer: t('categories.accountSecurity.security.answer')
        },
        {
          question: t('categories.accountSecurity.multipleAddresses.question'),
          answer: t('categories.accountSecurity.multipleAddresses.answer')
        }
      ]
    },
    {
      title: t('categories.customerSupport.title'),
      icon: MessageCircle,
      questions: [
        {
          question: t('categories.customerSupport.contactSupport.question'),
          answer: t('categories.customerSupport.contactSupport.answer')
        },
        {
          question: t('categories.customerSupport.supportInfo.question'),
          answer: t('categories.customerSupport.supportInfo.answer')
        }
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-allowed mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-2 h-8 bg-red-500 rounded"></div>
            <div>
              <p className="text-sm text-red-600 font-medium">{t('support')}</p>
              <h1 className="text-3xl font-bold text-gray-900">{t('title')}</h1>
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
                <BreadcrumbPage>{t('faqs')}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Hero Section */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <HelpCircle className="w-8 h-8 text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {t('heroTitle')}
            </h2>
            <p className="text-gray-600 mb-6">
              {t('heroDescription')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="bg-red-500 hover:bg-red-600 text-white">
                <Link href={`/${currentLang}/contact`}>
                  {t('contactSupport')}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href={`/${currentLang}/products`}>
                  {t('browseProducts')}
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-8">
          {faqCategories.map((category, categoryIndex) => (
            <Card key={categoryIndex} className="border border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                    <category.icon className="w-5 h-5 text-red-600" />
                  </div>
                  {category.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {category.questions.map((faq, questionIndex) => (
                    <AccordionItem key={questionIndex} value={`item-${categoryIndex}-${questionIndex}`}>
                      <AccordionTrigger className="text-left hover:no-underline">
                        <span className="font-medium text-gray-900">{faq.question}</span>
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600 leading-relaxed">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-12 bg-white rounded-2xl shadow-sm p-8">
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              {t('stillHaveQuestions')}
            </h3>
            <p className="text-gray-600 mb-6">
              {t('ctaDescription')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="bg-red-500 hover:bg-red-600 text-white">
                <Link href={`/${currentLang}/contact`}>
                  <MessageCircle className="mr-2 w-4 h-4" />
                  {t('contactUs')}
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="tel:+15551234567">
                  <MessageCircle className="mr-2 w-4 h-4" />
                  {t('callUs')}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 