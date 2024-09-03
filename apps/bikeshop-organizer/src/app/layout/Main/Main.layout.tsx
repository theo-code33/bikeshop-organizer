import { Box, Grid, MenuItem, MenuList, Stack, useTheme } from '@mui/material';
import UserAvatarMenuItem from '../../components/UserAvatarMenuItem';
import {
  IconAdjustmentsHorizontal,
  IconLayoutGrid,
  IconShoppingBag,
  IconTools,
  IconUsers,
} from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext/AuthContext';

const menuItemStyle = {
  display: 'flex',
  gap: 1,
  padding: '16px',
  alignItems: 'center',
  color: 'primary.xdark',
  fontWeight: 500,
  fontSize: '18px',
  cursor: 'pointer',
  borderRadius: '10px',
};

const MainLayout = ({ children }: { children: JSX.Element }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { user } = useAuth();

  const isUserRole = user?.role === 'user' || !user?.shop;
  return (
    <Grid container overflow="hidden" height="100vh" position="relative">
      {!isUserRole && (
        <Grid
          item
          xs={3}
          p="40px"
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
        >
          <Stack gap="32px">
            <Box
              p="16px"
              onClick={() => navigate('/')}
              sx={{
                cursor: 'pointer',
              }}
            >
              <img src="/logo.svg" alt="Logo" />
            </Box>
            <MenuList>
              <MenuItem onClick={() => navigate('/')} sx={menuItemStyle}>
                <IconLayoutGrid
                  color={theme.palette.primary.xdark}
                  opacity={0.7}
                />
                Tableau de bord
              </MenuItem>
              <MenuItem
                onClick={() => navigate('/prestations')}
                sx={menuItemStyle}
              >
                <IconTools color={theme.palette.primary.xdark} opacity={0.7} />
                Prestations
              </MenuItem>
              <MenuItem
                onClick={() => navigate('/boutique')}
                sx={menuItemStyle}
              >
                <IconShoppingBag
                  color={theme.palette.primary.xdark}
                  opacity={0.7}
                />
                Boutique
              </MenuItem>
              <MenuItem onClick={() => navigate('/clients')} sx={menuItemStyle}>
                <IconUsers color={theme.palette.primary.xdark} opacity={0.7} />
                Clients
              </MenuItem>
            </MenuList>
          </Stack>
          <MenuList>
            <MenuItem onClick={() => navigate('/settings')} sx={menuItemStyle}>
              <IconAdjustmentsHorizontal
                color={theme.palette.primary.xdark}
                opacity={0.7}
              />
              Paramètres
            </MenuItem>
          </MenuList>
        </Grid>
      )}
      <Grid
        item
        xs={isUserRole ? 12 : 9}
        display="flex"
        flexDirection="column"
        p="40px"
        gap="40px"
        sx={{ backgroundColor: 'rgba(54, 2, 125, 0.06)' }}
      >
        <Stack
          direction="row"
          justifyContent={isUserRole ? 'space-between' : 'flex-end'}
        >
          {isUserRole && (
            <Box
              p="16px"
              onClick={() => navigate('/')}
              sx={{
                cursor: 'pointer',
              }}
            >
              <img src="/logo.svg" alt="Logo" />
            </Box>
          )}
          <UserAvatarMenuItem />
        </Stack>
        <Stack
          height="80vh"
          sx={{
            overflowY: 'auto',
            overflowX: 'hidden',
            scrollbarWidth: 'none',
          }}
        >
          {children}
        </Stack>
      </Grid>
      <Box
        sx={{
          position: 'absolute',
          top: '0',
          right: '-20%',
          zIndex: -1,
        }}
      >
        <svg
          width="842"
          height="1103"
          viewBox="0 0 842 1103"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            opacity="0.06"
            d="M645.17 94.3865C683.4 134.993 709.651 182.804 723.923 237.819C738.195 292.834 854.085 792.944 840.415 847.015C825.178 900.127 794.808 948.288 749.307 991.499C703.473 1033.43 641.631 1064.49 563.781 1084.69C484.695 1105.21 415.551 1108.12 356.349 1093.44C295.579 1077.8 246.079 1049.67 207.849 1009.07C168.051 967.501 25.5932 474.283 11.6532 420.547C-2.95066 364.252 -2.63399 309.549 12.6032 256.438C26.2727 202.367 56.0245 154.366 101.858 112.435C146.125 69.544 207.8 37.8396 286.886 17.3233C364.736 -2.8724 434.046 -5.1481 494.816 10.4942C555.586 26.1365 605.704 54.1004 645.17 94.3865Z"
            fill="#310273"
          />
        </svg>
      </Box>
    </Grid>
  );
};

export default MainLayout;
