import { encodeJWT } from '../encodeJWT';
import { JwtPayload } from '../interfaces';

const secret = 'test_secret';
const ttl = 3600; 

describe('encodeJWT', () => {
  it('should create a valid JWT', () => {
    const payload: JwtPayload = { id: '123', role: 'admin', exp: Math.floor(Date.now() / 1000) + 60 };
    const header = { alg: 'HS256', typ: 'JWT' };
    const token = encodeJWT(header, payload, secret,ttl);
    
    expect(token).toBeDefined();
    expect(token.split('.').length).toBe(3);
  });
});
