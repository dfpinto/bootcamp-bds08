import { SalesByPaymentMethodDTO, SalesByStoreDTO } from './types';

export const buildSalesByStore = (sales: SalesByStoreDTO[]) => {
  return {
    labels: sales.map((sale) => sale.storeName),
    series: sales.map((sale) => sale.sum)
  };
};

export const buildSalesByPaymentMethod = (sales: SalesByPaymentMethodDTO[]) => {
  return {
    labels: sales.map((sale) => sale.description),
    series: sales.map((sale) => sale.sum)
  };
};
