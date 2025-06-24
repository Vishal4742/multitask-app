import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import { Link } from 'react-router-dom';

interface Event {
  id: string;
  title: string;
  date: string;
  description: string;
}

const EventList: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    api.get('/events').then(res => setEvents(res.data));
  }, []);

  return (
    <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
      {events.map(event => (
        <Link to={`/events/${event.id}`} key={event.id} className="bg-white rounded shadow p-4 hover:bg-gray-50">
          <h2 className="text-xl font-bold">{event.title}</h2>
          <p className="text-gray-500">{new Date(event.date).toLocaleString()}</p>
          <p className="mt-2">{event.description}</p>
        </Link>
      ))}
    </div>
  );
};

export default EventList; 