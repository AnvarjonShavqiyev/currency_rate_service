import { Router, Request, Response, NextFunction } from 'express';
import { readRates } from "../helpers";

export const validateDate = (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = readRates();
    const { date } = req.params;

    if (!data[date]) {
      return res.status(404).json({ error: `No data for ${date}` });
    }

    next();
  } catch (error) {
    next(error);
  }
}