import { User, UserDto } from '@bikeshop-organizer/types';

export type AuthCtx = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  logOut: () => void;
  signup: (userDto: UserDto) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
};

export const AUTH_TOKEN_KEY = 'bikeshop-token';

export const MAIN_ROUTE = '/';
