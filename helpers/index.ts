import fs from 'fs';
import { DATA_PATH } from '../constants';

export const readRates = (): Record<string, any> => {
  try {
    const raw = fs.readFileSync(DATA_PATH, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return {};
  }
};

export const writeToFile = (data: any) => {
  fs.readFile(DATA_PATH, 'utf-8', (err, file) => {
    const existingData = err ? {} : JSON.parse(file);
    const date = new Date();
    const today = `${String(date.getDate()).padStart(2, '0')}.${String(date.getMonth() + 1).padStart(2, '0')}.${date.getFullYear()}`;

    const updatedData = {
      ...existingData,
      [today]: data.data,
    };

    fs.writeFileSync(DATA_PATH, JSON.stringify(updatedData, null, 2));
  });
};