import { Box, Stack, Typography } from '@mui/material';

const Title = ({ title }: { title: string }) => {
  return (
    <Stack gap="12px" direction="row" alignItems="stretch">
      <Box
        sx={{
          width: '8px',
          background:
            'linear-gradient(0deg, rgba(54, 2, 125, 0) 0%, rgba(54, 2, 125, 1) 100%)',
          borderRadius: '8px 8px 0 0',
        }}
      />
      <Typography variant="h3" color="primary.xdark">
        {title}
      </Typography>
    </Stack>
  );
};

export default Title;
