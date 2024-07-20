'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Avatar, Button, CssBaseline, TextField, Link, Grid, Box, Typography, Container } from '@mui/material';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Copyright from '@/components/Copyright';

export const signUpSchema = z.object({
  name: z.string().min(1, "O campo 'Nome Completo' é obrigatório!").max(50, "O campo 'Nome Completo' deve ter no maximo 50 caracteres."),
  email: z.string().min(1, "O campo 'Email' é obrigatório!").email("Email inválido!").max(50, "O campo 'Email' deve ter no maximo 50 caracteres."),
  password: z.string().min(1, "O campo 'Senha' é obrigatório!").max(64, "O campo 'Senha' deve ter no maximo 64 caracteres."),
});

export type TSignUpSchema = z.infer<typeof signUpSchema>;

// TODO remove, this demo shouldn't need to reset the theme.
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
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Cadastre-se
          </Typography>
          <Typography component="p" sx={{ color: 'red' }}>
            {signUpError}
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit(handleSignUp)} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  {...register('name')}
                  autoComplete="given-name"
                  name="name"
                  required
                  error={!!errors.name}
                  fullWidth
                  id="firstName"
                  label="Nome Completo"
                  autoFocus
                />
                {errors.name && (
                  <div>
                    <Typography sx={{ color: "red", fontSize: '14px' }}>{`${errors.name.message}`}</Typography>
                  </div>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register('email')}
                  required
                  fullWidth
                  error={!!errors.email}
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                />
                {errors.email && (
                  <div>
                    <Typography sx={{ color: "red", fontSize: '14px' }}>{`${errors.email.message}`}</Typography>
                  </div>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register('password')}
                  required
                  fullWidth
                  error={!!errors.password}
                  name="password"
                  label="Senha"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
                {errors.password && (
                  <div>
                    <Typography sx={{ color: "red", fontSize: '14px' }}>{`${errors.password.message}`}</Typography>
                  </div>
                )}
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Cadastrar
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/signIn" variant="body2">
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