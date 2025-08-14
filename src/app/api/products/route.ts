import { NextRequest, NextResponse } from 'next/server';

// In-memory storage for products (avoids Turbopack HMR conflicts)
// Note: This approach stores products in memory during the server session.
// Products will persist as long as the server is running.
// For production, consider using a proper database like PostgreSQL, MongoDB, or Prisma.
let products: any[] = [
  {
    "id": 2,
    "name": "Ladies Diamond Watch",
    "description": "Elegant diamond-studded watch with leather strap. Perfect for formal occasions and daily wear.",
    "price": 80.74,
    "category": "Woman Fashion",
    "subcategory": "Watches",
    "image": "/productImages/watch.jpg",
    "images": [
      "/productImages/watch.jpg",
      "/productImages/watch2.jpg",
      "/productImages/watch3.jpg",
      "/productImages/watch4.jpg"
    ],
    "date_added": "2024-09-12",
    "brand": "LuxuryTime",
    "rating": 3,
    "stock": 35,
    "isSale": true
  },
  {
    "id": 3,
    "name": "Professional Football",
    "description": "Official size and weight football for professional training and matches. Made with premium leather.",
    "price": 184.56,
    "category": "Sports Outdoor",
    "subcategory": "Football",
    "image": "/productImages/football.jpg",
    "images": [
      "/productImages/football.jpg",
      "/productImages/football2.jpg",
      "/productImages/football3.jpg"
    ],
    "date_added": "2024-12-23",
    "brand": "SportMaster",
    "rating": 3.2,
    "stock": 74,
    "isSale": true
  },
  {
    "id": 4,
    "name": "Organic Dog Food",
    "description": "Premium organic dog food with natural ingredients. Supports healthy digestion and shiny coat.",
    "price": 478.88,
    "category": "Groceries Pets",
    "subcategory": "Pet Food",
    "image": "/productImages/catfood.jpg",
    "images": [
      "/productImages/catfood.jpg",
      "/productImages/catfood2.jpg",
      "/productImages/catfood3.jpg",
      "/productImages/catfood4.jpg"
    ],
    "date_added": "2024-11-18",
    "brand": "PetCare",
    "rating": 2.3,
    "stock": 71,
    "isSale": true
  },
  {
    "id": 5,
    "name": "Baseball Bat",
    "description": "Professional wooden baseball bat. Perfect for training and competitive play.",
    "price": 124,
    "category": "Sports Outdoor",
    "subcategory": "Baseball",
    "image": "/productImages/bat.jpg",
    "images": [
      "/productImages/bat.jpg",
      "/productImages/bat2.jpg",
      "/productImages/bat3.jpg"
    ],
    "date_added": "2025-03-09",
    "brand": "SportMaster",
    "rating": 2,
    "stock": 25,
    "isSale": false
  },
  {
    "id": 7,
    "name": "Tennis Racket",
    "description": "Professional tennis racket with comfortable grip. Ideal for both beginners and advanced players.",
    "price": 99.42,
    "category": "Sports Outdoor",
    "subcategory": "Tennis",
    "image": "/productImages/tennis.jpg",
    "images": [
      "/productImages/tennis.jpg",
      "/productImages/tennis2.jpg"
    ],
    "date_added": "2024-12-22",
    "brand": "SportMaster",
    "rating": 3.9,
    "stock": 13,
    "isSale": true
  },
  {
    "id": 8,
    "name": "Men's Cotton T-Shirt",
    "description": "Comfortable cotton t-shirt for daily wear. Available in multiple colors and sizes.",
    "price": 45.99,
    "category": "Men Fashion",
    "subcategory": "T-Shirts",
    "image": "/productImages/shirt.jpg",
    "images": [
      "/productImages/shirt.jpg",
      "/productImages/shirt2.jpg",
      "/productImages/shirt3.jpg"
    ],
    "date_added": "2024-10-15",
    "brand": "FashionHub",
    "rating": 4.1,
    "stock": 120,
    "isSale": false
  },
  {
    "id": 9,
    "name": "Men's Denim Jeans",
    "description": "Classic denim jeans with perfect fit. Durable and stylish for everyday wear.",
    "price": 89.99,
    "category": "Men Fashion",
    "subcategory": "Jeans",
    "image": "/productImages/jeans.jpg",
    "images": [
      "/productImages/jeans.jpg",
      "/productImages/jeans2.jpg"
    ],
    "date_added": "2024-11-20",
    "brand": "FashionHub",
    "rating": 4.3,
    "stock": 85,
    "isSale": false
  },
  {
    "id": 10,
    "name": "Premium Cat Food",
    "description": "High-quality cat food with essential nutrients. Supports healthy growth and energy.",
    "price": 34.99,
    "category": "Groceries Pets",
    "subcategory": "Pet Food",
    "image": "/productImages/catfood.jpg",
    "images": [
      "/productImages/catfood.jpg",
      "/productImages/catfood2.jpg",
      "/productImages/catfood3.jpg",
      "/productImages/catfood4.jpg"
    ],
    "date_added": "2024-09-05",
    "brand": "PetCare",
    "rating": 4,
    "stock": 95,
    "isSale": false
  },
  {
    "id": 11,
    "name": "Vitamin C Supplements",
    "description": "Natural vitamin C supplements for immune support. 1000mg per tablet.",
    "price": 15.99,
    "category": "Medicine",
    "subcategory": "Vitamins",
    "image": "/productImages/tablets3.jpg",
    "images": [
      "/productImages/tablets3.jpg",
      "/productImages/tablets4.jpg"
    ],
    "date_added": "2024-08-12",
    "brand": "HealthPlus",
    "rating": 4.5,
    "stock": 200,
    "isSale": false
  },
  {
    "id": 12,
    "name": "Modern Coffee Table",
    "description": "Elegant coffee table with wooden finish. Perfect for living room decoration.",
    "price": 299.99,
    "category": "Home Lifestyle",
    "subcategory": "Furniture",
    "image": "/productImages/table.jpg",
    "images": [
      "/productImages/table.jpg",
      "/productImages/table2.jpg",
      "/productImages/table3.jpg"
    ],
    "date_added": "2024-07-18",
    "brand": "HomeDecor",
    "rating": 4.2,
    "stock": 15,
    "isSale": false
  }
];

