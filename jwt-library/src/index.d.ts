export function encode_jwt(secret: string, id: string | number, payload: object, ttl?: number): string;
export function decode_jwt(secret: string, token: string): { id: string, payload: object, expires_at: Date };
export function validate_jwt(secret: string, token: string): boolean;
