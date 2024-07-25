import { decodeJWT } from '../decodeJWT';
import { base64UrlEncode, base64UrlDecode } from '../utils/base64Urls';
import crypto from 'crypto';
import { JwtPayload } from '../interfaces';

describe('decodeJWT', () => {
  const secret = 'test-secret';
  const ttl = 3600;
  const header = { alg: 'HS256', typ: 'JWT' };
  const payload: JwtPayload = { id: '123', role: 'admin' };

  const token = (() => {
    const headerEncoded = base64UrlEncode(JSON.stringify(header));
    const payloadWithExpiry = { ...payload, exp: Math.floor(Date.now() / 1000) + ttl };
    const payloadEncoded = base64UrlEncode(JSON.stringify(payloadWithExpiry));
    const signature = crypto
      .createHmac('sha256', secret)
      .update(`${headerEncoded}.${payloadEncoded}`)
      .digest('base64')
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');
    return `${headerEncoded}.${payloadEncoded}.${signature}`;
  })();

  it('should decode a valid JWT', () => {
    const decoded = decodeJWT(token, secret);
    expect(decoded).toHaveProperty('header');
    expect(decoded).toHaveProperty('payload');
    expect(decoded).toHaveProperty('expires_at');
    expect(decoded.payload.id).toBe('123');
  });

  it('should throw an error for an invalid JWT', () => {
    const invalidToken = `${token.split('.')[0]}.${token.split('.')[1]}.invalid-signature`;
    expect(() => decodeJWT(invalidToken, secret)).toThrowError('Invalid JWT signature');
  });

  it('should throw an error for an expired JWT', () => {
    const expiredPayload: JwtPayload = { ...payload, exp: Math.floor(Date.now() / 1000) - 60 }; 
    const expiredPayloadEncoded = base64UrlEncode(JSON.stringify(expiredPayload));
    const expiredToken = `${token.split('.')[0]}.${expiredPayloadEncoded}.${token.split('.')[2]}`;
    expect(() => decodeJWT(expiredToken, secret)).toThrowError('Token has expired');
  });

  it('should throw an error for an invalid format', () => {
    expect(() => decodeJWT('invalid.token.format', secret)).toThrowError('Invalid JWT format');
  });
});
