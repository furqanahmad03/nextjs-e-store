import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  ArrowRight,
  Twitter,
  Instagram,
  Linkedin,
  Award,
  Target,
  Heart
} from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Link from "next/link";
import Services from "@/components/Services";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description: "Discover our journey, mission, and the passionate team behind your favorite online shopping destination.",
};

const About = () => {

  const team = [
    {
      name: "Tom Cruise",
      position: "Founder & Chairman",
      image: "/team/tom-cruise.jpg",
      social: {
        twitter: "#",
        instagram: "#",
        linkedin: "#"
      }
    },
    {
      name: "Emma Watson",
      position: "Managing Director",
      image: "/team/emma-watson.jpg",
      social: {
        twitter: "#",
        instagram: "#",
        linkedin: "#"
      }
    },
    {
      name: "Will Smith",
      position: "Product Designer",
      image: "/team/will-smith.jpg",
      social: {
        twitter: "#",
        instagram: "#",
        linkedin: "#"
      }
    },
    {
      name: "Sarah Johnson",
      position: "Head of Marketing",
      image: "/team/sarah-johnson.jpg",
      social: {
        twitter: "#",
        instagram: "#",
        linkedin: "#"
      }
    },
    {
      name: "Michael Chen",
      position: "CTO",
      image: "/team/michael-chen.jpg",
      social: {
        twitter: "#",
        instagram: "#",
        linkedin: "#"
      }
    },
    {
      name: "Lisa Rodriguez",
      position: "Head of Operations",
      image: "/team/lisa-rodriguez.jpg",
      social: {
        twitter: "#",
        instagram: "#",
        linkedin: "#"
      }
    }
  ];

  const values = [
    {
      icon: Target,
      title: "Our Mission",
      description: "To provide the best online shopping experience with quality products and exceptional customer service."
    },
    {
      icon: Heart,
      title: "Our Values",
      description: "Integrity, innovation, customer focus, and continuous improvement drive everything we do."
    },
    {
      icon: Award,
      title: "Our Vision",
      description: "To become the leading e-commerce platform trusted by millions of customers worldwide."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center space-x-2 text-sm text-gray-600">
          <Link href="/" className="hover:text-black transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-black font-medium">About</span>
        </nav>
      </div>

      {/* Hero Section */}
      <div className="bg-gray-50 border-b">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-black mb-6">
              About Us
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Discover our journey, mission, and the passionate team behind your favorite online shopping destination.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Our Story Section */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-black">
              Our Story
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Launched in 2015, Exclusive is South Asia's premier online shopping marketplace with an active presence in Bangladesh. Supported by wide range of tailored marketing, data and service solutions, Exclusive has 10,500 sellers and 300 brands and serves 3 millions customers across the region.
              </p>
              <p>
                Exclusive has more than 1 Million products to offer, growing at a very fast. Exclusive offers a diverse assortment in categories ranging from consumer electronics to fashion, home & living, beauty, and more.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button className="bg-black hover:bg-gray-800 text-white">
                Learn More
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">
                Download Brochure
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="bg-gray-800 rounded-lg p-8 h-96 flex items-center justify-center">
              <div className="text-center text-white">
                <Users className="h-24 w-24 mx-auto mb-4 opacity-90" />
                <p className="text-xl font-semibold">Our Community</p>
                <p className="text-gray-300">Millions of happy customers</p>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-black mb-4">
              What Drives Us
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our core values guide every decision we make and every action we take.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                    <value.icon className="h-8 w-8 text-black" />
                  </div>
                  <h3 className="text-xl font-semibold text-black mb-4">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Services Section */}
        <Services />

        {/* Team Section */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-black mb-4">
              Meet Our Team
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The passionate individuals behind our success story.
            </p>
          </div>
          
          <div className="relative max-w-6xl mx-auto">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {team.map((member, index) => (
                  <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                    <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                      <div className="h-64 bg-gray-200 flex items-center justify-center">
                        <Users className="h-16 w-16 text-gray-400" />
                      </div>
                      <CardContent className="p-6 text-center">
                        <h3 className="text-xl font-semibold text-black mb-2">
                          {member.name}
                        </h3>
                        <p className="text-gray-600 mb-4">
                          {member.position}
                        </p>
                        <div className="flex justify-center space-x-3">
                          <Link href={member.social.twitter} className="text-gray-400 hover:text-black transition-colors">
                            <Twitter className="h-5 w-5" />
                          </Link>
                          <Link href={member.social.instagram} className="text-gray-400 hover:text-black transition-colors">
                            <Instagram className="h-5 w-5" />
                          </Link>
                          <Link href={member.social.linkedin} className="text-gray-400 hover:text-black transition-colors">
                            <Linkedin className="h-5 w-5" />
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="bg-white border-gray-300 text-black hover:bg-gray-50" />
              <CarouselNext className="bg-white border-gray-300 text-black hover:bg-gray-50" />
            </Carousel>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 bg-gray-50 rounded-lg p-12 text-center">
          <h2 className="text-3xl font-bold text-black mb-4">
            Ready to Shop with Us?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join millions of satisfied customers who trust us for their online shopping needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-black text-white hover:bg-gray-800">
              Start Shopping
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-100">
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;