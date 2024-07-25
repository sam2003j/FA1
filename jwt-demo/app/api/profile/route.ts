import { NextRequest, NextResponse } from 'next/server';
import { decodeJWT, validateJWT } from 'jwt-library';

export async function GET(req: NextRequest) {
    const token = req.headers.get('authorization')?.split(' ')[1];

    if (!token) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const secret = process.env.JWT_SECRET || 'fallback-secret-key';

    if (!validateJWT(secret, token)) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const decoded = decodeJWT(token, secret);
        return NextResponse.json({ user: decoded.payload });
    } catch (error) {
        return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }
}
