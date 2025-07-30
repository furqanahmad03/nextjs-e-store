import HeroSection from "@/components/HeroSection"
import ProductCarousel from "@/components/ProductCarousel"
import CategorySection from "@/components/CategorySection"
import BestSellings from "@/components/BestSellings"
import ProductAd from "@/components/ProductAd"
import OurProducts from "@/components/OurProducts"
import NewArrival from "@/components/NewArrival"
import Services from "@/components/Services"

export default function Home() {

  return (
    <div className="min-h-screen">
      <HeroSection />
      <ProductCarousel />
      <CategorySection />
      <BestSellings />
      <OurProducts />
      <ProductAd
        category="Categories"
        tagline="Enhance Your Music Experience"
        description="Premium JBL portable speaker with incredible sound quality and long battery life"
        image="/jbl.png"
        productLink="https://jbl.com"
      />
      <NewArrival />
      <Services />
    </div>
  )
}
