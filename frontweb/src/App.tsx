import Filter from './components/filter';
import Header from './components/header';
import './App.css';
import SalesByDate from './components/sales-by-date';
import SalesSummary from './components/sales-summary';
import PieChartCard from './components/pie-chart-card';
import SalesTable from './components/sales-table';
import { useEffect, useMemo, useState } from 'react';
import { FilterData, PieChartParams, SalesByPaymentMethodDTO, SalesByStoreDTO } from './types';
import { makeRequest } from './utils/request';
import { buildFilterParams } from './components/filter/helpers';
import { buildSalesByPaymentMethod, buildSalesByStore } from './helpers';

function App() {
  const [filterData, setFilterData] = useState<FilterData>();
  const [salesByStore, setSalesByStore] = useState<PieChartParams>();
  const [salesByPaymentMethod, setSalesByPaymentMethod] = useState<PieChartParams>();

  const params = useMemo(() => buildFilterParams(filterData), [filterData]);

  useEffect(() => {
    makeRequest
      .get<SalesByStoreDTO[]>('/sales/by-store', { params })
      .then((response) => {
        setSalesByStore(buildSalesByStore(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  }, [params]);

  useEffect(() => {
    makeRequest
      .get<SalesByPaymentMethodDTO[]>('/sales/by-payment-method', { params })
      .then((response) => {
        setSalesByPaymentMethod(buildSalesByPaymentMethod(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  }, [params]);

  const onFilterChange = (filter: FilterData) => {
    setFilterData(filter);
  };
  return (
    <>
      <Header />
      <div className="app-container">
        <Filter onFilterChange={onFilterChange} />
        <SalesByDate filterData={filterData} />
        <div className="sales-overview-container">
          <SalesSummary filterData={filterData} />
          <PieChartCard labels={salesByStore?.labels} name="Lojas" series={salesByStore?.series} />
          <PieChartCard
            labels={salesByPaymentMethod?.labels}
            name="Pagamento"
            series={salesByPaymentMethod?.series}
          />
        </div>
        <div>
          <SalesTable filterData={filterData} />
        </div>
      </div>
    </>
  );
}

export default App;
