import { NextRequest, NextResponse } from 'next/server';

/**
 * Simple upload that stores images as base64 data URLs
 * This is NOT recommended for production but works for testing
 * For production, use Cloudinary or another image hosting service
 */
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    console.log('📁 File received:', {
      name: file.name,
      type: file.type,
      size: file.size,
    });

    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Please upload JPEG, PNG, or WebP' },
        { status: 400 }
      );
    }

    // Validate file size (2MB limit for base64)
    const maxSize = 2 * 1024 * 1024; // 2MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File too large. Maximum size is 2MB' },
        { status: 400 }
      );
    }

    // Convert to base64
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = buffer.toString('base64');
    const dataUrl = `data:${file.type};base64,${base64}`;

    console.log('✅ Image converted to base64');

    return NextResponse.json({
      success: true,
      url: dataUrl,
      message: 'Image stored as base64 (for testing only)',
    });
  } catch (error: any) {
    console.error('❌ Upload error:', error);
    
    return NextResponse.json(
      { 
        error: 'Upload failed', 
        details: error.message || 'Unknown error',
      },
      { status: 500 }
    );
  }
}