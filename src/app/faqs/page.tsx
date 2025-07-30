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
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description: "Find answers to common questions about shopping, shipping, returns, and more at Eco-Site.",
}

export default function FAQsPage() {
  const faqCategories = [
    {
      title: "Shopping & Orders",
      icon: ShoppingBag,
      questions: [
        {
          question: "How do I place an order?",
          answer: "Browse our products, add items to your cart, and proceed to checkout. You'll need to create an account or sign in, provide shipping and payment information, and confirm your order. You'll receive an order confirmation email once your order is placed."
        },
        {
          question: "Can I modify or cancel my order after it's placed?",
          answer: "Orders can be modified or cancelled within 1 hour of placement, as long as they haven't been processed for shipping. Contact our customer service team immediately if you need to make changes to your order."
        },
        {
          question: "How can I track my order?",
          answer: "Once your order ships, you'll receive a tracking number via email. You can also track your order by logging into your account and visiting the 'My Orders' section. Real-time tracking updates are available through our website."
        },
        {
          question: "What payment methods do you accept?",
          answer: "We accept all major credit cards (Visa, MasterCard, American Express, Discover), PayPal, Apple Pay, Google Pay, and bank transfers. All payments are processed securely through our trusted payment partners."
        }
      ]
    },
    {
      title: "Shipping & Delivery",
      icon: Truck,
      questions: [
        {
          question: "How long does shipping take?",
          answer: "Standard shipping takes 3-5 business days. Express shipping (1-2 business days) is available for an additional fee. International shipping typically takes 7-14 business days depending on the destination."
        },
        {
          question: "Do you offer free shipping?",
          answer: "Yes! We offer free standard shipping on all orders over $25. Orders under $25 have a flat shipping rate of $4.99. Express shipping is available for $9.99 regardless of order value."
        },
        {
          question: "Do you ship internationally?",
          answer: "Yes, we ship to most countries worldwide. International shipping costs and delivery times vary by location. You can check shipping rates and estimated delivery times during checkout."
        },
        {
          question: "What happens if my package is lost or damaged?",
          answer: "If your package is lost or damaged during shipping, please contact our customer service team within 30 days of the expected delivery date. We'll work with the shipping carrier to resolve the issue and provide a replacement or refund."
        }
      ]
    },
    {
      title: "Returns & Refunds",
      icon: Shield,
      questions: [
        {
          question: "What's your return policy?",
          answer: "We offer a 30-day return policy for most items. Items must be unused, in original packaging, and in the same condition as received. Some restrictions apply to electronics, personal care items, and sale items."
        },
        {
          question: "How do I return an item?",
          answer: "Log into your account, go to 'My Orders', select the order containing the item you want to return, and click 'Return Item'. Print the return label, package the item securely, and drop it off at any authorized shipping location."
        },
        {
          question: "How long does it take to process a refund?",
          answer: "Once we receive your return, we'll inspect the item and process your refund within 3-5 business days. Refunds are issued to your original payment method and may take 5-10 business days to appear on your statement."
        },
        {
          question: "Do I have to pay for return shipping?",
          answer: "Returns due to our error (wrong item, damaged item) are free. Returns for other reasons may incur a return shipping fee of $5.99, which will be deducted from your refund amount."
        }
      ]
    },
    {
      title: "Account & Security",
      icon: CreditCard,
      questions: [
        {
          question: "How do I create an account?",
          answer: "Click the 'Sign Up' button in the top navigation, fill in your details (name, email, password), and verify your email address. You can also create an account during checkout."
        },
        {
          question: "I forgot my password. How can I reset it?",
          answer: "Click 'Forgot Password' on the sign-in page, enter your email address, and we'll send you a password reset link. The link expires in 24 hours for security."
        },
        {
          question: "Is my personal information secure?",
          answer: "Yes, we use industry-standard SSL encryption to protect your personal and payment information. We never store your credit card details and use secure payment processors for all transactions."
        },
        {
          question: "Can I save multiple shipping addresses?",
          answer: "Yes, you can save multiple shipping addresses in your account. Go to 'My Account' > 'Addresses' to add, edit, or remove shipping addresses."
        }
      ]
    },
    {
      title: "Customer Support",
      icon: MessageCircle,
      questions: [
        {
          question: "How can I contact customer service?",
          answer: "You can reach us via email at support@eco-site.com, phone at +1 (555) 123-4567, or live chat on our website. Our customer service team is available Monday-Friday, 9 AM-6 PM EST."
        },
        {
          question: "What information should I provide when contacting support?",
          answer: "Please include your order number (if applicable), email address, and a detailed description of your issue. Screenshots or photos can also be helpful for certain problems."
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
              <p className="text-sm text-red-600 font-medium">Support</p>
              <h1 className="text-3xl font-bold text-gray-900">Frequently Asked Questions</h1>
            </div>
          </div>

          {/* Breadcrumb */}
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>FAQs</BreadcrumbPage>
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
              How can we help you?
            </h2>
            <p className="text-gray-600 mb-6">
              Find answers to the most common questions about shopping, shipping, returns, and more. 
              Can't find what you're looking for? Contact our support team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="bg-red-500 hover:bg-red-600 text-white">
                <Link href="/contact">
                  Contact Support
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/products">
                  Browse Products
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
              Still have questions?
            </h3>
            <p className="text-gray-600 mb-6">
              Our customer support team is here to help you with any questions or concerns you may have.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="bg-red-500 hover:bg-red-600 text-white">
                <Link href="/contact">
                  <MessageCircle className="mr-2 w-4 h-4" />
                  Contact Us
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="tel:+15551234567">
                  <MessageCircle className="mr-2 w-4 h-4" />
                  Call Us
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 