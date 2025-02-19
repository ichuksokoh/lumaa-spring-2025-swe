// RegisterPage.tsx
import { useState } from 'react';
import { registerUser } from '../services/auth';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await registerUser(username, password);
      // Redirect to login or home page after successful registration
    } catch (err) {
       console.error(err);
      setError('Registration failed. Please try again.');
    }
  };

  const handleUserExists = async () => {
    navigate('/login');
  }

  return (
    <div className='w-screen h-screen flex flex-col items-center justify-center gap-3'>
      <h2>Register</h2>
      <input
        className='rounded-md border-2 p-1' 
        type="text" 
        placeholder="Username" 
        value={username} 
        onChange={(e) => setUsername(e.target.value)} 
      />
      <input 
        className='rounded-md border-2 p-1' 
        type="password" 
        placeholder="Password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
      />
      <button onClick={handleRegister}>Register</button>
      {error && <p>{error}</p>}
      <p>Already A user?</p>  <button className='rounded-md' onClick={handleUserExists}>Login</button>
    </div>
  );
};

export default Register;
