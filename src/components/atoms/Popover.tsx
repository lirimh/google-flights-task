import {ReactElement} from 'react';
import Alert from '@mui/material/Alert';

export const Toastr = ({
  type = 'error',
  message,
}: {
  type?: 'error' | 'success';
  message: string;
}): ReactElement => (
  <Alert
    sx={{
      width: 'fit-content',
      position: 'absolute',
      bottom: 20,
      left: 20,
      animation: 'slideUp 0.5s ease-out',
      '@keyframes slideUp': {
        '0%': {transform: 'translateY(100%)', opacity: 0},
        '100%': {transform: 'translateY(0)', opacity: 1},
      },
    }}
    severity={type}
  >
    {message}
  </Alert>
);
