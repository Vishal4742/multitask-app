import React, { useState } from 'react';
import api from '../api/axios';

const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/auth/register', { username, password });
      setMessage('Registration successful! You can now log in.');
    } catch (err: any) {
      setMessage(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-8 bg-white rounded shadow mt-8">
      <h2 className="text-xl font-bold mb-4">Register</h2>
      <input className="w-full mb-2 p-2 border rounded" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} required />
      <input className="w-full mb-2 p-2 border rounded" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
      <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit">Register</button>
      {message && <div className="mt-2 text-center">{message}</div>}
    </form>
  );
};

export default Register; 