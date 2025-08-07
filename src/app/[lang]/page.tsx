import HeroSection from "@/components/HeroSection"
import CategorySection from "@/components/CategorySection"
import BestSellings from "@/components/BestSellings"
import NewArrival from "@/components/NewArrival"
import OurProducts from "@/components/OurProducts"
import Services from "@/components/Services"

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return (
    <>
      <HeroSection />
      <CategorySection />
      <BestSellings />
      <NewArrival />
      <OurProducts />
      <Services />
    </>
  )
} 