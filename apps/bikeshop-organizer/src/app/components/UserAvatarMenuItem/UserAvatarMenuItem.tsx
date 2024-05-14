import {
  Avatar,
  Box,
  Button,
  Menu,
  MenuItem,
  Skeleton,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import { useAuth } from '../../context/AuthContext/AuthContext';
import { IconLogout, IconMoodSmile, IconUser } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const UserAvatarMenuItem = () => {
  const [userLoad, setUserLoad] = useState<boolean>(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const theme = useTheme();

  const navigate = useNavigate();
  const { logOut, user } = useAuth();

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    user && setUserLoad(false);
  }, [user]);

  return userLoad ? (
    <Box sx={{ gap: 1, display: 'flex', alignItems: 'center' }}>
      <Skeleton animation="wave" width={170} height={50} />
      <Skeleton animation="wave" variant="circular" width={40} height={40} />
      <MenuItem onClick={logOut}>
        <IconLogout />
        Déconnexion
      </MenuItem>
    </Box>
  ) : (
    <>
      <Button
        id="demo-customized-button"
        aria-controls={open ? 'demo-customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="contained"
        disableElevation
        onClick={(e) => setAnchorEl(e.currentTarget)}
        sx={{
          bgcolor: 'background.paper',
          borderRadius: 100,
          '&:hover': { backgroundColor: 'grey.200' },
          fontWeight: 500,
          color: 'text.primary',
          display: 'flex',
          gap: 1,
          alignItems: 'center',
          padding: '5px 15px 5px 5px',
        }}
      >
        {user?.picture ? (
          <Avatar
            alt={`${user?.firstName} ${user?.lastName}`}
            src={user?.picture}
          />
        ) : (
          <Avatar alt={`${user?.firstName} ${user?.lastName}`}>
            <IconMoodSmile color={theme.palette.grey[200] as string} />
          </Avatar>
        )}
        <Stack direction="column" alignItems="flex-start">
          <Typography variant="subtitle2" color="primary.xdark">
            {user?.firstName} {user?.lastName}
          </Typography>
          <Typography fontSize="10px" fontWeight="500" color="grey.600">
            {user?.role === 'shop' ? 'Administrateur' : 'Utilisateur'}
          </Typography>
        </Stack>
      </Button>
      <Menu
        id="user-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        sx={{
          mt: 1,
          '& svg': {
            mr: 2,
          },
        }}
      >
        <MenuItem
          onClick={() => {
            navigate('/user');
            handleClose();
          }}
        >
          <IconUser />
          Éditer votre profil
        </MenuItem>
        <MenuItem onClick={logOut}>
          <IconLogout />
          Déconnexion
        </MenuItem>
      </Menu>
    </>
  );
};

export default UserAvatarMenuItem;
