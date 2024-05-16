import { Drawer, Stack } from '@mui/material';

const DrawerCustom = ({
  open,
  handleClose,
  children,
}: {
  open: boolean;
  handleClose: () => void;
  children: JSX.Element;
}) => {
  return (
    <Drawer anchor="right" open={open} onClose={handleClose}>
      <Stack
        padding="50px"
        minWidth="60vw"
        height="100%"
        justifyContent="space-between"
      >
        {children}
      </Stack>
    </Drawer>
  );
};

export default DrawerCustom;
