'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Button, CssBaseline, Link, Grid, Box, Typography, Container } from '@mui/material';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Copyright from '@/components/Copyright';
import InputField from '@/components/InputField';
import FieldError from '@/components/FieldError';

export const signUpSchema = z.object({
  name: z.string().min(1, "O campo nome completo é obrigatório!").max(50, "O campo nome completo deve ter no maximo 50 caracteres."),
  email: z.string().min(1, "O campo email é obrigatório!").email('Email inválido!').max(50, "O campo email deve ter no maximo 50 caracteres."),
  password: z.string().min(1, "O campo senha é obrigatório!").max(64, "O campo senha deve ter no maximo 64 caracteres."),
});

export type TSignUpSchema = z.infer<typeof signUpSchema>;

const defaultTheme = createTheme();

export default function SignUp() {
  const [signUpError, setSignUpError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<TSignUpSchema>({
    resolver: zodResolver(signUpSchema),
  });

  const router = useRouter();

  const handleSignUp = async (data: TSignUpSchema) => {

    const response = await fetch('http://localhost:3001/user/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
      credentials: 'include'
    });

    if (response.ok) return router.push('/signIn?showModal=true');

    if (response.status === 500) setSignUpError('Ocorreu um erro no servidor, tente novamente mais tarde.');
    if (response.status === 409) setSignUpError('Não foi possível registrar sua conta pois o email já existe!');

  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <LockOutlinedIcon />
          <Typography component='h1' variant='h5'>
            Cadastre-se
          </Typography>
          <Typography component='p' sx={{ color: 'red' }}>
            {signUpError}
          </Typography>
          <Box component='form' noValidate onSubmit={handleSubmit(handleSignUp)} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <InputField
                  {...register('name')}
                  label='Nome Completo'
                  error={!!errors.name}
                />
                {errors.name && <FieldError message={errors.name.message!} />}
              </Grid>
              <Grid item xs={12}>
                <InputField
                  {...register('email')}
                  label='Email'
                  error={!!errors.email}
                />
                {errors.email && <FieldError message={errors.email.message!} />}
              </Grid>
              <Grid item xs={12}>
                <InputField
                  {...register('password')}
                  label='Password'
                  error={!!errors.password}
                />
                {errors.password && <FieldError message={errors.password.message!} />}
              </Grid>
            </Grid>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
            >
              Cadastrar
            </Button>
            <Grid container justifyContent='flex-end'>
              <Grid item>
                <Link href='/signIn' variant='body2'>
                  Já possui uma conta? Faça o login
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright />
      </Container>
    </ThemeProvider>
  );
}