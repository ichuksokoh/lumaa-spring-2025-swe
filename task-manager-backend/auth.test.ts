import request from 'supertest';
import app from './server';  // Update this path to your actual server file
import pool from './db';

describe('User Authentication', () => {
  it('should register a user successfully', async () => {
    const response = await request(app).post('/auth/register').send({
      username: 'testuser',
      password: 'password123',
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('username', 'testuser');
  });

  it('should login a user and return a JWT', async () => {
    // Now, login with the same user
    const response = await request(app).post('/auth/login').send({
      username: 'testuser',
      password: 'password123',
    });


    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');

    const token = response.body.token;

    const response2 = await request(app).post('/tasks').set('Authorization', `Bearer ${token}`).send({
        title: "things I will do",
        description: "What I plan on doing now",
        iscomplete: false,
        userid: 16,
    });

    expect(response2.status).toBe(200)
  });


  
});

describe('Add tasks to user', () => {
    it('should successfully add a task', async () => {
        const response = await request(app).post
    })
})

afterAll(async () => {
    await pool.end(); // Close the database connection
  });
