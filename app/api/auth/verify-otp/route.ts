import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const {  emailAddress, password, clerkUserId } = await request.json();
    
    if (!clerkUserId) {
      return NextResponse.json(
        { error: 'No Clerk user ID provided' },
        { status: 401 }
      );
    }

    const response = await fetch(
      'https://terrier-smooth-mouse.ngrok-free.app/api/auth/users/register',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: emailAddress,
          password: password,
          clerkUserId: clerkUserId,
        }),
      }
    );

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
    
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Error in verify-otp route:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}