import crypto from 'crypto';
import { base64UrlEncode } from './utils/base64Urls';
import { JwtPayload } from './interfaces';

export const encodeJWT = (header: object, payload: JwtPayload, secret: string, ttl: number): string => {
  if (ttl <= 0) {
    throw new Error('Invalid TTL');
  }

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
};
