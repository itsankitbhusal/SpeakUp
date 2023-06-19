import { useEffect, useState } from 'react';

import { getGrowthRate } from '../../services/analytics';
import AreaChart from './AreaChart';
import PieChart from './PieChart';
import DoughnutChart from './DougnutChart';
import ConfessionChart from './ConfessionChart';
import UpDownChart from './UpDownChart';

const ChartsContainer = () => {
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
    <div className='rounded-sm max-h-screen outline-cwhite hover:shadow-sm hover:cursor-pointer transition-all overflow-y-scroll scrollbar-hidden'>
      <div className='scroll-snap-container'>
        <div className='scroll-snap-child h-screen grid place-items-center'>
          <AreaChart data={data} />
        </div>
        <div className='scroll-snap-child h-screen grid place-items-center'>
          <UpDownChart />
        </div>
        <div className='scroll-snap-child h-screen grid place-items-center'>
          <PieChart />
        </div>
        <div className='scroll-snap-child h-screen grid place-items-center'>
          <DoughnutChart />
        </div>
        <div className='scroll-snap-child h-screen grid place-items-center'>
          <ConfessionChart />
        </div>
      </div>
    </div>
  );
};

export default ChartsContainer;