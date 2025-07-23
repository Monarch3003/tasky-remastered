import express, { Express } from 'express';
import userRoutes from './routes/user.routes';
import taskRoutes from './routes/task.routes';
import cookieParser from "cookie-parser";

const app: Express = express(); 

app.use(express.json()); 
app.use(cookieParser());
app.get("/", (_req, res) => {
    res.send('<h1>Welcome to Tasky</h1>');
});

app.use("/api/auth", userRoutes);
app.use("/api", taskRoutes);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`App is live on port ${port}`));