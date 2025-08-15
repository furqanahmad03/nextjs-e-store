import { Product } from '@/types/Product';
import { NextRequest, NextResponse } from 'next/server';
import productsData from './products.json';
import { writeFile } from 'fs/promises';
import { join } from 'path';

// Use products from JSON file and make it mutable for operations
let products: Product[] = productsData as Product[];

// Helper function to save products to JSON file
const saveProductsToFile = async () => {
  try {
    const filePath = join(process.cwd(), 'src', 'app', 'api', 'products', 'products.json');
    await writeFile(filePath, JSON.stringify(products, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error saving products to file:', error);
    throw new Error('Failed to save products to file');
  }
};

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
    const newId = Math.max(...products.map((p: Product) => p.id), 0) + 1;
    
    // Create new product with generated ID
    const newProduct = {
      ...productData,
      id: newId,
      date_added: new Date().toISOString().split('T')[0]
    };
    
    // Add to products array
    products.push(newProduct);
    
    // Save to JSON file
    await saveProductsToFile();
    
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
    const productIndex = products.findIndex((p: Product) => p.id === id);
    if (productIndex === -1) {
      return NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 });
    }
    
    // Update product
    products[productIndex] = { ...products[productIndex], ...updateData };
    
    // Save to JSON file
    await saveProductsToFile();
    
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
    const filteredProducts = products.filter((p: Product) => p.id !== parseInt(id));
    products = filteredProducts;
    
    // Save to JSON file
    await saveProductsToFile();
    
    return NextResponse.json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete product' }, { status: 500 });
  }
} 