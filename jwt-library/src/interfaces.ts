export interface JwtPayload {
    id: string | number;
    role: string;
    exp?: number;
    [key: string]: any;
  }