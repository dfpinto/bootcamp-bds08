import './styles.css';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { FilterData, Store } from '../../types';
import { makeRequest } from '../../utils/request';

type Props = {
  onFilterChange: (filter: FilterData) => void;
};

function Filter({ onFilterChange }: Props) {
  const [stores, setStores] = useState<Store[]>([]);

  const onChangeStore = (storeValue: Store) => {
    onFilterChange(storeValue);
  };

  useEffect(() => {
    makeRequest
      .get<Store[]>('/stores')
      .then((response) => {
        setStores(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <header className="filter-container base-card">
      <Select
        placeholder="Selecione uma loja"
        options={stores}
        isClearable={true}
        className="filter-select-container"
        classNamePrefix="filter-select"
        getOptionLabel={(store) => store.name}
        getOptionValue={(store) => String(store.id)}
        onChange={(storeValue) => onChangeStore(storeValue as Store)}
      />
    </header>
  );
}

export default Filter;
