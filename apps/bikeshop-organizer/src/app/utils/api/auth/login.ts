import instance from '..';

const login = async (email: string, password: string) => {
  const response = await instance.post('/auth/login', { email, password });
  return response.data;
};

export default login;
