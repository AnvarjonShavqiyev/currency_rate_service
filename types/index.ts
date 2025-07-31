export interface ExchangeRateResponse {
  base: string;
  date: string;
  rates: Record<string, number>;
}
