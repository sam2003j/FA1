import crypto from 'crypto';

export const validateJWT = (secret: string, token: string): boolean => {
  try {
    const [headerEncoded, payloadEncoded, signature] = token.split('.');

    if (!headerEncoded || !payloadEncoded || !signature) {
      return false;
    }

    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(`${headerEncoded}.${payloadEncoded}`)
      .digest('base64')
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');

    return expectedSignature === signature;
  } catch (err) {
    return false;
  }
};
