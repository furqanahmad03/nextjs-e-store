import { NextResponse } from 'next/server'
import productsData from '../products.json'

export async function GET() {
  try {
    // Sort products by date_added (newest first) and get first 4
    const newArrivalProducts = productsData
      .sort((a, b) => new Date(b.date_added).getTime() - new Date(a.date_added).getTime())
      .slice(0, 4)
      .map(product => ({
        id: product.id,
        name: product.name,
        description: product.description,
        image: product.image,
        price: product.price,
        category: product.category,
        date_added: product.date_added,
      }))

    return NextResponse.json(newArrivalProducts)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch new arrival products' },
      { status: 500 }
    )
  }
} 