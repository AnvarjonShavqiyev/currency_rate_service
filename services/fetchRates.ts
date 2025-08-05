import axios from 'axios';
import { FIVE_MINUTES } from '../constants';
import { writeToFile } from '../helpers';

export const startRateFetchLoop = () => {
  const fetchAndSave = async () => {
    try {
      const {data} = await axios.get(process.env.URL_PATH!);
      writeToFile(data.data);
    } catch (err) {
      console.error(err);
    }
  };

  fetchAndSave();
  setInterval(fetchAndSave, FIVE_MINUTES);
};
