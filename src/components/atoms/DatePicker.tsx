import {FC} from 'react';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker as MuiDatePicker} from '@mui/x-date-pickers/DatePicker';
import {Dayjs} from 'dayjs';
import {SxProps, Theme} from '@mui/system'; // Import the necessary types for sx

interface DatePickerProps {
  value: Dayjs | null;
  onChange: (newValue: Dayjs | null) => void;
  label: string;
  minDate?: Dayjs;
  maxDate?: Dayjs;
  format?: string;
  sx?: SxProps<Theme>;
}

const DatePicker: FC<DatePickerProps> = ({
  value,
  onChange,
  label,
  minDate,
  maxDate,
  format = 'MM/DD/YYYY',
  sx, // Destructure the sx prop
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MuiDatePicker
        sx={sx}
        value={value}
        onChange={onChange}
        label={label}
        minDate={minDate}
        maxDate={maxDate}
        format={format}
      />
    </LocalizationProvider>
  );
};

export default DatePicker;
