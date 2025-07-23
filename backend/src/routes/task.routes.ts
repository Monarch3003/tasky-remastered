import { Router } from 'express';
import { createTask, getTasks, getTaskById, updateTask, deleteTask, restoreTask, markTaskComplete, markTaskIncomplete } from '../controller/task.controller';
import { authenticate } from '../middleware/userMiddleware';

const router = Router();

router.post("/tasks", authenticate, createTask); 
router.get("/tasks", authenticate, getTasks);
router.get("/tasks/:id", authenticate, getTaskById);
router.patch("/tasks/:id", authenticate, updateTask);
router.delete("/tasks/:id", authenticate, deleteTask);
router.patch("/tasks/restore/:id", authenticate, restoreTask);
router.patch("/tasks/complete/:id", authenticate, markTaskComplete);
router.patch("/tasks/incomplete/:id", authenticate, markTaskIncomplete);



export default router;