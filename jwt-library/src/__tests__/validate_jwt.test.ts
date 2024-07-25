import { validateJWT } from '../validateJWT';
import { encodeJWT } from '../encodeJWT';
import { JwtPayload } from '../interfaces';

describe('validateJWT', () => {
  const secret = 'test-secret';
  const ttl = 3600; // 1 hour
  const header = { alg: 'HS256', typ: 'JWT' };
  const payload: JwtPayload = { id: '123', role: 'admin' };

  const validToken = encodeJWT(header, payload, secret, ttl);

  it('should return true for a valid JWT', () => {
    expect(validateJWT(validToken, secret)).toBe(true);
  });

  it('should return false for an invalid signature', () => {
    const invalidToken = `${validToken.split('.')[0]}.${validToken.split('.')[1]}.invalid-signature`;
    expect(validateJWT(invalidToken, secret)).toBe(false);
  });

  it('should return false for an expired JWT', () => {
    const expiredPayload: JwtPayload = { ...payload, exp: Math.floor(Date.now() / 1000) - 60 }; // 1 minute ago
    const expiredToken = encodeJWT(header, expiredPayload, secret, ttl);
    expect(validateJWT(expiredToken, secret)).toBe(false);
  });

  it('should return false for an invalid format', () => {
    expect(validateJWT('invalid.token.format', secret)).toBe(false);
  });
});
