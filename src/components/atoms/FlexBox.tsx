import {FC} from 'react';
import {Box, BoxProps} from '@mui/material';

export const FlexBox: FC<BoxProps> = ({children, ...props}) => (
  <Box display='flex' {...props}>
    {children}
  </Box>
);
