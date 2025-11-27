import { NextRequest, NextResponse } from 'next/server';
   import connectDB from '@/lib/db';
   import Member from '@/models/Member';

   export async function POST(req: NextRequest) {
     try {
       await connectDB();
       const data = await req.formData();
       
       // Process form data
       const memberData = {
         firstName: data.get('firstName'),
         lastName: data.get('lastName'),
         // ... other fields
       };

       const member = await Member.create(memberData);
       
       return NextResponse.json({ 
         success: true, 
         memberId: member._id 
       });
     } catch (error) {
       return NextResponse.json(
         { error: 'Registration failed' },
         { status: 500 }
       );
     }
   }