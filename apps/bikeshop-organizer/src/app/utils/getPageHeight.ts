import type { Theme } from '@mui/material';

function getPageHeight(theme: Theme) {
  const topSpacing = 0; // change this value to adjust the top spacing

  return `calc(100vh - ${topSpacing}px)`;
}

export { getPageHeight };
