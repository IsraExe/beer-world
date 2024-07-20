import { TextField, TextFieldProps } from '@mui/material';
import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const InputField = forwardRef<HTMLInputElement, InputProps>((props, ref) => {

  return (
    <TextField
      {...props as TextFieldProps}
      margin='none'
      required
      fullWidth
      autoFocus
      autoComplete='off'
      inputRef={ref}
      sx={{
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: 'primary.main',
          },
          '&:hover fieldset': {
            borderColor: 'primary.dark',
          },
          '&.Mui-focused fieldset': {
            borderColor: 'primary.main',
          },
        },
      }}
    />
  );
});

export default InputField;