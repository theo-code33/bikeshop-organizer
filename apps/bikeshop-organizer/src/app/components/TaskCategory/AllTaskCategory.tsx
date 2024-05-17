import { Stack, Typography, useTheme } from '@mui/material';
import { useShop } from '../../context/ShopContext/ShopContext';
import Title from '../Title/Title';
import { IconArrowRight } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

const AllTaskCategory = () => {
  const { shop } = useShop();
  const theme = useTheme();
  const navigate = useNavigate();
  return (
    <Stack gap="50px">
      <Title title="Tableau de bord" />
      <Stack gap="10px" direction="row" flexWrap="wrap">
        {shop?.taskCategories &&
          shop?.taskCategories.map((taskCategory) => (
            <Stack
              width={'calc(50% - 70px)'}
              direction="row"
              onClick={() => navigate(`/prestations/${taskCategory.id}`)}
              key={taskCategory.id}
              sx={{
                cursor: 'pointer',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '30px',
                backgroundColor: 'background.paper',
                borderRadius: '15px',
                transition: 'all 0.3s',
                '&:hover': {
                  boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.1)',
                },
              }}
            >
              <Typography variant="h5" color="primary.main">
                {taskCategory.name}
              </Typography>
              <IconArrowRight color={theme.palette.primary.main} />
            </Stack>
          ))}
      </Stack>
    </Stack>
  );
};

export default AllTaskCategory;
