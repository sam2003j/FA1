import { NextRequest, NextResponse } from 'next/server';
import { decode_jwt, validate_jwt } from 'jwt-library';

export async function GET(req: NextRequest) {
    const token = req.headers.get('authorization')?.split(' ')[1];

    if (!token) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const secret = process.env.JWT_SECRET || 'testsecret';

    if (!validate_jwt(secret, token)) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decoded = decode_jwt(secret, token);

    return NextResponse.json({ user: decoded.payload });
}
