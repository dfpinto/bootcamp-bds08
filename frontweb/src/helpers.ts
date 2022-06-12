import { SalesByGenreDTO } from './types';
import { formatGender } from './utils/formatters';

export const buildSalesByGenre = (sales: SalesByGenreDTO[]) => {
  return {
    labels: sales.map((sale) => formatGender(sale.gender)),
    series: sales.map((sale) => sale.sum)
  };
};
