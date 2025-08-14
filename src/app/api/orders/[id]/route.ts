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
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { status } = await request.json()
    const orderId = params.id
    
    // Validate status
    const validStatuses = ['pending', 'dispatched', 'delivered', 'received', 'returned', 'cancelled']
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { success: false, message: 'Invalid status provided' },
        { status: 400 }
      )
    }
    
    // Path to orders.json file
    const ordersFilePath = path.join(process.cwd(), 'src', 'app', 'api', 'products', 'orders.json')
    
    // Read existing orders
    let orders: Order[] = []
    try {
      const existingData = await fs.readFile(ordersFilePath, 'utf-8')
      if (existingData.trim()) {
        orders = JSON.parse(existingData)
      }
    } catch (error) {
      return NextResponse.json(
        { success: false, message: 'No orders found' },
        { status: 404 }
      )
    }
    
    // Find and update the order
    const orderIndex = orders.findIndex(order => order.id === orderId)
    if (orderIndex === -1) {
      return NextResponse.json(
        { success: false, message: 'Order not found' },
        { status: 404 }
      )
    }
    
    const currentOrder = orders[orderIndex]
    
    // Validate status transition
    if (!isValidStatusTransition(currentOrder.status, status)) {
      return NextResponse.json(
        { success: false, message: `Cannot transition from ${currentOrder.status} to ${status}` },
        { status: 400 }
      )
    }
    
    // Update order status
    orders[orderIndex].status = status
    
    // Write back to file
    await fs.writeFile(ordersFilePath, JSON.stringify(orders, null, 2))
    
    return NextResponse.json({ 
      success: true, 
      message: 'Order status updated successfully',
      orderId: orderId,
      newStatus: status
    })
    
  } catch (error) {
    console.error('Error updating order status:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to update order status' },
      { status: 500 }
    )
  }
}

// Helper function to validate status transitions
function isValidStatusTransition(currentStatus: string, newStatus: string): boolean {
  const validTransitions: Record<string, string[]> = {
    'pending': ['dispatched', 'cancelled'],
    'dispatched': ['delivered'],
    'delivered': ['received'],
    'received': ['returned'],
    'returned': [], // Final status
    'cancelled': [] // Final status
  }
  
  return validTransitions[currentStatus]?.includes(newStatus) || false
} 