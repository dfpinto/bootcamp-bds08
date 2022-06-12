import ReactApexChart from 'react-apexcharts';
import { buildPieChartConfig } from './helpers';
import './styles.css';

type Props = {
  labels?: string[];
  name: string;
  series?: number[];
};

function PieChartCard({ labels = [], name, series = [] }: Props) {
  return (
    <>
      <ReactApexChart
        options={buildPieChartConfig(labels, name)}
        type="donut"
        width={400}
        height={400}
        series={series}
      />
    </>
  );
}

export default PieChartCard;
