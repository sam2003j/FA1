import { NextRequest, NextResponse } from 'next/server';
import { decodeJWT, validateJWT } from 'jwt-library';

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('Authorization');
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Authorization header missing or malformed' }, { status: 401 });
  }

  const token = authHeader.split(' ')[1];
  const secret = process.env.JWT_SECRET || 'fallback-secret-key';

  // Validate JWT
  if (!validateJWT(secret, token)) {
    return NextResponse.json({ error: 'Invalid JWT' }, { status: 401 });
  }

  try {
    const decoded = decodeJWT(token, secret);
    return NextResponse.json({
      id: decoded.payload.id,
      role: decoded.payload.role,
      expires_at: decoded.expires_at
    });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message || 'Failed to decode token' }, { status: 401 });
  }
}
