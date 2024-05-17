import AllTaskCategory from '../../components/TaskCategory/AllTaskCategory';
import UserWithoutShop from '../../components/UserWithoutShop';
import { useAuth } from '../../context/AuthContext/AuthContext';
import { useShop } from '../../context/ShopContext/ShopContext';
import MainLayout from '../../layout/Main/Main.layout';

const MainPage = () => {
  const { user } = useAuth();
  const { shop } = useShop();
  return (
    <MainLayout>
      {user?.role === 'user' ? (
        <UserWithoutShop />
      ) : shop ? (
        <AllTaskCategory />
      ) : (
        <UserWithoutShop />
      )}
    </MainLayout>
  );
};

export default MainPage;
