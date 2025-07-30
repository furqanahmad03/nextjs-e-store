"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, User, Mail as MailIcon } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";


const Contact = () => {
  useEffect(() => {
    document.title = "Contact Us | E-Store";
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Here you would typically send the data to your API
    console.log("Form submitted:", formData);
    
    toast.success("Message sent successfully! We'll get back to you soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      details: ["support@estore.com", "info@estore.com"],
      description: "We'll respond within 24 hours",
      action: "mailto:support@estore.com"
    },
    {
      icon: Phone,
      title: "Call Us",
      details: ["+1 (555) 123-4567", "+1 (555) 987-6543"],
      description: "Mon-Fri from 8am to 6pm",
      action: "tel:+15551234567"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      details: ["123 Commerce St", "New York, NY 10001"],
      description: "Come say hello at our office",
      action: "#"
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: ["Monday - Friday: 9AM - 6PM", "Saturday: 10AM - 4PM"],
      description: "Sunday: Closed",
      action: "#"
    }
  ];

  const faqItems = [
    {
      question: "How long does shipping take?",
      answer: "Standard shipping takes 3-5 business days. Express shipping is available for 1-2 business days."
    },
    {
      question: "What's your return policy?",
      answer: "We offer a 30-day return policy for most items. Some restrictions apply to electronics and personal care items."
    },
    {
      question: "Do you ship internationally?",
      answer: "Yes, we ship to most countries worldwide. Shipping costs and delivery times vary by location."
    },
    {
      question: "How can I track my order?",
      answer: "You'll receive a tracking number via email once your order ships. You can also track it in your account dashboard."
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
          <span className="text-black font-medium">Contact</span>
        </nav>
      </div>

      {/* Hero Section */}
      <div className="bg-gray-50 border-b">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-black mb-6">
              Get in Touch
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left Side - Contact Form + FAQ */}
          <div className="space-y-12">
            {/* Contact Form */}
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold text-black mb-4">
                  Send us a Message
                </h2>
                <p className="text-gray-600">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>
              </div>

              <Card className="border border-gray-200 shadow-sm">
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                          Full Name *
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input
                            id="name"
                            name="name"
                            type="text"
                            required
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Enter your full name"
                            className="pl-10"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                          Email Address *
                        </label>
                        <div className="relative">
                          <MailIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Enter your email"
                            className="pl-10"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                        Subject *
                      </label>
                      <div className="relative">
                        <MessageSquare className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="subject"
                          name="subject"
                          type="text"
                          required
                          value={formData.subject}
                          onChange={handleInputChange}
                          placeholder="What's this about?"
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                        Message *
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Tell us more about your inquiry..."
                        rows={6}
                        className="resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-black hover:bg-gray-800 text-white font-semibold py-3"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* FAQ Section */}
            <Card className="border border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-black">
                  Frequently Asked Questions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {faqItems.map((faq, index) => (
                  <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0">
                    <h4 className="font-medium text-black mb-2">
                      {faq.question}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Right Side - Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-black mb-4">
                Contact Information
              </h2>
              <p className="text-gray-600">
                Reach out to us through any of these channels.
              </p>
            </div>

            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <Card key={index} className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center">
                          <info.icon className="h-6 w-6 text-white" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-black mb-2">
                          {info.title}
                        </h3>
                        <div className="space-y-1 mb-2">
                          {info.details.map((detail, detailIndex) => (
                            <p key={detailIndex} className="text-gray-600">
                              {detail}
                            </p>
                          ))}
                        </div>
                        <p className="text-sm text-gray-500 mb-3">
                          {info.description}
                        </p>
                        {info.action !== "#" && (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="border-gray-300 text-gray-700 hover:bg-gray-50"
                            asChild
                          >
                            <Link href={info.action}>
                              {info.title === "Email Us" ? "Send Email" : 
                               info.title === "Call Us" ? "Call Now" : 
                               "Get Directions"}
                            </Link>
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Additional Info Card */}
            <Card className="border border-gray-200 shadow-sm">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-black mb-4">
                  Why Choose Us?
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-600 text-sm">
                      Fast response times - we typically respond within 2-4 hours during business hours
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-600 text-sm">
                      Expert support team with deep knowledge of our products and services
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-600 text-sm">
                      Multiple contact channels to suit your preferred communication style
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 bg-gray-50 rounded-lg p-12 text-center">
          <h2 className="text-3xl font-bold text-black mb-4">
            Still Have Questions?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Can't find what you're looking for? Our customer support team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-black text-white hover:bg-gray-800">
              <Phone className="mr-2 h-4 w-4" />
              Call Support
            </Button>
            <Button size="lg" variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-100">
              <Mail className="mr-2 h-4 w-4" />
              Email Support
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;