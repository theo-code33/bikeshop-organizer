import { Stack } from '@mui/material';
import Title from '../../components/Title/Title';
import UpdateUserInformationForm from '../../components/User/UpdateUserInformationForm';
import UpdateUserPasswordForm from '../../components/User/UpdateUserPasswordForm';
import MainLayout from '../../layout/Main/Main.layout';

const User = () => {
  return (
    <MainLayout>
      <Stack gap="32px">
        <Title title="Modifier mon profil" />
        <UpdateUserInformationForm />
        <UpdateUserPasswordForm />
      </Stack>
    </MainLayout>
  );
};

export default User;
