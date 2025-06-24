import type { Request, Response } from 'express';

export const getEvents = async (req: Request, res: Response) => {
  res.json({ message: 'Get events' });
};

export const createEvent = async (req: Request, res: Response) => {
  res.json({ message: 'Create event' });
};

export const updateEvent = async (req: Request, res: Response) => {
  res.json({ message: 'Update event' });
};

export const deleteEvent = async (req: Request, res: Response) => {
  res.json({ message: 'Delete event' });
};

export const archiveEvent = async (req: Request, res: Response) => {
  res.json({ message: 'Archive event' });
}; 