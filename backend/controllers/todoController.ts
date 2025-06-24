import type { Request, Response } from 'express';

export const getTodos = async (req: Request, res: Response) => {
  res.json({ message: 'Get todos' });
};

export const createTodo = async (req: Request, res: Response) => {
  res.json({ message: 'Create todo' });
};

export const updateTodo = async (req: Request, res: Response) => {
  res.json({ message: 'Update todo' });
};

export const deleteTodo = async (req: Request, res: Response) => {
  res.json({ message: 'Delete todo' });
};

export const archiveTodo = async (req: Request, res: Response) => {
  res.json({ message: 'Archive todo' });
}; 