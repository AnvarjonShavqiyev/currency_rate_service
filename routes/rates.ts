import { Router } from 'express';
import { readRates } from '../helpers';
import { validateDate } from '../middlewares';
import { startRateFetchLoop } from '../services/fetchRates';
import { ERROR_404, ONE } from '../constants';

const router = Router();

router.post('/start', (req, res) => {
  try {
    const {currency, interval} = req.body;
    startRateFetchLoop(currency, interval);
  
    res.send('Saving rates started!')
  } catch (error) {
    throw error;
  }
})

router.get('/rates', (_, res) => {
  try {
    const data = readRates();
    const dates = Object.keys(data)
    const lastDate = dates[dates.length - ONE]

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
      return res.status(ERROR_404).json({ error: `No rate for ${currency}` });
    }

    res.json({ date, currency: currency.toUpperCase(), rate });
  } catch (error) {
    throw error;
  }
});

export default router;
