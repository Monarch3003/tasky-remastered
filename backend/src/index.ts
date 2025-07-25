import express, { Express } from 'express';
import userRoutes from './routes/user.routes';
import taskRoutes from './routes/task.routes';
import cookieParser from "cookie-parser";
import cors from 'cors';

const app: Express = express(); 

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json()); 
app.use(cookieParser());
app.get("/", (_req, res) => {
    res.send('<h1>Welcome to Tasky</h1>');
});

app.use("/api/auth", userRoutes);
app.use("/api", taskRoutes);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`App is live on port ${port}`));