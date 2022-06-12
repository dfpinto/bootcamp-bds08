import './styles.css';
import { useEffect, useMemo, useState } from 'react';
import { makeRequest } from '../../utils/request';
import { FilterData, PieChartParams, SalesByGenreDTO, SalesByStoreDTO } from '../../types';
import { formatPrice } from '../../utils/formatters';
import { buildFilterParams } from '../filter/helpers';
import PieChartCard from '../pie-chart-card';
import { buildSalesByGenre } from '../../helpers';

type Props = {
  filterData?: FilterData;
};

function SalesByStore({ filterData }: Props) {
  const [sumTotalSales, setSumTotalSales] = useState<SalesByStoreDTO>({ sum: 0 });
  const [salesByGenre, setSalesByGenre] = useState<PieChartParams>();
  const params = useMemo(() => buildFilterParams(filterData), [filterData]);

  useEffect(() => {
    makeRequest
      .get<SalesByStoreDTO>('/sales/summary', { params })
      .then((response) => {
        setSumTotalSales(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [params]);

  useEffect(() => {
    makeRequest
      .get<SalesByGenreDTO[]>('/sales/by-gender', { params })
      .then((response) => {
        setSalesByGenre(buildSalesByGenre(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  }, [params, sumTotalSales]);

  return (
    <div className="sales-by-store-container base-card">
      <div className="sales-by-store-quantity-container">
        <h2 className="sales-by-store-quantity-value">{formatPrice(sumTotalSales.sum)}</h2>
        <span className="sales-by-store-quantity-label">Vendas no período</span>
      </div>
      <div className="sales-by-store-chart">
        <PieChartCard labels={salesByGenre?.labels} name="Lojas" series={salesByGenre?.series} />
      </div>
    </div>
  );
}

export default SalesByStore;
