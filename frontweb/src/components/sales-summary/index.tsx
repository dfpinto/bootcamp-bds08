import SalesSummaryCard from './sales-summary-card';
import { ReactComponent as AvatarIcon } from '../../assets/avatar-icon.svg';
import { ReactComponent as SyncIcon } from '../../assets/sync-icon.svg';
import { ReactComponent as DoneIcon } from '../../assets/done-icon.svg';
import { ReactComponent as BarChartIcon } from '../../assets/bar-chart-icon.svg';
import './styles.css';
import { FilterData, SalesSummaryDTO } from '../../types';
import { useEffect, useMemo, useState } from 'react';
import { makeRequest } from '../../utils/request';
import { buildFilterParams } from '../filter/helpers';

type Props = {
  filterData?: FilterData;
};

const initialSummary = {
  sum: 0,
  min: 0,
  max: 0,
  avg: 0,
  count: 0
};

function SalesSummary({ filterData }: Props) {
  const [salesSummary, setSalesSummary] = useState<SalesSummaryDTO>(initialSummary);
  const params = useMemo(() => buildFilterParams(filterData), [filterData]);

  useEffect(() => {
    makeRequest
      .get<SalesSummaryDTO>('/sales/summary', { params })
      .then((response) => {
        setSalesSummary(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [params]);

  return (
    <div className="sales-summary-container">
      <SalesSummaryCard icon={<DoneIcon />} label="Média" value={salesSummary.avg.toFixed(2)} />
      <SalesSummaryCard icon={<SyncIcon />} label="Quantidade" value={salesSummary.count} />
      <SalesSummaryCard icon={<BarChartIcon />} label="Minima" value={salesSummary.min} />
      <SalesSummaryCard icon={<AvatarIcon />} label="Máxima" value={salesSummary.max} />
    </div>
  );
}

export default SalesSummary;
