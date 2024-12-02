import {FC, ReactElement} from 'react';
import {Button as MuiButton, SxProps, Theme} from '@mui/material';

interface ButtonProps {
  title: string;
  sx?: SxProps<Theme>;
  startIcon?: ReactElement;
  endIcon?: ReactElement;
  onClick?: () => void; // Add onClick handler to the props
}

export const Button: FC<ButtonProps> = ({
  title,
  sx,
  startIcon,
  endIcon,
  onClick,
}) => {
  return (
    <MuiButton
      startIcon={startIcon}
      endIcon={endIcon}
      sx={{
        borderRadius: '50px', // Default styles
        ...sx, // Merge user-defined styles
      }}
      variant='contained'
      onClick={onClick} // Pass onClick to the MUI Button component
    >
      {title}
    </MuiButton>
  );
};

export default Button;
