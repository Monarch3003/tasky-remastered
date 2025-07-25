import { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  CircularProgress,
} from "@mui/material";
import API from "../api/axios";
import { toast } from "react-toastify";
import useUser from "../store/userStore";

const GridItem = Grid as React.ElementType;

const TrashPage = () => {
  const { user } = useUser();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDeletedTasks = async () => {
    try {
      const res = await API.get("/api/tasks", {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
      const deletedTasks = res.data.tasks.filter(
        (task: any) => task.isDeleted === true
      );
      setTasks(deletedTasks);
    } catch (error) {
      toast.error("Failed to fetch deleted tasks");
    } finally {
      setLoading(false);
    }
  };

  const handleRestore = async (id: string) => {
    try {
      await API.patch(`/api/tasks/restore/${id}`, {}, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
      setTasks(prev => prev.filter(task => task.id !== id));
      toast.success("Task restored");
    } catch (error) {
      toast.error("Failed to restore task");
    }
  };

  useEffect(() => {
    fetchDeletedTasks();
  }, []);

  if (loading) {
    return (
      <Box textAlign="center" mt={8}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Trash
      </Typography>
      {tasks.length === 0 ? (
        <Typography>No deleted tasks</Typography>
      ) : (
        <Grid container spacing={3}>
          {tasks.map((task: any) => (
            <GridItem xs={12} md={6} lg={4} key={task.id}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6">{task.title}</Typography>
                  <Typography variant="body2" mb={2}>
                    {task.description}
                  </Typography>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleRestore(task.id)}
                  >
                    Restore
                  </Button>
                </CardContent>
              </Card>
            </GridItem>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default TrashPage;