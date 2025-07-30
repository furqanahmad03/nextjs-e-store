"use client"

import * as React from "react"
import { Truck, Headphones, Shield } from "lucide-react"

const services = [
  {
    id: 1,
    icon: Truck,
    title: "FREE AND FAST DELIVERY",
    description: "Free delivery for all orders over $140"
  },
  {
    id: 2,
    icon: Headphones,
    title: "24/7 CUSTOMER SERVICE",
    description: "Friendly 24/7 customer support"
  },
  {
    id: 3,
    icon: Shield,
    title: "MONEY BACK GUARANTEE",
    description: "We return money within 30 days"
  }
]

export default function Services() {
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