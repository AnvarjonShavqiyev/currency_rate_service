import { Request, Response, NextFunction } from 'express';
import { readRates } from "../helpers";
import { ERROR_404 } from '../constants';

export const validateDate = (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = readRates();
    const { date } = req.params;

    if (!data[date]) {
      return res.status(ERROR_404).json({ error: `No data for ${date}` });
    }

    next();
  } catch (error) {
    next(error);
  }
}