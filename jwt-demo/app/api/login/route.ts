import { NextRequest, NextResponse } from 'next/server';
import { encode_jwt } from 'jwt-library';

export async function POST(req: NextRequest) {
  const { id, role } = await req.json();

  if (!id || !role) {
    return NextResponse.json({ error: 'Missing id or role' }, { status: 400 });
  }

  const secret = process.env.JWT_SECRET || 'fallback-secret-key';
  const token = encode_jwt(secret, id, { role }, 3600);

  return NextResponse.json({ token });
}
