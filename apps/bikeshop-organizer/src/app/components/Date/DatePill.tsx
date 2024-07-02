import { Stack, Typography } from '@mui/material';
import { IconCalendar } from '@tabler/icons-react';
import dayjs from 'dayjs';

const DatePill = ({ date }: { date: string }) => {
  const dateFormatted = dayjs(date).format('DD/MM/YYYY');
  return (
    <Stack
      direction="row"
      gap="6px"
      py="4px"
      px="8px"
      bgcolor="primary.dark"
      borderRadius="50px"
      alignItems="center"
    >
      <IconCalendar size={16} color="#FFF" />
      <Typography variant="body2" color="#FFF">
        {dateFormatted}
      </Typography>
    </Stack>
  );
};

export default DatePill;
