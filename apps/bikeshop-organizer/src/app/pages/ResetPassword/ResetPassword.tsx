import { useSearchParams } from 'react-router-dom';
import SendEmailResetPassword from '../../components/ResetPassword/SendEmailResetPassword';
import ResetPasswordComponent from '../../components/ResetPassword/ResetPassword';
import AuthLayout from '../../layout/Auth/Auth.layout';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();

  const token = searchParams.get('token');

  return (
    <AuthLayout imgSrc="/signup.png">
      {token ? (
        <ResetPasswordComponent token={token} />
      ) : (
        <SendEmailResetPassword />
      )}
    </AuthLayout>
  );
};

export default ResetPassword;
