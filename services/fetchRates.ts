import axios from 'axios';
import { convertToMiliSeconds, writeToFile } from '../helpers';
import { DEFAULT_CURRENCY } from '../constants';

export const startRateFetchLoop = (currency: string, interval: number) => {
  const fetchAndSave = async () => {
    try {
      const { data } = await axios.get(process.env.URL_PATH! + `&base_currency=${currency ? currency.toUpperCase() : DEFAULT_CURRENCY}`);
      writeToFile(data.data);
    } catch (error) {
      throw error
    }
  };

  fetchAndSave();
  setInterval(fetchAndSave, convertToMiliSeconds(interval));
};
