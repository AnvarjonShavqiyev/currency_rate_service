import { Router } from 'express';
import { readRates } from '../helpers';
import { validateDate } from '../middlewares';

const router = Router();

router.get('/rates', (_, res) => {
  try {
    const data = readRates();
    const dates = Object.keys(data)
    const lastDate = dates[dates.length - 1]

    res.json({ date: lastDate, rates: data[lastDate] });
  } catch (error) {
    throw error;
  }
});

router.get('/rates/:date', validateDate, (req, res) => {
  try {
      const data = readRates();
      const { date } = req.params;

      res.json({ date, rates: data[date] });
  } catch (error) {
      throw error;
  }
});

router.get('/rates/:date/:currency', (req, res) => {
 try {
    const data = readRates();
    const { date, currency } = req.params;
    const dayData = data[date];
    const rate = dayData[currency.toUpperCase()];
    
    if (!rate) {
      return res.status(404).json({ error: `No rate for ${currency}` });
    }

    res.json({ date, currency: currency.toUpperCase(), rate });
  } catch (error) {
    throw error;
  }
});

export default router;
