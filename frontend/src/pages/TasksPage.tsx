import { useQuery } from "@tanstack/react-query";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  CircularProgress,
  Fab,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../api/axios";
import useUser from "../store/userStore";

const GridItem = Grid as React.ElementType;

type Task = {
  id: string;
  title: string;
  description: string;
  isDeleted: boolean;
  isCompleted: boolean;
  lastUpdated: string;
};

const fetchTasks = async (): Promise<Task[]> => {
  try {
    const response = await API.get("/tasks", {
      withCredentials: true, 
    });

    const tasks = response.data;
    console.log("Fetched tasks:", response.data);

    return tasks.filter((task: Task) => !task.isDeleted && !task.isCompleted);
  } catch (error: any) {
     console.error("Error in fetchTasks:", error);
    throw new Error("Failed to fetch tasks");
  }
};

const TasksPage = () => {
  const { user, hasHydrated } = useUser();
  const navigate = useNavigate();

  if (!hasHydrated) {
  return (
    <Box textAlign="center" mt={8}>
      <CircularProgress />
    </Box>
  );
}

  if (!user?.token) {
    navigate("/login"); // or wherever your login route is
    return null;
  }

  const {
    data: tasks = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
  });

  const handleDelete = async (id: string) => {
    try {
      await API.patch(
        `/tasks/${id}/delete`,
        
      );
      toast.success("Task moved to trash");
      refetch();
    } catch (error) {
      toast.error("Failed to delete task");
    }
  };

  if (isLoading) {
    return (
      <Box textAlign="center" mt={8}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box textAlign="center" mt={8}>
        <Typography color="error">Error fetching your tasks.</Typography>
      </Box>
    );
  }

  return (
    <Box p={4} pb={10} position="relative">
      <Typography variant="h4" gutterBottom>
        Your Tasks
      </Typography>

      {tasks.length === 0 ? (
        <Typography>No tasks yet. You don't have any tasks.</Typography>
      ) : (
        <Grid container spacing={3}>
          {tasks.map((task: Task) => (
            <GridItem xs={12} md={6} lg={4} key={task.id}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6">{task.title}</Typography>
                  <Typography variant="body2" mb={2}>
                    {task.description}
                  </Typography>
                  <Box display="flex" justifyContent="space-between">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => navigate(`/task/update/${task.id}`)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleDelete(task.id)}
                    >
                      Delete
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </GridItem>
          ))}
        </Grid>
      )}

      <Fab
        color="primary"
        aria-label="add"
        sx={{
          position: "fixed",
          bottom: 80,
          right: 32,
          zIndex: 1300,
        }}
        onClick={() => navigate("create-task")}
      >
        <AddIcon />
      </Fab>
    </Box>
  );
};

export default TasksPage;
