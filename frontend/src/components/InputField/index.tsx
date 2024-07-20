import { TextField, TextFieldProps } from '@mui/material';
import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error: boolean;
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
      inputRef={ref}
    />
  );
});

export default InputField;