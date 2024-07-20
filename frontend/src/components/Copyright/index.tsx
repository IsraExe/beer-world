import { Typography, Link } from '@mui/material';

export default function Copyright() {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      sx={{ mt: 5 }}
          >
      {"Copyright © "}
      <Link color="inherit" href="#">
        Beer World
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
