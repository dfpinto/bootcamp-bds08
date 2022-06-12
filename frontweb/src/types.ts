export type ChartSeriesData = {
  x: string;
  y: number;
};

export type Gender = 'MALE' | 'FEMALE' | 'OTHER';

export type FilterData = {
  id?: number;
  name?: string;
};

export type SalesByStoreDTO = {
  sum: number;
};

export type SalesByGenreDTO = {
  gender: Gender;
  sum: number;
};

export type Store = {
  name: string;
  id: number;
};

export type PieChartParams = {
  labels: string[];
  series: number[];
};
