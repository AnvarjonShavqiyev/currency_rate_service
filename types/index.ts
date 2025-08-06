export interface ExchangeRateResponse {
  base: string;
  date: string;
  rates: Record<string, number>;
}

export type Rate = Record<string, number>
