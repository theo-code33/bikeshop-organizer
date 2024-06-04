import { AxiosError } from 'axios';

const generateError = (
  enqueueSnackbar: (message: string, options?: unknown) => void,
  error: unknown | AxiosError,
  entity: string,
  method: string,
  feminin?: boolean
) => {
  console.error(error);
  if (error instanceof AxiosError) {
    if (
      error.response?.data.message.includes(
        'duplicate key value violates unique constraint'
      ) ||
      error.response?.data.message.includes('unique')
    ) {
      return enqueueSnackbar(
        `${entity[0].toUpperCase() + entity.slice(1)} existe déjà`,
        {
          variant: 'error',
        }
      );
    }
    return enqueueSnackbar(
      `Erreur lors de la ${method} ${feminin ? 'de la' : 'du'} ${entity}: ${
        error.message
      }`,
      { variant: 'error' }
    );
  }
  return enqueueSnackbar(
    `Erreur lors de la ${method} ${
      feminin ? 'de la' : 'du'
    } ${entity}: ${error}`,
    {
      variant: 'error',
    }
  );
};

export default generateError;
