"use client";

import { Avatar, Button, CssBaseline, TextField, Link, Grid, Box, Typography, Container, InputLabel, OutlinedInput, InputAdornment, IconButton, FormControl } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Copyright from "@/components/Copyright";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const defaultTheme = createTheme();

export const signInSchema = z.object({
  email: z.string().min(1, "O campo email é obrigatório!").email("Email inválido!"),
  password: z.string().min(1, "O campo senha é obrigatório!")
});

export type TSignInSchema = z.infer<typeof signInSchema>;

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const { register, handleSubmit, formState: { errors } } = useForm<TSignInSchema>({
    resolver: zodResolver(signInSchema),
  });

  const handleSignIn = (data: TSignInSchema) => {
    console.log(data);

    // const data = new FormData(event.currentTarget);
    // console.log({
    //   email: data.get('email'),
    //   password: data.get('password'),
    // });
  };

  console.log(errors);

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
            Sign in
          </Typography>
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
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
