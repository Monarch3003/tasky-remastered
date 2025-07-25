import { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  CircularProgress,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api/axios";
import { toast } from "react-toastify";
import useUser from "../store/userStore";

const UpdateTaskPage = () => {
  const { user } = useUser();
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await API.get(`/api/tasks/${id}`, {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        });
        setTitle(res.data.task.title);
        setDescription(res.data.task.description);
      } catch (err) {
        toast.error("Failed to fetch task");
      } finally {
        setLoading(false);
      }
    };
    fetchTask();
  }, [id]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await API.patch(
        `/api/tasks/${id}`,
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      toast.success("Task updated");
      navigate("/tasks");
    } catch (error) {
      toast.error("Failed to update task");
    }
  };

  if (loading) {
    return (
      <Box textAlign="center" mt={8}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="sm">
      <Box mt={4}>
        <Typography variant="h5" gutterBottom>
          Update Task
        </Typography>
        <form onSubmit={handleUpdate}>
          <TextField
            fullWidth
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            margin="normal"
            required
          />
          <Button type="submit" variant="contained" color="primary">
            Update Task
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default UpdateTaskPage;