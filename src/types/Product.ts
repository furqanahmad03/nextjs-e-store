export interface Product {
  id: number
  name: string
  description: string
  price: number
  category: string
  subcategory: string
  image: string
  images: string[]
  date_added: string
  brand: string
  rating: number
  stock: number
  isSale: boolean
}

export interface ProductCardProps {
  id: number
  name: string
  image: string
  currentPrice: number
  originalPrice: number
  discount: number
  rating: number
  reviews: number
}
