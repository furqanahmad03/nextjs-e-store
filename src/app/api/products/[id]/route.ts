import { NextRequest, NextResponse } from "next/server";
import products from "../products.json";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
  ) {
    try {
      const { id } = await params;
      const productId = parseInt(id);
      const product = products.find(p => p.id === productId);
      
      if (!product) {
        return NextResponse.json(
          { success: false, error: 'Product not found' }, 
          { status: 404 }
        );
      }
      
      return NextResponse.json({ success: true, product });
    } catch (error) {
      return NextResponse.json(
        { success: false, error: 'Failed to fetch product' }, 
        { status: 500 }
      );
    }
  }