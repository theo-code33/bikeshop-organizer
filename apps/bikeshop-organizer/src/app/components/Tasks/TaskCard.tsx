import { Task } from '@bikeshop-organizer/types';
import { Stack, Typography, useTheme } from '@mui/material';
import DatePill from '../Date/DatePill';
import { IconArrowRight } from '@tabler/icons-react';
import {
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
} from 'react-beautiful-dnd';

const littleTitleStyle = {
  fontSize: '10px',
  color: 'rgba(3, 12, 74, 0.5)',
  textTransform: 'uppercase',
};

const titleStyle = {
  fontSize: '18px',
  fontWeight: 'bold',
};

const textStyle = {
  fontSize: '14px',
};

const TaskCard = ({
  task,
  handleOpenUpdateDialog,
  index,
}: {
  task: Task;
  handleOpenUpdateDialog: (task: Task) => void;
  index: number;
}) => {
  const theme = useTheme();
  return (
    <Draggable key={task.id} draggableId={task.id} index={index}>
      {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
        <Stack
          bgcolor="#FFF"
          borderRadius="16px"
          p="20px"
          gap="12px"
          onClick={() => handleOpenUpdateDialog(task)}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Stack gap="2px">
            <Typography sx={littleTitleStyle}>Prestation</Typography>
            <Typography sx={titleStyle} color="primary.xdark">
              {task.name}
            </Typography>
          </Stack>
          <Stack gap="2px">
            <Typography sx={littleTitleStyle}>Modèle de vélo</Typography>
            <Typography sx={textStyle} color="primary">
              {task.bike.brand.name} - {task.bike.model}
            </Typography>
          </Stack>
          <Stack gap="2px">
            <Typography sx={littleTitleStyle}>Client</Typography>
            <Typography sx={textStyle} color="primary">
              {task.client.firstName} {task.client.lastName}
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" gap="5px">
            {task.startDate && (
              <>
                <DatePill date={task.startDate} />
                <IconArrowRight size={16} color={theme.palette.primary.xdark} />
              </>
            )}
            <DatePill date={task.endDate} />
          </Stack>
        </Stack>
      )}
    </Draggable>
  );
};

export default TaskCard;
