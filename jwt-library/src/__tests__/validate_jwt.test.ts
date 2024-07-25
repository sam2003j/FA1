import { validateJWT } from '../validateJWT';
import { encodeJWT } from '../encodeJWT';
import { JwtPayload } from '../interfaces';

describe('validateJWT', () => {
  const header = { alg: 'HS256', typ: 'JWT' };
  const payload: JwtPayload = { sub: '1234567890', name: 'John Doe', admin: true, id: '1', role: 'admin' };
  const secret = 'your-256-bit-secret';
  const ttl = 3600; // 1 hour

  it('should validate JWT correctly', () => {
    const token = encodeJWT(header, payload, secret, ttl);
    const isValid = validateJWT(secret, token);
    expect(isValid).toBe(true);
  });

  it('should return false for invalid JWT format', () => {
    const isValid = validateJWT(secret, 'invalid.token.here');
    expect(isValid).toBe(false);
  });

  it('should return false for invalid JWT signature', () => {
    const token = encodeJWT(header, payload, secret, ttl);
    const invalidToken = token.replace(/\./g, 'x');
    const isValid = validateJWT(secret, invalidToken);
    expect(isValid).toBe(false);
  });
});
