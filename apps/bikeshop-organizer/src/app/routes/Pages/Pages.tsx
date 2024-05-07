import { Box } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import { getPageHeight } from './utils';
import routes from '..';

const Pages = () => {
  return (
    <Box
      sx={{
        height: (theme) => getPageHeight(theme),
        overflow: 'auto',
      }}
    >
      <Routes>
        {Object.values(routes).map(({ path, component: Component }) => (
          <Route key={path} element={<Component />} path={path} />
        ))}
      </Routes>
    </Box>
  );
};

export default Pages;
