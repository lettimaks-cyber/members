import { v2 as cloudinary } from 'cloudinary';
import { NextRequest, NextResponse } from 'next/server';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: NextRequest) {
  try {
    // Validate Cloudinary configuration
    if (!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME) {
      console.error('❌ NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME is not defined');
      return NextResponse.json(
        { error: 'Cloudinary cloud name not configured' },
        { status: 500 }
      );
    }

    if (!process.env.CLOUDINARY_API_KEY) {
      console.error('❌ CLOUDINARY_API_KEY is not defined');
      return NextResponse.json(
        { error: 'Cloudinary API key not configured' },
        { status: 500 }
      );
    }

    if (!process.env.CLOUDINARY_API_SECRET) {
      console.error('❌ CLOUDINARY_API_SECRET is not defined');
      return NextResponse.json(
        { error: 'Cloudinary API secret not configured' },
        { status: 500 }
      );
    }

    console.log('✅ Cloudinary configured');

    // Get form data
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      console.error('❌ No file provided in form data');
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
      console.error('❌ Invalid file type:', file.type);
      return NextResponse.json(
        { error: 'Invalid file type. Please upload a JPEG, PNG, or WebP image' },
        { status: 400 }
      );
    }

    // Validate file size (5MB limit)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      console.error('❌ File too large:', file.size);
      return NextResponse.json(
        { error: 'File too large. Maximum size is 5MB' },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    console.log('🔄 Uploading to Cloudinary...');

    // Upload to Cloudinary
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'member-profiles',
          transformation: [
            { width: 500, height: 500, crop: 'fill', gravity: 'face' },
            { quality: 'auto', fetch_format: 'auto' },
          ],
        },
        (error, result) => {
          if (error) {
            console.error('❌ Cloudinary upload error:', error);
            reject(error);
          } else {
            console.log('✅ Upload successful:', result?.public_id);
            resolve(result);
          }
        }
      );

      uploadStream.end(buffer);
    });

    return NextResponse.json({
      success: true,
      url: (result as any).secure_url,
      publicId: (result as any).public_id,
    });
  } catch (error: any) {
    console.error('❌ Upload API error:', error);
    
    return NextResponse.json(
      { 
        error: 'Upload failed', 
        details: error.message || 'Unknown error',
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
      },
      { status: 500 }
    );
  }
}