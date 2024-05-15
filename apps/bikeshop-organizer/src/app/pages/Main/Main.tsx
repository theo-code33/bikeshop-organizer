import UserWithoutShop from '../../components/UserWithoutShop';
import { useAuth } from '../../context/AuthContext/AuthContext';
import MainLayout from '../../layout/Main/Main.layout';

const MainPage = () => {
  const { user } = useAuth();
  return (
    <MainLayout>
      {user?.role === 'user' ? <UserWithoutShop /> : <>Hello shop</>}
    </MainLayout>
  );
};

export default MainPage;
