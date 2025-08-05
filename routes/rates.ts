import { Router } from 'express';
import { readRates } from '../helpers';

const router = Router();

router.get('/rates', (_, res) => {
  const data = readRates();
  const dates = Object.keys(data)
  const lastDate = dates[dates.length - 1]

  res.json({ date: lastDate, rates: data[lastDate] });
});

router.get('/rates/:date', (req, res) => {
  const data = readRates();
  const { date } = req.params;

  if (!data[date]) {
    return res.status(404).json({ error: `No data for ${date}` });
  }

  res.json({ date, rates: data[date] });
});

router.get('/rates/:date/:currency', (req, res) => {
  const data = readRates();
  const { date, currency } = req.params;

  const dayData = data[date];
  if (!dayData) {
    return res.status(404).json({ error: `No data for ${date}` });
  }

  const rate = dayData[currency.toUpperCase()];
  if (!rate) {
    return res.status(404).json({ error: `No rate for ${currency}` });
  }

  res.json({ date, currency: currency.toUpperCase(), rate });
});

export default router;
