import { Box, Stack, Typography } from '@mui/material';
import { Variant } from '@mui/material/styles/createTypography';

const Title = ({
  title,
  titleVariant = 'h3',
}: {
  title: string;
  titleVariant?: Variant;
}) => {
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
      <Typography variant={titleVariant} color="primary.xdark">
        {title}
      </Typography>
    </Stack>
  );
};

export default Title;
