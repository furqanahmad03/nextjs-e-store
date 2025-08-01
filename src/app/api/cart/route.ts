import { NextResponse } from 'next/server'
import productsData from '../products/products.json'

export async function GET() {
  try {
    // This would typically get cart from session storage on the client side
    // For now, we'll return an empty cart structure
    return NextResponse.json({ items: [], total: 0 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch cart' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const { productId, quantity = 1 } = await request.json()
    
    // Find the product in the products data
    const product = productsData.find(p => p.id === productId)
    
    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    // Validate quantity against stock
    if (quantity > product.stock) {
      return NextResponse.json(
        { error: `Only ${product.stock} items available in stock` },
        { status: 400 }
      )
    }

    // Return the product data to be added to cart
    return NextResponse.json({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      stock: product.stock,
      quantity: quantity,
      total: product.price * quantity
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to add item to cart' },
      { status: 500 }
    )
  }
} 