export type SalesByDateDTO = {
  date: string;
  sum: number;
};

export type ChartSeriesData = {
  x: string;
  y: number;
};

export type Gender = 'MALE' | 'FEMALE' | 'OTHER';

export type FilterData = {
  dates?: Date[];
  gender?: Gender;
};

export type SalesSummaryDTO = {
  sum: number;
  min: number;
  max: number;
  avg: number;
  count: number;
};

export type SalesByStoreDTO = {
  storeName: string;
  sum: number;
};

export type SalesByPaymentMethodDTO = {
  description: string;
  sum: number;
};

export type PieChartParams = {
  labels: string[];
  series: number[];
};

export type SaleResponse = {
  content: Sale[];
};

export type Sale = {
  id: number;
  date: string;
  volume: number;
  total: number;
  gender: Gender;
  categoryName: string;
  paymentMethod: string;
  storeName: string;
};
