import { useContext, createContext, useState, useEffect } from 'react';
import { AUTH_TOKEN_KEY, AuthCtx } from './types';
import { useNavigate } from 'react-router-dom';
import { User } from '@bikeshop-organizer/types';
import register from '../../utils/api/auth/register';
import { useSnackbar } from 'notistack';
import { getUserEmail } from '../../utils/jwt/getUserEmail';
import { getUserByEmail } from '../../utils/api/user/getUserByEmail';
const AuthContext = createContext<AuthCtx>({
  user: null,
  setUser: () => {},
  token: '',
  logOut: () => void 0,
  signup: async () => {},
});

const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string>(
    localStorage.getItem(AUTH_TOKEN_KEY) || ''
  );
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const signup = async (email: string, password: string) => {
    try {
      const response = await register(email, password);
      if ('message' in response) {
        if (response.message.includes('duplicate key value')) {
          enqueueSnackbar("L'email est déjà utilisé, veuillez vous connecter", {
            variant: 'error',
          });
        } else {
          enqueueSnackbar("Erreur lors de l'inscription, veuillez réessayer", {
            variant: 'error',
          });
        }
        return;
      } else {
        setUser(response.user);
        setToken(response.token);
        localStorage.setItem(AUTH_TOKEN_KEY, response.token);
        enqueueSnackbar('Inscription réussie', { variant: 'success' });
        navigate('/');
      }
    } catch (error) {
      enqueueSnackbar("Erreur lors de l'inscription, veuillez réessayer", {
        variant: 'error',
      });
    }
  };

  const loginByToken = async (token: string) => {
    try {
      const userEmail = getUserEmail(token);
      const user = await getUserByEmail(userEmail);
      if (user) {
        setUser(user);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const logOut = () => {
    setUser(null);
    setToken('');
    localStorage.removeItem(AUTH_TOKEN_KEY);
    navigate('/login');
  };

  useEffect(() => {
    if (!token) return;
    if (user) return;
    (async () => {
      await loginByToken(token);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        token,
        logOut,
        signup,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
