import { FilterData } from '../../types';

export const buildFilterParams = (filterData?: FilterData) => {
  return {
    storeId: filterData?.id
  };
};
