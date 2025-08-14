import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

interface Order {
  id: string
  customerName: string
  customerEmail: string
  products: Array<{
    productId: number
    name: string
    quantity: number
    price: number
  }>
  totalAmount: number
  orderDate: string
  status: 'pending' | 'dispatched' | 'delivered' | 'returned' | 'cancelled'
  shippingAddress: string
  paymentMethod: string
  customerPhone: string
  billingAddress: string
  subtotal: number
  shipping: number
  tax: number
  codFee: number
  returnReason?: string
  returnedAt?: string
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const { reason } = await request.json()

    if (!reason || !reason.trim()) {
      return NextResponse.json(
        { success: false, message: 'Return reason is required' },
        { status: 400 }
      )
    }

    // Read the orders.json file
    const ordersFilePath = path.join(process.cwd(), 'src/app/api/products/orders.json')
    const ordersData = await fs.readFile(ordersFilePath, 'utf-8')
    const orders: Order[] = JSON.parse(ordersData)

    // Find the order to return
    const orderIndex = orders.findIndex(order => order.id === id)
    
    if (orderIndex === -1) {
      return NextResponse.json(
        { success: false, message: 'Order not found' },
        { status: 404 }
      )
    }

    const order = orders[orderIndex]

    // Check if order can be returned (only delivered orders can be returned)
    if (order.status !== 'delivered') {
      return NextResponse.json(
        { success: false, message: 'Only delivered orders can be returned' },
        { status: 400 }
      )
    }

    // Update the order status and add return details
    orders[orderIndex] = {
      ...order,
      status: 'returned',
      returnReason: reason.trim(),
      returnedAt: new Date().toISOString()
    }

    // Write the updated orders back to the file
    await fs.writeFile(ordersFilePath, JSON.stringify(orders, null, 2))

    return NextResponse.json({
      success: true,
      message: 'Return request submitted successfully',
      order: orders[orderIndex]
    })

  } catch (error) {
    console.error('Error processing return:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to process return request' },
      { status: 500 }
      )
  }
} 