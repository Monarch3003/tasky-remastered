import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import { toast } from "react-toastify";
import useUser from "../store/userStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";




interface TaskInput {
  title: string;
  description: string;
}

const CreateTaskPage = () => {
  const { user } = useUser();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  if (!user?.token) {
    toast.error("Please login to create task")
    navigate("/login");
    return;
  }
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ["create-task"],
    mutationFn: async (data: TaskInput) => {
      const response = await API.post(
        "/tasks",
        { title: data.title, description: data.description },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      return response.data;
    },
    onSuccess: () => {
      toast.success("Task created successfully!");
       queryClient.invalidateQueries({ queryKey: ["tasks"] });
      navigate("/tasks");
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || "Task creation failed";
      toast.error(message);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) {
      toast.error("Please fill in all fields");
      return;
    }
    mutate({ title, description }); 
  };

  return (
    <Container maxWidth="sm">
      <Box mt={4}>
        <Typography variant="h5" gutterBottom>
          Create New Task
        </Typography>
        <form onSubmit={handleSubmit}>
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
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isPending}
          >
            {isPending ? "Creating..." : "Create Task"}
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default CreateTaskPage;
