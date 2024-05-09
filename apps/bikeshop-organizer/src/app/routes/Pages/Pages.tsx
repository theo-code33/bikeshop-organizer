import { Box } from '@mui/material';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { getPageHeight } from '../../utils/getPageHeight';
import routes from '..';
import { useAuth } from '../../context/AuthContext/AuthContext';

const Pages = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        height: (theme) => getPageHeight(theme),
        overflow: 'auto',
      }}
    >
      <Routes>
        {Object.values(routes).map(
          ({ path, component: Component, restricted }) => {
            if (restricted === undefined) restricted = true;
            if (!auth.token && restricted) {
              navigate('/login', {
                replace: true,
              });
              return null;
            }
            return <Route key={path} element={<Component />} path={path} />;
          }
        )}
      </Routes>
    </Box>
  );
};

export default Pages;
