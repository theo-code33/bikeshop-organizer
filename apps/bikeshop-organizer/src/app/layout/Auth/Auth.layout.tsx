import { Box, Link, Stack } from '@mui/material';

const AuthLayout = ({
  children,
  imgSrc,
}: {
  children: JSX.Element;
  imgSrc: string;
}) => {
  return (
    <Stack direction="row" width="100%" height="100vh" overflow="hidden">
      <Box
        sx={{
          width: '50%',
          height: '100%',
        }}
      >
        <img
          src={imgSrc}
          alt="Auth background"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </Box>
      <Stack
        width="50%"
        alignItems="center"
        padding="50px"
        justifyContent="space-between"
      >
        <Box>
          <img
            src="/logo.png"
            alt="Logo"
            style={{
              width: '200px',
              height: '100px',
              objectFit: 'cover',
            }}
          />
        </Box>
        <Stack alignItems="center" gap="50px" maxWidth="50%">
          {children}
        </Stack>
        <Stack direction="row" justifyContent="flex-end" width="100%">
          <Stack gap="5px" direction="row" alignItems="center">
            <Link variant="link" href="/mentions-legales" color="#B6C2E2">
              Mentions Légales
            </Link>
            <Box
              sx={{
                width: '1px',
                height: '20px',
                borderRadius: '10px',
                backgroundColor: '#B6C2E2',
              }}
            />
            <Link variant="link" href="/cgu" color="#B6C2E2">
              CGU
            </Link>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default AuthLayout;
