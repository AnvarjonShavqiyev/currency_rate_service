import fs from 'fs';
import { DATA_PATH, JSON_FORMAT, MILISECOND, MINUTE, ONE, TWO, ZERO_STRING } from '../constants';
import { ExchangeRateResponse, Rate } from '../types';

export const readRates = (): Record<string, Rate> => {
  try {
    const raw = fs.readFileSync(DATA_PATH, JSON_FORMAT);
    return JSON.parse(raw);
  } catch(error) {
    throw error;
  }
};

export const writeToFile = (data: ExchangeRateResponse) => {
  fs.readFile(DATA_PATH, JSON_FORMAT, (err, file) => {
    let existingData: Record<string, Rate> = {};

    if (!err) {
      try {
        existingData = JSON.parse(file);
      } catch (parseError) {
        throw parseError;
      }
    }

    const updatedData = {
      ...existingData,
      [getToday()]: data,
    };

    try {
      fs.writeFileSync(DATA_PATH, JSON.stringify(updatedData, null, TWO));
    } catch (writeError) {
      throw writeError;
    }
  });
};

export const getToday = (): string => {
  const date = new Date();
  return `${String(date.getDate()).padStart(TWO, ZERO_STRING)}.${String(date.getMonth() + ONE).padStart(TWO, ZERO_STRING)}.${date.getFullYear()}`;
}

export const convertToMiliSeconds = (minutes: number) => {
  return minutes * MINUTE * MILISECOND;
}