import './styles.css';
import ReactApexChart from 'react-apexcharts';
import { buildChartSeries, chartOptions, sumSalesByDate } from './helpers';
import { useEffect, useMemo, useState } from 'react';
import { makeRequest } from '../../utils/request';
import { ChartSeriesData, FilterData, SalesByDateDTO } from '../../types';
import { formatDate, formatPrice } from '../../utils/formatters';
import { buildFilterParams } from '../filter/helpers';

type Props = {
  filterData?: FilterData;
};

function SalesByDate({ filterData }: Props) {
  const [chartSeries, setChartSeries] = useState<ChartSeriesData[]>([]);
  const [sumTotalSales, setSumTotalSales] = useState(0);
  const params = useMemo(() => buildFilterParams(filterData), [filterData]);

  useEffect(() => {
    makeRequest
      .get<SalesByDateDTO[]>('/sales/by-date', { params })
      .then((response) => {
        const newChartSeries = buildChartSeries(response.data);
        setChartSeries(newChartSeries);
        const newSumTotalSeles = sumSalesByDate(response.data);
        setSumTotalSales(newSumTotalSeles);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [params]);

  return (
    <div className="sales-by-date-container base-card">
      <h4 className="sales-by-date-title">Evolução de Vendas</h4>
      {filterData?.dates && (
        <span className="sales=by-date-period">
          {formatDate(filterData.dates[0])} até {formatDate(filterData.dates[1])}
        </span>
      )}

      <div className="sales-by-date-data">
        <div className="sales-by-date-quantity-container">
          <h2 className="sales-by-date-quantity-value">{formatPrice(sumTotalSales)}</h2>
          <span className="sales-by-date-quantity-label">Vendas no período</span>
          <span className="sales-by-date-quantity-description">
            O gráfico mostra as vendas em todas as lojas
          </span>
        </div>
        <div className="sales-by-date-chart">
          <ReactApexChart
            options={chartOptions}
            series={[{ name: 'Vendas', data: chartSeries }]}
            type="bar"
            height={240}
            width="100%"
          />
        </div>
      </div>
    </div>
  );
}

export default SalesByDate;
