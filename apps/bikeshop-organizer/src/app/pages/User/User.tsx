import { Stack } from '@mui/material';
import Title from '../../components/Title/Title';
import UpdateUserInformationForm from '../../components/User/UpdateUserInformationForm';
import UpdateUserPasswordForm from '../../components/User/UpdateUserPasswordForm';

const User = () => {
  return (
    <Stack gap="32px">
      <Title title="Modifier mon profil" />
      <UpdateUserInformationForm />
      <UpdateUserPasswordForm />
    </Stack>
  );
};

export default User;
