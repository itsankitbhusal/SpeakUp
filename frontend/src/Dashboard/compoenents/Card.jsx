import { useState ,useEffect } from 'react';

import { getGrowthRate } from '../../services/analytics';
import AreaChart from './AreaChart';
import PieChart from './PieChart';
import DoughnutChart from './DougnutChart';

const Card = () => {
  const [data, setData] = useState({
    date: null,
    growthRate: null
  });

  useEffect(() => {
    const getData = async () => {
      const response = await getGrowthRate();
      setData(prev => ({
        ...prev,
        date: response.data.date,
        growthRate: response.data.growthRate
      }));
    };
    getData();
  }, []);
  return(
    <div className='rounded-sm max-h-screen py-8 px-16 outline outline-1 outline-cwhite hover:shadow-sm hover:cursor-pointer transition-all overflow-y-scroll scrollbar-hidden'>
      <div className='grid place-content-center gap-24 my-16 '>
        <AreaChart data={data} />
        <PieChart />
        <DoughnutChart />
      </div>
    </div>
  );
};

export default Card;