// GET - Fetch all products
export async function GET() {
  try {
    return NextResponse.json({ success: true, products });
  } catch (error) {
    console.error('Error reading products:', error);
    return NextResponse.json({ success: false, products: [] }, { status: 500 });
  }
}

// POST - Create new product
export async function POST(request: NextRequest) {
  try {
    const productData = await request.json();
    
    // Generate new ID
    const newId = Math.max(...products.map((p: any) => p.id), 0) + 1;
    
    // Create new product with generated ID
    const newProduct = {
      ...productData,
      id: newId,
      date_added: new Date().toISOString().split('T')[0]
    };
    
    // Add to products array
    products.push(newProduct);
    
    return NextResponse.json({ success: true, product: newProduct });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json({ success: false, error: 'Failed to create product' }, { status: 500 });
  }
}

// PUT - Update existing product
export async function PUT(request: NextRequest) {
  try {
    const { id, ...updateData } = await request.json();
    
    // Find and update product
    const productIndex = products.findIndex((p: any) => p.id === id);
    if (productIndex === -1) {
      return NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 });
    }
    
    // Update product
    products[productIndex] = { ...products[productIndex], ...updateData };
    
    return NextResponse.json({ success: true, product: products[productIndex] });
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json({ success: false, error: 'Failed to update product' }, { status: 500 });
  }
}

// DELETE - Delete product
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ success: false, error: 'Product ID is required' }, { status: 400 });
    }
    
    // Filter out the product to delete
    const filteredProducts = products.filter((p: any) => p.id !== parseInt(id));
    products = filteredProducts;
    
    return NextResponse.json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete product' }, { status: 500 });
  }
} 