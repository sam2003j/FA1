import { NextRequest, NextResponse } from 'next/server';
import { encodeJWT } from 'jwt-library'; 
import { JwtPayload } from 'jwt-library';

export async function POST(req: NextRequest) {
  const { id, role } = await req.json();

  if (!id || !role) {
    return NextResponse.json({ error: 'Missing id or role' }, { status: 400 });
  }

  const secret = process.env.JWT_SECRET || 'fallback-secret-key'; // get secret key from environment variable
  const payload: JwtPayload = { id, role };
  const token = encodeJWT({ alg: 'HS256', typ: 'JWT' }, payload, secret, 3600);

  return NextResponse.json({ token });
}
