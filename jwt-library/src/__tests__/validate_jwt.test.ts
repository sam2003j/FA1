import { validateJWT } from '../validateJWT';
import { encodeJWT } from '../encodeJWT';
import { JwtPayload } from '../interfaces';


const secret = 'test_secret';
const ttl = 3600; 

describe('validateJWT', () => {
  it('should return true for a valid JWT', () => {
    const payload: JwtPayload = { id: '123', role: 'admin', exp: Math.floor(Date.now() / 1000) + 60 };
    const header = { alg: 'HS256', typ: 'JWT' };
    const token = encodeJWT(header, payload, secret,ttl);

    const isValid = validateJWT(token, secret);
    
    expect(isValid).toBe(true);
  });

  it('should return false for an expired JWT', () => {
    const payload: JwtPayload = { id: '123', role: 'admin', exp: Math.floor(Date.now() / 1000) - 60 };
    const header = { alg: 'HS256', typ: 'JWT' };
    const token = encodeJWT(header, payload, secret,ttl);

    const isValid = validateJWT(token, secret);
    
    expect(isValid).toBe(false);
  });

  it('should return false for an invalid JWT', () => {
    const invalidToken = 'invalid.token.signature';

    const isValid = validateJWT(invalidToken, secret);
    
    expect(isValid).toBe(false);
  });
});
