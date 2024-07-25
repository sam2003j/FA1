import { decodeJWT } from '../decodeJWT';
import { encodeJWT } from '../encodeJWT';
import { JwtPayload } from '../interfaces';

describe('decodeJWT', () => {
  const header = { alg: 'HS256', typ: 'JWT' };
  const payload: JwtPayload = { sub: '1234567890', name: 'John Doe', admin: true, id: '1', role: 'admin' };
  const secret = 'your-256-bit-secret';
  const ttl = 3600; // 1 hour

  it('should decode JWT correctly', () => {
    const token = encodeJWT(header, payload, secret, ttl);
    const decoded = decodeJWT(token, secret);
    expect(decoded.payload.sub).toBe(payload.sub);
    expect(decoded.payload.name).toBe(payload.name);
    expect(decoded.payload.admin).toBe(payload.admin);
    expect(decoded.payload.id).toBe(payload.id);
    expect(decoded.payload.role).toBe(payload.role);
  });

  it('should throw an error for invalid JWT format', () => {
    expect(() => decodeJWT('invalid.token.here', secret)).toThrow('Invalid JWT format');
  });

  it('should throw an error for invalid JWT signature', () => {
    const token = encodeJWT(header, payload, secret, ttl);
    const invalidToken = token.replace(/\./g, 'x');
    expect(() => decodeJWT(invalidToken, secret)).toThrow('Invalid JWT signature');
  });

  it('should throw an error for expired token', (done) => {
    const shortTTL = 1; // 1 second
    const token = encodeJWT(header, payload, secret, shortTTL);
    setTimeout(() => {
      expect(() => decodeJWT(token, secret)).toThrow('Token has expired');
      done();
    }, 2000);
  });
});
