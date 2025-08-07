"use client"

import * as React from "react"
import { Truck, Headphones, Shield } from "lucide-react"
import { useTranslations } from "next-intl"

export default function Services() {
  const t = useTranslations('services')

  const services = [
    {
      id: 1,
      icon: Truck,
      title: t('freeShipping'),
      description: t('freeShippingDesc')
    },
    {
      id: 2,
      icon: Headphones,
      title: t('support'),
      description: t('supportDesc')
    },
    {
      id: 3,
      icon: Shield,
      title: t('easyReturns'),
      description: t('easyReturnsDesc')
    }
  ]

  return (
    <section className="w-full bg-white">
      <div className="max-w-allowed mx-auto px-4 border-t border-b border-gray-300 py-12 px-6 my-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service) => (
            <div key={service.id} className="flex flex-col items-center text-center space-y-4">
              {/* Icon */}
              <div className="w-16 h-16 bg-black rounded-full border border-gray-300 flex items-center justify-center">
                <service.icon className="w-8 h-8 text-white" />
              </div>
              
              {/* Title */}
              <h3 className="text-lg font-bold text-black uppercase tracking-wide">
                {service.title}
              </h3>
              
              {/* Description */}
              <p className="text-gray-700 text-sm max-w-xs">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 