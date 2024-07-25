import { encodeJWT } from '../encodeJWT';
import { JwtPayload } from '../interfaces';

describe('encodeJWT', () => {
  const header = { alg: 'HS256', typ: 'JWT' };
  const payload: JwtPayload = { sub: '1234567890', name: 'John Doe', admin: true, id: '1', role: 'admin' };
  const secret = 'your-256-bit-secret';
  const ttl = 3600; // 1 hour

  it('should encode JWT correctly', () => {
    const token = encodeJWT(header, payload, secret, ttl);
    expect(typeof token).toBe('string');
    const parts = token.split('.');
    expect(parts.length).toBe(3);
  });

  it('should throw an error for invalid TTL', () => {
    expect(() => encodeJWT(header, payload, secret, 0)).toThrow('Invalid TTL');
  });
});
