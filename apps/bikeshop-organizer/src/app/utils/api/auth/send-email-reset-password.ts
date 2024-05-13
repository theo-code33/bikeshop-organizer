import instance from '..';

const sendEmailresetPassword = async (email: string) => {
  const response = await instance.post('/auth/send-email-reset-password', {
    email,
  });
  return response.data;
};

export default sendEmailresetPassword;
