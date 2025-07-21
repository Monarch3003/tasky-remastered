import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Link,
  Paper,
} from "@mui/material";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // handle login
  };

  return (
    <Box sx={{ backgroundColor: "#f5f7fa", minHeight: "100vh", py: 8 }}>
      <Container maxWidth="sm">
        <Paper elevation={4} sx={{ p: 6, borderRadius: 4 }}>
          <Typography variant="h4" fontWeight="bold" align="center" gutterBottom>
            Welcome Back 👋
          </Typography>

          <Typography
            variant="subtitle1"
            align="center"
            color="text.secondary"
            mb={4}
          >
            Make a task. Get it done.
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              label="Email"
              fullWidth
              margin="normal"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              label="Password"
              fullWidth
              margin="normal"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{ mt: 3, borderRadius: 2 }}
            >
              Login
            </Button>
          </form>

          <Box mt={3} textAlign="center">
            <Typography variant="body2">
              Don't have an account? {" "}
              <Link href="/Register" underline="hover">
                Create Account
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
