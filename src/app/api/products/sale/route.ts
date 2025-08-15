import { NextResponse } from 'next/server'
import productsData from '../products.json'
import { Product } from '@/types/Product'

export async function GET() {
  try {
    // Filter products where isSale is true and limit to 10
    const saleProducts = (productsData as Product[])
      .filter((product: Product) => product.isSale === true)
      .slice(0, 10)
      .map((product: Product) => ({
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

    return NextResponse.json(saleProducts)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch sale products' },
      { status: 500 }
    )
  }
} 