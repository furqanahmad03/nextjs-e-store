import { NextResponse } from 'next/server'
import productsData from '../products.json'

export async function GET() {
  try {
    // Get 8 featured products (first 8 products from the dataset)
    const featuredProducts = productsData
      .slice(0, 8)
      .map(product => ({
        id: product.id,
        name: product.name,
        category: product.category,
        subcategory: product.subcategory,
        price: product.price,
        description: product.description,
        image: product.image,
        isSale: product.isSale,
        rating: product.rating || 4.0, // Default rating if not provided
      }))

    return NextResponse.json(featuredProducts)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch featured products' },
      { status: 500 }
    )
  }
} 