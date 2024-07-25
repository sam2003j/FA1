export const base64UrlEncode = (input: string): string => {
    return Buffer.from(input)
      .toString('base64')
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');
  };
  
  export const base64UrlDecode = (str: string): string => {
    str = str
      .replace(/-/g, '+')
      .replace(/_/g, '/');
    while (str.length % 4 !== 0) {
      str += '=';
    }
    return Buffer.from(str, 'base64').toString('utf8');
  };