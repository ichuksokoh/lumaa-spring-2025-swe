import { Request, Response } from 'express';
import pool from './db';

export const getTasks = async (req: Request, res: Response) => {
  const userId = req.user?.userId;  // Assume middleware has added userId
  try {
    const result = await pool.query(
      'SELECT * FROM tasks WHERE user_id = $1',
      [userId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};



export const createTask = async (req: Request, res: Response) => {
    const { title, description } = req.body;
    const userId = req.user?.userId;  // Assume middleware has added userId
    try {
      const result = await pool.query(
        'INSERT INTO tasks (title, description, is_complete, user_id) VALUES ($1, $2, false, $3) RETURNING *',
        [title, description, userId]
      );
      res.status(201).json(result.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  };



  export const updateTask = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, description, isComplete } = req.body;
    if (title.trim() === "") {
        try {
            const result = await pool.query(
              'UPDATE tasks SET description = $1, is_complete = $2 WHERE id = $3 RETURNING *',
              [description, isComplete, id]
            );
            res.json(result.rows[0]);
          } catch (err) {
            res.status(500).json({ error: 'Server error' });
          }
    }
    else {
        try {
          const result = await pool.query(
            'UPDATE tasks SET title = $1, description = $2, is_complete = $3 WHERE id = $4 RETURNING *',
            [title, description, isComplete, id]
          );
          res.json(result.rows[0]);
        } catch (err) {
          res.status(500).json({ error: 'Server error' });
        }
    }
  };


  export const deleteTask = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      await pool.query('DELETE FROM tasks WHERE id = $1', [id]);
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ error: 'Server error' });
    }
  };