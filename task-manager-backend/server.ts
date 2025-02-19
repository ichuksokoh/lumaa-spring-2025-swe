import express from 'express';
import dotenv from 'dotenv';
import {  loginUser } from './auths/login';
import {  registerUser } from './auths/register';
import { getTasks, createTask, updateTask, deleteTask } from './tasks';
import { authenticateToken } from './auths/authMiddleware';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({origin: "http://localhost:5173"}));

// Auth routes
app.post('/auth/register', registerUser);
app.post('/auth/login', loginUser);

// Protected routes
app.use(authenticateToken);
app.get('/tasks', getTasks);
app.post('/tasks', createTask);
app.put('/tasks/:id', updateTask);
app.delete('/tasks/:id', deleteTask);

const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  }
  



export default app; 