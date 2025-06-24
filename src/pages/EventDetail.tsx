import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axios';

interface Event {
  id: string;
  title: string;
  date: string;
  description: string;
}

const EventDetail: React.FC = () => {
  const { id } = useParams();
  const [event, setEvent] = useState<Event | null>(null);
  const [countdown, setCountdown] = useState('');

  useEffect(() => {
    api.get(`/events/${id}`).then(res => setEvent(res.data));
  }, [id]);

  useEffect(() => {
    if (!event) return;
    const interval = setInterval(() => {
      const diff = new Date(event.date).getTime() - Date.now();
      if (diff <= 0) {
        setCountdown('Event started!');
        clearInterval(interval);
      } else {
        const hours = Math.floor(diff / 3600000);
        const minutes = Math.floor((diff % 3600000) / 60000);
        const seconds = Math.floor((diff % 60000) / 1000);
        setCountdown(`${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [event]);

  if (!event) return <div>Loading...</div>;

  return (
    <div className="max-w-xl mx-auto p-8 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-2">{event.title}</h1>
      <p className="text-gray-500 mb-2">{new Date(event.date).toLocaleString()}</p>
      <p className="mb-4">{event.description}</p>
      <div className="mb-4 font-mono text-lg">{countdown}</div>
      <button className="bg-blue-600 text-white px-4 py-2 rounded">Register</button>
    </div>
  );
};

export default EventDetail; 