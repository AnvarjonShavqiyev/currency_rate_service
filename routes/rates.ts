import { Router } from 'express';
import { readRates } from '../helpers';

const router = Router();

router.get('/rates', (_, res) => {
  const data = readRates();
  const latest = Object.keys(data).sort().reverse()[0];

  if (!latest) return res.status(404).json({ error: 'No data yet' });

  res.json({ date: latest, rates: data[latest] });
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
