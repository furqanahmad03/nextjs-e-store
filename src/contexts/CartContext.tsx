"use client"

import React, { createContext, useContext, useEffect, useState } from 'react'
import { toast } from 'sonner'

export interface CartItem {
  id: number
  name: string
  price: number
  image: string
  stock: number
  quantity: number
  total: number
}

export interface OrderItem {
  id: number
  name: string
  price: number
  image: string
  quantity: number
  total: number
}

export interface Order {
  id: string
  items: OrderItem[]
  total: number
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled' | 'returned'
  orderDate: string
  estimatedDelivery: string
  shippingAddress: {
    firstName: string
    lastName: string
    email: string
    phone: string
    address: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  billingAddress: {
    firstName: string
    lastName: string
    address: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  paymentMethod: 'card' | 'paypal' | 'cod'
  paymentStatus: 'pending' | 'paid' | 'failed'
  cancellationReason?: string
  returnReason?: string
  returnDate?: string
  cancellationDate?: string
}

export interface WishlistItem {
  id: number
  name: string
  price: number
  image: string
  images: string[]
  category: string
  subcategory: string
  brand: string
  rating: number
  stock: number
  isSale: boolean
  dateAdded: string
  description?: string
}

interface CartContextType {
  items: CartItem[]
  addToCart: (productId: number, quantity?: number) => Promise<void>
  updateQuantity: (productId: number, quantity: number) => Promise<void>
  removeFromCart: (productId: number) => Promise<void>
  clearCart: () => void
  getCartTotal: () => number
  getCartCount: () => number
  orders: Order[]
  createOrder: (orderData: Omit<Order, 'id' | 'orderDate' | 'estimatedDelivery' | 'status' | 'paymentStatus'>) => void
  getOrders: () => Order[]
  cancelOrder: (orderId: string, reason: string) => void
  returnOrder: (orderId: string, reason: string) => void
  wishlist: WishlistItem[]
  addToWishlist: (product: Omit<WishlistItem, 'dateAdded'>) => void
  removeFromWishlist: (productId: number) => void
  isInWishlist: (productId: number) => boolean
  getWishlistCount: () => number
  isHydrated: boolean
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [wishlist, setWishlist] = useState<WishlistItem[]>([])
  const [isHydrated, setIsHydrated] = useState(false)

  // Load cart, orders, and wishlist from session storage on mount
  useEffect(() => {
    const savedCart = sessionStorage.getItem('cart')
    const savedOrders = sessionStorage.getItem('orders')
    const savedWishlist = sessionStorage.getItem('wishlist')
    
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart))
      } catch (error) {
        console.error('Error loading cart from session storage:', error)
      }
    }
    
    if (savedOrders) {
      try {
        setOrders(JSON.parse(savedOrders))
      } catch (error) {
        console.error('Error loading orders from session storage:', error)
      }
    }

    if (savedWishlist) {
      try {
        const parsedWishlist = JSON.parse(savedWishlist)
        // Migrate existing wishlist items to include images array if missing
        const migratedWishlist = parsedWishlist.map((item: WishlistItem) => ({
          ...item,
          images: item.images || [item.image] // Add images array if missing
        }))
        setWishlist(migratedWishlist)
      } catch (error) {
        console.error('Error loading wishlist from session storage:', error)
      }
    }
    
