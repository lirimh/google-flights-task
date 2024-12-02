import React from 'react';
import TextField, {TextFieldProps} from '@mui/material/TextField';

interface InputProps extends Omit<TextFieldProps, 'variant'> {
  label: string;
  variant?: 'filled' | 'outlined' | 'standard'; // You can specify the possible variants
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input: React.FC<InputProps> = ({
  label,
  value,
  onChange,
  variant = 'outlined', // default to 'outlined' if no variant is passed
  ...props
}) => {
  return (
    <TextField
      {...props}
      label={label}
      value={value}
      onChange={onChange}
      variant={variant}
      fullWidth
    />
  );
};

export default Input;
