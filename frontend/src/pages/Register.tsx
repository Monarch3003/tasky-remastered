import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
  Link,
  Grid,
} from "@mui/material";
import { useState } from "react";

const Register = () => {
  const [plan, setPlan] = useState("");
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) return alert("Please agree to the terms");
    // handle registration logic here
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ py: 5 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom align="center">
          Create a New Account
        </Typography>
        <Typography variant="subtitle1" align="center" color="text.secondary" gutterBottom>
          It only takes 20 seconds
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField label="First Name" fullWidth required margin="normal" />
          <TextField label="Last Name" fullWidth required margin="normal" />
          <TextField label="User Name" fullWidth required margin="normal" />
          <TextField label="Email" type="email" fullWidth required margin="normal" />
          <TextField label="Contact Number" fullWidth required margin="normal" />
           <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          required />
          <TextField
          label="Confirm Password"
          type="password"
          fullWidth
          margin="normal"
          required />

         

          <FormControl fullWidth required margin="normal">
            <InputLabel>Select Plan</InputLabel>
            <Select
              value={plan}
              onChange={(e) => setPlan(e.target.value)}
              label="Select Plan"
            >
              <MenuItem value="free">Free</MenuItem>
              <MenuItem value="pro">Pro</MenuItem>
              <MenuItem value="enterprise">Enterprise</MenuItem>
            </Select>
          </FormControl>

          <FormControlLabel
            control={<Checkbox checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />}
            label={
              <Typography variant="body2">
                I agree to the <Link href="#">terms</Link> & <Link href="#">privacy policy</Link>
              </Typography>
            }
            sx={{ mt: 2 }}
          />

          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            sx={{ mt: 3, borderRadius: 2 }}
          >
            Sign Up
          </Button>
          
        </Box>
      </Box>
    </Container>
  );
};

export default Register;
