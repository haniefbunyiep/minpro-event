import { NextFunction, Request, Response } from 'express';

export const Test = (req: Request, res: Response, next: NextFunction) => {
  res.send('Hello, Purwadhika Student !');
};
