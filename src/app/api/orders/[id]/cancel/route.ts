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
  status: 'pending' | 'dispatched' | 'delivered' | 'received' | 'returned' | 'cancelled'
  shippingAddress: string
  paymentMethod: string
  customerPhone: string
  billingAddress: string
  subtotal: number
  shipping: number
  tax: number
  codFee: number
  cancellationReason?: string
  cancelledAt?: string
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
        { success: false, message: 'Cancellation reason is required' },
        { status: 400 }
      )
    }

    // Read the orders.json file
    const ordersFilePath = path.join(process.cwd(), 'src/app/api/products/orders.json')
    const ordersData = await fs.readFile(ordersFilePath, 'utf-8')
    const orders: Order[] = JSON.parse(ordersData)

    // Find the order to cancel
    const orderIndex = orders.findIndex(order => order.id === id)
    
    if (orderIndex === -1) {
      return NextResponse.json(
        { success: false, message: 'Order not found' },
        { status: 404 }
      )
    }

    const order = orders[orderIndex]

    // Check if order can be cancelled (only pending orders can be cancelled)
    if (order.status !== 'pending') {
      return NextResponse.json(
        { success: false, message: 'Only pending orders can be cancelled' },
        { status: 400 }
      )
    }

    // Update the order status and add cancellation details
    orders[orderIndex] = {
      ...order,
      status: 'cancelled',
      cancellationReason: reason.trim(),
      cancelledAt: new Date().toISOString()
    }

    // Write the updated orders back to the file
    await fs.writeFile(ordersFilePath, JSON.stringify(orders, null, 2))

    return NextResponse.json({
      success: true,
      message: 'Order cancelled successfully',
      order: orders[orderIndex]
    })

  } catch (error) {
    console.error('Error cancelling order:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to cancel order' },
      { status: 500 }
    )
  }
} 