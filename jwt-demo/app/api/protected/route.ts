import { NextRequest, NextResponse } from 'next/server';
import { decode_jwt, validate_jwt } from 'jwt-library';

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Authorization header missing or malformed' }, { status: 401 });
  }

  const token = authHeader.split(' ')[1];
  const secret = process.env.JWT_SECRET || 'fallback-secret-key';

  if (!validate_jwt(secret, token)) {
    return NextResponse.json({ error: 'Invalid JWT' }, { status: 401 });
  }

  const decoded = decode_jwt(secret, token);

  return NextResponse.json({ id: decoded.id, role: decoded.payload.role, expires_at: decoded.expires_at });
}
