"use client"

import SideBar from "./SideBar"
import HeroCarousel from "./Carousel"

export default function HeroSection() {
  return (
    <section className="max-w-allowed mx-auto">
        <div className="flex">
          {/* Sidebar */}
          <SideBar />
          
          {/* Carousel */}
          <div className="flex-1 p-4 min-w-0">
            <HeroCarousel />
          </div>
        </div>
    </section>
  )
} 