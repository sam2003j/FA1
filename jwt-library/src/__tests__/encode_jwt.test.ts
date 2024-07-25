import { encodeJWT } from '../encodeJWT';
import { base64UrlEncode, base64UrlDecode } from '../utils/base64Urls';
import { JwtPayload } from '../interfaces';

describe('encodeJWT', () => {
  const secret = 'test-secret';
  const ttl = 3600; 
  const header = { alg: 'HS256', typ: 'JWT' };
  const payload: JwtPayload = { id: '123', role: 'admin' };

  it('should correctly encode a JWT', () => {
    const token = encodeJWT(header, payload, secret, ttl);
    expect(token).toBeDefined();
    expect(token.split('.').length).toBe(3);
  });

  it('should set expiration correctly', () => {
    const token = encodeJWT(header, payload, secret, ttl);
    const [_, payloadEncoded] = token.split('.').slice(1, 2);
    const decodedPayload = JSON.parse(Buffer.from(base64UrlDecode(payloadEncoded), 'utf8').toString());
    expect(decodedPayload.exp).toBeGreaterThan(Math.floor(Date.now() / 1000));
  });

  it('should handle invalid TTL', () => {
    expect(() => encodeJWT(header, payload, secret, -1)).toThrow('Invalid TTL');
  });
});
