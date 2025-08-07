"use client"

import * as React from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import ProductCard from "@/components/ProductCard"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import productsData from "@/app/api/products/products.json"
import { Product } from "@/types/Product"
import HeroSection from "@/components/HeroSection"
import Link from "next/link"
import { useEffect, Suspense } from "react"

function ProductsPageContent() {
  const searchParams = useSearchParams()
  const category = searchParams.get('category')
  const subcategory = searchParams.get('subCategory')
  const isSaleItems = searchParams.get('sale')
  const search = searchParams.get('search')
  const sort = searchParams.get('sort') || 'featured'
  const page = parseInt(searchParams.get('page') || '1')
  const productsPerPage = 20

  useEffect(() => {
    document.title = "Products | Eco-Site";
  }, []);



  // Filter products based on query parameters
  const filteredProducts = React.useMemo(() => {
    let products = productsData as unknown as Product[]

    // Filter by search query if provided
    if (search) {
      const searchLower = search.toLowerCase()
      products = products.filter(product =>
        product.name.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower) ||
        product.category.toLowerCase().includes(searchLower) ||
        product.subcategory.toLowerCase().includes(searchLower) ||
        product.brand.toLowerCase().includes(searchLower)
      )
    }

    // Filter by category if provided
    if (category) {
      products = products.filter(product =>
        product.category.toLowerCase() === category.toLowerCase()
      )
    }

    // Filter by subcategory if provided
    if (subcategory) {
      products = products.filter(product =>
        product.subcategory.toLowerCase() === subcategory.toLowerCase()
      )
    }

    if (isSaleItems) {
      products = products.filter(product => product.isSale)
    }

    // Ensure all required Product fields are present
    const processedProducts = products.map((product) => ({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image,
      images: product.images || [product.image],
      category: product.category,
      subcategory: product.subcategory,
      brand: product.brand,
      rating: product.rating || 4.0,
      stock: product.stock || 10,
      isSale: product.isSale || false,
    } as Product))

    // Apply sorting
    switch (sort) {
      case 'price-low-high':
        processedProducts.sort((a, b) => a.price - b.price)
        break
      case 'price-high-low':
        processedProducts.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        processedProducts.sort((a, b) => b.rating - a.rating)
        break
      case 'newest':
        processedProducts.sort((a, b) => b.id - a.id) // Assuming higher ID = newer
        break
      case 'oldest':
        processedProducts.sort((a, b) => a.id - b.id)
        break
      case 'featured':
      default:
        // Keep original order (featured products first)
        break
    }

    return processedProducts
  }, [category, subcategory, search, isSaleItems, sort])

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage)
  const startIndex = (page - 1) * productsPerPage
  const endIndex = startIndex + productsPerPage
  const currentProducts = filteredProducts.slice(startIndex, endIndex)

  // Generate pagination URL with current filters
  const generatePageUrl = (pageNumber: number) => {
    const params = new URLSearchParams()
    if (category) params.set('category', category)
    if (subcategory) params.set('subcategory', subcategory)
    if (search) params.set('search', search)
    if (isSaleItems) params.set('sale', isSaleItems)
    if (sort && sort !== 'featured') params.set('sort', sort)
    if (pageNumber > 1) params.set('page', pageNumber.toString())
    return `/products${params.toString() ? `?${params.toString()}` : ''}`
  }

  // Generate page title based on filters
  const getPageTitle = () => {
    if (search) {
      return `Search Results for "${search}"`
    } else if (category && subcategory) {
      return `${category} - ${subcategory}`
    } else if (category) {
      return category
    } else {
      return "All Products"
    }
  }

  // Generate sort URL
  const generateSortUrl = (sortValue: string) => {
    const params = new URLSearchParams()
    if (category) params.set('category', category)
    if (subcategory) params.set('subCategory', subcategory)
    if (search) params.set('search', search)
    if (isSaleItems) params.set('sale', isSaleItems)
    if (sortValue !== 'featured') params.set('sort', sortValue)
    return `/products${params.toString() ? `?${params.toString()}` : ''}`
  }



  return (
    <div className="min-h-screen">
      <div className="mb-4">
        <HeroSection />
      </div>
      <div className="max-w-allowed mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-2 h-8 bg-red-500 rounded"></div>
            <div>
              <p className="text-sm text-red-600 font-medium">Products</p>
              <h1 className="text-3xl font-bold text-gray-900">{getPageTitle()}</h1>
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
                <BreadcrumbLink asChild>
                  <Link href="/products">Products</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              {category && (
                <>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>{category}</BreadcrumbPage>
                  </BreadcrumbItem>
                </>
              )}
              {subcategory && (
                <>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>{subcategory}</BreadcrumbPage>
                  </BreadcrumbItem>
                </>
              )}
              {search && (
                <>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Search: &quot;{search}&quot;</BreadcrumbPage>
                  </BreadcrumbItem>
                </>
              )}
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Results Count and Search Summary */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <p className="text-gray-600">
              Showing {startIndex + 1}-{Math.min(endIndex, filteredProducts.length)} of {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
              {category && ` in ${category}`}
              {subcategory && ` - ${subcategory}`}
            </p>
            
            {/* Search Results Summary */}
            {search && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Search results for:</span>
                <span className="text-sm font-medium text-gray-900 bg-gray-100 px-2 py-1 rounded">
                  &quot;{search}&quot;
                </span>
                <Link 
                  href={`/products${(() => {
                    const params = new URLSearchParams()
                    if (category) params.set('category', category)
                    if (subcategory) params.set('subCategory', subcategory)
                    if (isSaleItems) params.set('sale', isSaleItems)
                    if (sort && sort !== 'featured') params.set('sort', sort)
                    return params.toString() ? `?${params.toString()}` : ''
                  })()}`}
                  className="text-sm text-red-500 hover:text-red-600 hover:underline"
                  onClick={() => {
                    window.dispatchEvent(new CustomEvent('clearSearch'))
                  }}
                >
                  Clear search
                </Link>
              </div>
            )}
          </div>

          {/* Sort Options */}
          <div className="flex items-center gap-4">
            <span className="text-gray-600 text-sm">Sort by:</span>
            <Button 
              asChild
              variant={sort === 'featured' ? 'default' : 'outline'} 
              size="sm" 
              className="text-sm"
            >
              <Link href={generateSortUrl('featured')}>Featured</Link>
            </Button>
            <Button 
              asChild
              variant={sort === 'price-low-high' ? 'default' : 'outline'} 
              size="sm" 
              className="text-sm"
            >
              <Link href={generateSortUrl('price-low-high')}>Price: Low to High</Link>
            </Button>
            <Button 
              asChild
              variant={sort === 'price-high-low' ? 'default' : 'outline'} 
              size="sm" 
              className="text-sm"
            >
              <Link href={generateSortUrl('price-high-low')}>Price: High to Low</Link>
            </Button>
            <Button 
              asChild
              variant={sort === 'rating' ? 'default' : 'outline'} 
              size="sm" 
              className="text-sm"
            >
              <Link href={generateSortUrl('rating')}>Top Rated</Link>
            </Button>
            <Button 
              asChild
              variant={sort === 'newest' ? 'default' : 'outline'} 
              size="sm" 
              className="text-sm"
            >
              <Link href={generateSortUrl('newest')}>Newest</Link>
            </Button>
          </div>
        </div>

        {/* Products Grid */}
        {currentProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {currentProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {search ? "No search results found" : "No products found"}
            </h3>
            <p className="text-gray-600 mb-6">
              {search
                ? `No products found for "${search}". Try different keywords or browse all products.`
                : category && subcategory
                  ? `No products found in ${category} - ${subcategory}`
                  : category
                    ? `No products found in ${category}`
                    : "No products available at the moment"
              }
            </p>
            <div className="flex gap-4 justify-center">
              {search && (
                <Button asChild className="bg-red-500 hover:bg-red-600 text-white">
                  <Link href="/products">Browse All Products</Link>
                </Button>
              )}
              <Button
                onClick={() => window.history.back()}
                variant="outline"
                className="border-gray-300"
              >
                Go Back
              </Button>
            </div>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-12">
            <Pagination>
              <PaginationContent>
                {/* Previous Button */}
                {page > 1 && (
                  <PaginationItem>
                    <PaginationPrevious href={generatePageUrl(page - 1)} />
                  </PaginationItem>
                )}

                {/* Page Numbers */}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => {
                  // Show first page, last page, current page, and pages around current
                  const shouldShow =
                    pageNumber === 1 ||
                    pageNumber === totalPages ||
                    Math.abs(pageNumber - page) <= 1

                  if (shouldShow) {
                    return (
                      <PaginationItem key={pageNumber}>
                        <PaginationLink
                          href={generatePageUrl(pageNumber)}
                          isActive={pageNumber === page}
                        >
                          {pageNumber}
                        </PaginationLink>
                      </PaginationItem>
                    )
                  } else if (
                    pageNumber === page - 2 ||
                    pageNumber === page + 2
                  ) {
                    return (
                      <PaginationItem key={pageNumber}>
                        <PaginationEllipsis />
                      </PaginationItem>
                    )
                  }
                  return null
                })}

                {/* Next Button */}
                {page < totalPages && (
                  <PaginationItem>
                    <PaginationNext href={generatePageUrl(page + 1)} />
                  </PaginationItem>
                )}
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </div>
  )
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductsPageContent />
    </Suspense>
  )
}
