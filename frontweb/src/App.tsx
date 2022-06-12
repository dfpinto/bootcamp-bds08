import Filter from './components/filter';
import Header from './components/header';
import { useState } from 'react';
import { FilterData } from './types';
import SalesByStore from './components/sales-by-store';
import './App.css';

function App() {
  const [filterData, setFilterData] = useState<FilterData>({ id: 0, name: '' });

  const onFilterChange = (filter: FilterData) => {
    setFilterData(filter);
  };
  return (
    <>
      <Header />
      <div className="app-container">
        <div className="app-filter-container">
          <Filter onFilterChange={onFilterChange} />
        </div>
        <div className="app-sales-by-store-container">
          <SalesByStore filterData={filterData} />
        </div>
      </div>
    </>
  );
}

export default App;
