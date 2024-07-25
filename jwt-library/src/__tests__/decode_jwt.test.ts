import { decodeJWT } from '../decodeJWT';
import { encodeJWT } from '../encodeJWT';
import { JwtPayload } from '../interfaces';

const secret = 'test_secret';
const ttl = 3600; 

describe('decodeJWT', () => {
  it('should decode a valid JWT', () => {
    const payload: JwtPayload = { id: '123', role: 'admin', exp: Math.floor(Date.now() / 1000) + 60 };
    const header = { alg: 'HS256', typ: 'JWT' };
    const token = encodeJWT(header, payload, secret,ttl);

    const decoded = decodeJWT(token, secret);
    
    expect(decoded).toBeDefined();
    expect(decoded.payload.id).toBe(payload.id);
    expect(decoded.payload.role).toBe(payload.role);
  });

  it('should throw an error for an invalid JWT', () => {
    const invalidToken = 'invalid.token.signature';

    expect(() => decodeJWT(invalidToken, secret)).toThrow('Invalid signature');
  });
});
