export type JwtPayload = {
  sub: string;
  email: string;
  iat?: string;
  exp?: string;
}