export const base64UrlEncode = (input: string): string => {
    return Buffer.from(input)
      .toString('base64')
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');
  };
  
  export const base64UrlDecode = (input: string): string => {
    return Buffer.from(input.replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString();
  };