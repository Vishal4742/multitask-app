import type { Request, Response } from 'express';

export const getReminders = async (req: Request, res: Response) => {
  res.json({ message: 'Get reminders' });
};

export const createReminder = async (req: Request, res: Response) => {
  res.json({ message: 'Create reminder' });
};

export const updateReminder = async (req: Request, res: Response) => {
  res.json({ message: 'Update reminder' });
};

export const deleteReminder = async (req: Request, res: Response) => {
  res.json({ message: 'Delete reminder' });
};

export const archiveReminder = async (req: Request, res: Response) => {
  res.json({ message: 'Archive reminder' });
}; 