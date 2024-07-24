import jwt from 'jsonwebtoken';

export interface JwtPayload {
    id: string | number;
    role: string;
    exp?: number;
    [key: string]: any;
}

export function encode_jwt(secret: string, id: string | number, payload: object, ttl?: number): string {
    const data = { id, ...payload };
    const options = ttl ? { expiresIn: ttl } : {};
    return jwt.sign(data, secret, options);
}

export function decode_jwt(secret: string, token: string): { id: string, payload: JwtPayload, expires_at: Date } {
    try {
        const decoded = jwt.verify(token, secret) as JwtPayload;
        return {
            id: decoded.id as string,
            payload: decoded,
            expires_at: new Date(decoded.exp! * 1000)
        };
    } catch (err) {
        throw new Error('Invalid JWT');
    }
}

export function validate_jwt(secret: string, token: string): boolean {
    try {
        jwt.verify(token, secret);
        return true;
    } catch (err) {
        return false;
    }
}
