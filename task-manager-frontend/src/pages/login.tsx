import { useState, useContext } from 'react';
import { AuthContext } from '../context/authContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { login } = useContext(AuthContext)!;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(username, password);
    navigate('/tasks');
  };

    return (
        <div className='w-screen h-screen flex flex-col items-center justify-center gap-3'>
        <h2>Login</h2>
        <form className='flex flex-col gap-y-3' onSubmit={handleLogin}>
            <input className='rounded-md border-2 p-1' placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
            <input className='rounded-md border-2 p-1' type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">Login</button>
        </form>
        </div>
    );
    };

export default Login;
