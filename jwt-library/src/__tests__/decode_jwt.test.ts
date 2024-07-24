import { encode_jwt, decode_jwt, JwtPayload } from '../index';

describe('decode_jwt', () => {
    const secret = 'testsecret';
    const id = 'testid';
    const payload: JwtPayload = { id, role: 'admin' };
    const ttl = 3600;

    it('should decode a valid JWT', () => {
        const token = encode_jwt(secret, id, payload, ttl);
        const decoded = decode_jwt(secret, token);

        expect(decoded.id).toBe(id);
        expect(decoded.payload.role).toBe(payload.role);
        expect(decoded.expires_at).toBeInstanceOf(Date);
    });

    it('should throw an error for an invalid JWT', () => {
        const invalidToken = 'invalidtoken';
        expect(() => decode_jwt(secret, invalidToken)).toThrow('Invalid JWT');
    });
});
