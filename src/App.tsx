import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import EventList from './pages/EventList';
import EventDetail from './pages/EventDetail';
import CreateEvent from './pages/CreateEvent';
import Register from './pages/Register';

const App: React.FC = () => (
  <Routes>
    <Route path="/" element={<Navigate to="/events" />} />
    <Route path="/events" element={<EventList />} />
    <Route path="/events/:id" element={<EventDetail />} />
    <Route path="/create-event" element={<CreateEvent />} />
    <Route path="/register" element={<Register />} />
  </Routes>
);

export default App; 