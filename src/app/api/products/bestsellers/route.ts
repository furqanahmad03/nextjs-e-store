import { NextResponse } from 'next/server'
import productsData from '../products.json'

export async function GET() {
  try {
    // Filter products with ratings and sort by rating (highest first), then limit to 4
    const bestSellers = productsData
      .filter(product => product.rating && product.rating >= 4.0) // Only products with rating >= 4.0
      .sort((a, b) => (b.rating || 0) - (a.rating || 0)) // Sort by rating descending
      .slice(0, 4)
      .map(product => ({
        id: product.id,
        name: product.name,
        category: product.category,
        subcategory: product.subcategory,
        price: product.price,
        description: product.description,
        image: product.image,
        isSale: product.isSale,
        rating: product.rating,
      }))

    return NextResponse.json(bestSellers)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch best sellers' },
      { status: 500 }
    )
  }
} 