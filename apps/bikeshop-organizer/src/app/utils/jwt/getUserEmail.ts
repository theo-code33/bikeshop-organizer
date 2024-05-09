import { JwtPayload, jwtDecode } from 'jwt-decode';

export const getUserEmail = (token: string): string => {
  const credentials = jwtDecode<JwtPayload & { email: string }>(token);
  return credentials.email;
};
