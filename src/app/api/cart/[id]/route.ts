import { NextResponse } from 'next/server'
import productsData from '../../products/products.json'

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { quantity } = await request.json()
    const productId = parseInt((await params).id)
    
    console.log('Updating cart item:', { productId, quantity })
    
    if (quantity <= 0) {
      return NextResponse.json(
        { error: 'Quantity must be greater than 0' },
        { status: 400 }
      )
    }

    // Find the product to check stock
    const product = productsData.find(p => p.id === productId)
    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    console.log('Product found:', { id: product.id, stock: product.stock })

    // Validate against stock
    if (quantity > product.stock) {
      return NextResponse.json(
        { error: `Only ${product.stock} items available in stock` },
        { status: 400 }
      )
    }

    console.log('Validation passed, updating quantity')

    // Return updated item data
    return NextResponse.json({
      id: productId,
      quantity: quantity,
      stock: product.stock
    })
  } catch (error) {
    console.error('Error in PUT /api/cart/[id]:', error)
    return NextResponse.json(
      { error: 'Failed to update cart item' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const productId = parseInt((await params).id)
    
    // Return success response
    return NextResponse.json({
      id: productId,
      message: 'Item removed from cart'
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to remove item from cart' },
      { status: 500 }
    )
  }
} 