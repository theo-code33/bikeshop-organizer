import { Stack } from '@mui/material';
import MainLayout from '../../layout/Main/Main.layout';
import Title from '../../components/Title/Title';
import TaskCategorySection from '../../components/Settings/TaskCategorySection';
import StatusSection from '../../components/Settings/StatusSection';
import { useShop } from '../../context/ShopContext/ShopContext';

const Settings = () => {
  const { shop } = useShop();
  console.log(shop);

  return (
    <MainLayout>
      <Stack gap="50px">
        <Title title="Paramètres" />
        {shop && (
          <>
            <TaskCategorySection shop={shop} />
            <StatusSection shop={shop} />
          </>
        )}
      </Stack>
    </MainLayout>
  );
};

export default Settings;
