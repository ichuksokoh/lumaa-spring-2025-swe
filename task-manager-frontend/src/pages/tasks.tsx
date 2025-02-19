import { useContext, useEffect, useState } from 'react';
import { getTasks, createTask, deleteTask, updateTask } from '../services/task';
import { AuthContext } from '../context/authContext';
import Popup from '../components/popup';
// import { logoutUser } from '../services/auth';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';

interface Task {
    id : number;
    title : string;
    description: string;
    is_complete: boolean;
};

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [popUp, setPopup] = useState(false);
  const [taskId, setTaskId] = useState(-1);
  const authcontext = useContext(AuthContext);
  const user = authcontext?.user;
  const logout = authcontext?.logout as (() => void);
  const navigate = useNavigate();

  useEffect(() => {
    if (user === undefined || user === null) {
      navigate("/");
    }
  }, [user, navigate])

  useEffect(() => {
    const fetchTasks = async () => {
      const data = await getTasks();
      setTasks(data);
    };
    fetchTasks();
  }, []);

  const handleCreateTask = async () => {
    await createTask(title, description);
    setTasks(await getTasks()); // Refresh tasks
  };

  const handleDeleteTask = async (id : number) => {
    await deleteTask(id);
    setTasks(await getTasks());
  };

  const handleEditTask = async (id: number, title: string, description: string, isComplete : boolean=false) => {
    await updateTask(id, title, description, isComplete);
    setTasks(await getTasks());
  };

  const handleEditWrapper = async (task: Task) => {
    const isComplete = !task.is_complete;
    await handleEditTask(task.id, task.title, task.description, isComplete);
  };
  
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className='w-screen h-screen flex flex-col items-center justify-center gap-3'>
      {popUp && <Popup handleEditTask={handleEditTask} taskId={taskId} close={setPopup}/>}
      <h2>Tasks</h2>
      <div className='flex flex-row items-center gap-x-2'>
        <h3>User : {user}</h3>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <form className='flex flex-col gap-y-3' onSubmit={handleCreateTask}>
        <input className='border-2 rounded-md p-1' placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
        <input className='border-2 rounded-md p-1' placeholder="Description" onChange={(e) => setDescription(e.target.value)} />
        <button type="submit">Add Task</button>
      </form>

      <div className='flex-row'>
        {tasks.map((task: Task) => (
            <div className='flex flex-col gap-y-3' key={task.id}>
                <div>
                    {task.title} : {task.description}
                </div>
                <div className='flex flex-row justify-center gap-x-3'>
                    <button className='bg-red-500 rounded-md' onClick={() => handleDeleteTask(task.id)}>Delete</button>
                    <button onClick={() => { setTaskId(task.id); setPopup(true);}}>Update</button>
                    <button className={clsx(
                        {
                            "bg-green-400": task.is_complete,
                        }
                    )} onClick={() => { handleEditWrapper(task) }}>{task.is_complete ? "Completed" :" Not Completed"} </button>
                </div>
            </div>

        ))}
      </div>
    </div>
  );
};

export default Tasks;
