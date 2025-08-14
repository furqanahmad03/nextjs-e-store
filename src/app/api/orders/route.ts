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
  status: 'pending' | 'dispatched' | 'returned' | 'cancelled'
  shippingAddress: string
  paymentMethod: string
  customerPhone: string
  billingAddress: string
  subtotal: number
  shipping: number
  tax: number
  codFee: number
}

export async function POST(request: NextRequest) {
  try {
    const orderData: Order = await request.json()
    
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
      // File doesn't exist or is empty, start with empty array
      orders = []
    }
    
    // Add new order
    orders.push(orderData)
    
    // Write back to file
    await fs.writeFile(ordersFilePath, JSON.stringify(orders, null, 2))
    
    return NextResponse.json({ 
      success: true, 
      message: 'Order saved successfully',
      orderId: orderData.id 
    })
    
  } catch (error) {
    console.error('Error saving order:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to save order' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
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
      // File doesn't exist or is empty, return empty array
      orders = []
    }
    
    return NextResponse.json({ 
      success: true, 
      orders 
    })
    
  } catch (error) {
    console.error('Error reading orders:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to read orders' },
      { status: 500 }
    )
  }
} 