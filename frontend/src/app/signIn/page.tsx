"use client";

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Avatar, Button, CssBaseline, TextField, Link, Grid, Box, Typography, Container, InputLabel, OutlinedInput, InputAdornment, IconButton, FormControl } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Copyright from '@/components/Copyright';

const defaultTheme = createTheme();

export const signInSchema = z.object({
  email: z.string().min(1, "O campo email é obrigatório!").email("Email inválido!"),
  password: z.string().min(1, "O campo senha é obrigatório!")
});

export type TSignInSchema = z.infer<typeof signInSchema>;

export default function SignIn() {

  const [signInError, setSignInError] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const redirectFromSignUp = searchParams.get('showModal');

  const notify = () => toast("Usuário cadastrado com sucesso!");
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (Boolean(redirectFromSignUp)) {
      notify();

      router.replace(pathname, undefined);
    };
  }, []);

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => event.preventDefault();

  const { register, handleSubmit, formState: { errors } } = useForm<TSignInSchema>({
    resolver: zodResolver(signInSchema),
  });

  const handleSignIn = async (data: TSignInSchema) => {

    const response = await fetch('http://localhost:3001/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
      credentials: 'include'
    });

    if (response.ok) return router.push('/home');

    if (response.status === 500) setSignInError('Ocorreu um erro no servidor, tente novamente mais tarde.');
    if (response.status === 401) setSignInError('Email e/ou senha incorreto(s)!');

  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Typography component="p" sx={{ color: "red" }}>{signInError}</Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(handleSignIn)}
            noValidate
            minWidth={'100%'}
            sx={{ mt: 1, minWidth: '35vw', p: 5 }}
          >
            <TextField
              {...register("email")}
              margin="none"
              required
              error={!!errors.email}
              fullWidth
              id="email"
              label="Email Address"
              autoComplete="email"
              autoFocus
            />
            {errors.email && (
              <div>
                <Typography sx={{ color: "red", fontSize: '14px' }}>{`${errors.email.message}`}</Typography>
              </div>
            )}
            <FormControl fullWidth sx={{ mt: 1 }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                error={!!errors.password}
                {...register("password")}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
            {errors.password && (
              <div>
                <Typography sx={{ color: "red", fontSize: '14px' }}>{`${errors.password.message}`}</Typography>
              </div>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signUp" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright />

        <ToastContainer />

      </Container>
    </ThemeProvider>
  );
}