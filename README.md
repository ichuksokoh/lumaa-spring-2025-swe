# Lumaa Full-Stack Coding Challenge

## Task management app, with CRUD functionality built  in React + TypeScript

### Setup

#### Installation

Ensure [PostgreSQL](https://www.postgresql.org/download/) is installed and `psql` 

Create a Database
1. Open up `psql` in terminal
    `psql` will prompt with
    ```
    Server [localhost]:
    ```
    click enter until screen looks like
    ```
    Server [localhost]:
    Database [postgres]:
    Port [5432]:
    Usernmae [postgres]:
    ```
    These are the default values for a freshly installed postgres, where username should be postgres and after hitting enter, input the password you created during postgres installion

2. After create a database
    ```sql
    CREATE DATABASE task_app
    ```

3. Connection to database
    ```sql
    \c task_app
    ```

4. Create Tables
    ```sql
    CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(256) UNIQUE NOT NULL,
        password TEXT NOT NULL
    );

    CREATE TABLE tasks (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        title VARCHAR(256) NOT NULL,
        description TEXT,
        is_complete BOOLEAN DEFAULT FALSE
    );
    ```


### Backend Setup

1. Open up a backend and run
    ```
    npm install
    ```
    in terminal (if node not installed [download](https://nodejs.org/en))

2. Now create a ```.env``` file inside backend that will contain database credentials and ports used
    ```
    DB_HOST = localhost
    DB_PORT = 5432 #default port postgres runs on

    DB_USER = postgres
    DB_PASSWORD = your_password

    DB_NAME = you_db_name

    PORT = 5000 #port back end runs on
    ```

3. Now run ```npm run dev``` in terminal and should print 
    ```
    Server running on port 5000
    ``` 
    or whatever port was used in terminal

4. Backend is setup! ✅


### Frontend Setup
1. Open up Frontend directory and once again run  ```npm install``` in terminal

2. Then run ```npm run dev``` in terminal, it should print
    ```
      VITE v6.1.0  ready in 1156 ms

        ➜  Local:   http://localhost:5173/
        ➜  Network: use --host to expose
        ➜  press h + enter to show help
    ```
    ctrl + click on the http will get you to the app's frontend page

3. Frontend is setup! ✅


### Notes
* To run testing, in backend open terminal and run ```npm run tests``` if any errors restart backend and frontend setup from scratch
* Ensure PostgreSQL server is running before running ```npm run dev``` in backend
* To terminate frontend/backend from runnign hit ```ctrl + C``` in terminals running backend/frontend


 ### [Video Demo](https://drive.google.com/file/d/1M45Xj6V0iY-x3ZeFPKZE1xbmAFiR1IPw/view?usp=sharing)