    setIsHydrated(true)
  }, [])

  // Save cart, orders, and wishlist to session storage whenever they change
  useEffect(() => {
    sessionStorage.setItem('cart', JSON.stringify(items))
  }, [items])

  useEffect(() => {
    sessionStorage.setItem('orders', JSON.stringify(orders))
  }, [orders])

  useEffect(() => {
    sessionStorage.setItem('wishlist', JSON.stringify(wishlist))
  }, [wishlist])

  const addToCart = async (productId: number, quantity: number = 1) => {
    try {
      // Check if item already exists in cart
      const existingItem = items.find(item => item.id === productId)
      
      if (existingItem) {
        const newQuantity = existingItem.quantity + quantity
        if (newQuantity > existingItem.stock) {
          toast.error(`Only ${existingItem.stock} items available in stock`)
          return
        }
        await updateQuantity(productId, newQuantity)
        return
      }

      // Try to get product from API first
      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, quantity })
      })

      if (!response.ok) {
        const errorData = await response.json()
        if (errorData.error === 'Product not found') {
          // If product not found in API, try to find it in wishlist
          const wishlistItem = wishlist.find(item => item.id === productId)
          if (wishlistItem) {
            const newItem: CartItem = {
              id: wishlistItem.id,
              name: wishlistItem.name,
              price: wishlistItem.price,
              image: wishlistItem.image,
              stock: wishlistItem.stock,
              quantity: quantity,
              total: wishlistItem.price * quantity
            }
            setItems(prevItems => [...prevItems, newItem])
            toast.success(`Added ${wishlistItem.name} to cart!`)
            return
          }
        }
        throw new Error(errorData.error || 'Failed to add item to cart')
      }

      const productData = await response.json()
      const newItem: CartItem = {
        id: productData.id,
        name: productData.name,
        price: productData.price,
        image: productData.image,
        stock: productData.stock,
        quantity: productData.quantity,
        total: productData.total
      }
      
      setItems(prevItems => [...prevItems, newItem])
      toast.success(`Added ${productData.name} to cart!`)
    } catch (error) {
      console.error('Error adding to cart:', error)
      toast.error('Failed to add item to cart')
      throw error
    }
  }

  const updateQuantity = async (productId: number, quantity: number) => {
    try {
      const item = items.find(item => item.id === productId)
      if (!item) {
        toast.error('Item not found in cart')
        return
      }

      // Validate quantity against stock
      if (quantity > item.stock) {
        toast.error(`Cannot update quantity. Only ${item.stock} available in stock.`)
        return
      }

      // Additional validation to ensure quantity is within bounds
      if (quantity < 1) {
        toast.error('Quantity must be at least 1')
        return
      }

      const response = await fetch(`/api/cart/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quantity }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        toast.error(errorData.error || 'Failed to update cart item')
        return
      }

      setItems(prevItems => {
        const itemToUpdate = prevItems.find(item => item.id === productId)
        
        if (quantity <= 0) {
          // Remove item if quantity is 0 or less
          if (itemToUpdate) {
            toast.success(`Removed ${itemToUpdate.name} from cart`)
          }
          return prevItems.filter(item => item.id !== productId)
        }
        
        // Update quantity
        const updatedItems = prevItems.map(item =>
          item.id === productId
            ? { ...item, quantity, total: item.price * quantity }
            : item
        )
        
        const updatedItem = updatedItems.find(item => item.id === productId)
        if (updatedItem) {
          toast.success(`Updated ${updatedItem.name} quantity to ${quantity}`)
        }
        
        return updatedItems
      })
    } catch (error) {
      console.error('Error updating cart item:', error)
      toast.error('Failed to update item quantity')
    }
  }

  const removeFromCart = async (productId: number) => {
    try {
      const itemToRemove = items.find(item => item.id === productId)
      
      const response = await fetch(`/api/cart/${productId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to remove item from cart')
      }

      setItems(prevItems => prevItems.filter(item => item.id !== productId))
      
      if (itemToRemove) {
        toast.success(`Removed ${itemToRemove.name} from cart`)
      }
    } catch (error) {
      console.error('Error removing item from cart:', error)
      toast.error('Failed to remove item from cart')
    }
  }

  const clearCart = () => {
    setItems([])
    toast.success('Cart cleared successfully')
  }

  const getCartTotal = () => {
    return items.reduce((total, item) => total + item.total, 0)
  }

  const getCartCount = () => {
    if (!isHydrated) return 0
    return items.reduce((count, item) => count + item.quantity, 0)
  }

  const createOrder = (orderData: Omit<Order, 'id' | 'orderDate' | 'estimatedDelivery' | 'status' | 'paymentStatus'>) => {
    const orderId = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    const orderDate = new Date().toISOString()
    const estimatedDelivery = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days from now
    
    const newOrder: Order = {
      ...orderData,
      id: orderId,
      orderDate,
      estimatedDelivery,
      status: 'pending',
      paymentStatus: orderData.paymentMethod === 'cod' ? 'pending' : 'paid'
    }

    setOrders(prevOrders => [newOrder, ...prevOrders])
    setItems([]) // Clear cart after order creation
    toast.success(`Order #${orderId} placed successfully!`)
  }

  const getOrders = () => {
    return orders
  }

  const cancelOrder = (orderId: string, reason: string) => {
    setOrders(prevOrders => 
      prevOrders.map(order => 
        order.id === orderId 
          ? { 
              ...order, 
              status: 'cancelled' as const, 
              cancellationReason: reason,
              cancellationDate: new Date().toISOString()
            }
          : order
      )
    )
    toast.success('Order cancelled successfully')
  }

  const returnOrder = (orderId: string, reason: string) => {
    setOrders(prevOrders => 
      prevOrders.map(order => 
        order.id === orderId 
          ? { 
              ...order, 
              status: 'returned' as const, 
              returnReason: reason,
              returnDate: new Date().toISOString()
            }
          : order
      )
    )
    toast.success('Return request submitted successfully')
  }

  const addToWishlist = (product: Omit<WishlistItem, 'dateAdded'>) => {
    const newItem: WishlistItem = {
      ...product,
      dateAdded: new Date().toISOString()
    }
    setWishlist(prevWishlist => [...prevWishlist, newItem])
    toast.success(`Added ${newItem.name} to wishlist!`)
  }

  const removeFromWishlist = (productId: number) => {
    setWishlist(prevWishlist => prevWishlist.filter(item => item.id !== productId));
    toast.success('Item removed from wishlist!');
  };

  const isInWishlist = (productId: number) => {
    return wishlist.some(item => item.id === productId);
  };

  const getWishlistCount = () => {
    if (!isHydrated) return 0
    return wishlist.length;
  };

  const value = {
    items,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getCartTotal,
    getCartCount,
    orders,
    createOrder,
    getOrders,
    cancelOrder,
    returnOrder,
    wishlist,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    getWishlistCount,
    isHydrated,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
} 