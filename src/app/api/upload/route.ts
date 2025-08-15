import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const files = formData.getAll('images') as File[];
    
    if (!files || files.length === 0) {
      return NextResponse.json({ success: false, error: 'No files uploaded' }, { status: 400 });
    }

    const uploadDir = join(process.cwd(), 'public', 'productImages');
    
    // Create directory if it doesn't exist
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    const savedPaths: string[] = [];

    for (const file of files) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        continue; // Skip non-image files
      }

      // Generate unique filename
      const timestamp = Date.now();
      const randomString = Math.random().toString(36).substring(2, 15);
      const extension = file.name.split('.').pop() || 'jpg';
      const filename = `${timestamp}_${randomString}.${extension}`;
      
      // Full path for saving
      const filePath = join(uploadDir, filename);
      
      // Convert file to buffer and save
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      
      await writeFile(filePath, buffer);
      
      // Store the public URL path
      savedPaths.push(`/productImages/${filename}`);
    }

    if (savedPaths.length === 0) {
      return NextResponse.json({ success: false, error: 'No valid images uploaded' }, { status: 400 });
    }

    return NextResponse.json({ 
      success: true, 
      images: savedPaths,
      message: `${savedPaths.length} image(s) uploaded successfully`
    });

  } catch (error) {
    console.error('Error uploading images:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to upload images' 
    }, { status: 500 });
  }
} 