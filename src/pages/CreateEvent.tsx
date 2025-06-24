import React, { useState } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';

const CreateEvent: React.FC = () => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.post('/events', {
      title,
      date: `${date}T${time}`,
      description,
    });
    navigate('/events');
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-8 bg-white rounded shadow mt-8">
      <h2 className="text-xl font-bold mb-4">Create Event</h2>
      <input className="w-full mb-2 p-2 border rounded" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />
      <input className="w-full mb-2 p-2 border rounded" type="date" value={date} onChange={e => setDate(e.target.value)} required />
      <input className="w-full mb-2 p-2 border rounded" type="time" value={time} onChange={e => setTime(e.target.value)} required />
      <textarea className="w-full mb-2 p-2 border rounded" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} required />
      <button className="bg-green-600 text-white px-4 py-2 rounded" type="submit">Create</button>
    </form>
  );
};

export default CreateEvent; 