import { base64UrlDecode } from './utils/base64Urls';
import crypto from 'crypto';
import { JwtPayload } from './interfaces';

export const decodeJWT = (token: string, secret: string): { header: object; payload: JwtPayload; expires_at: Date } => {
  const [headerEncoded, payloadEncoded, signature] = token.split('.');

  if (!headerEncoded || !payloadEncoded || !signature) {
    throw new Error('Invalid JWT format');
  }

  const header = JSON.parse(base64UrlDecode(headerEncoded));
  const payload = JSON.parse(base64UrlDecode(payloadEncoded)) as JwtPayload;

  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(`${headerEncoded}.${payloadEncoded}`)
    .digest('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');

  if (expectedSignature !== signature) {
    throw new Error('Invalid JWT signature');
  }

  // Check for expiration
  if (payload.exp) {
    const expiresAt = new Date(payload.exp * 1000);
    if (expiresAt < new Date()) {
      throw new Error('Token has expired');
    }
    return {
      header,
      payload,
      expires_at: expiresAt
    };
  }

  return {
    header,
    payload,
    expires_at: new Date(0)
  };
};
