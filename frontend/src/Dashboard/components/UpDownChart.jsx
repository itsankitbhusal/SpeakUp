import { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';

import { getConfessionVotesRatio } from '../../services/analytics';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);



const UpDownChart = () => {
  const [ratio, setRatio] = useState({
    labels: null,
    upVoteCount: null,
    downVoteCount: null
  });
    
  useEffect(() => {
    const getData = async () => {
      const response = await getConfessionVotesRatio();
      const { data } = response;
      setRatio(prev => ({
        ...prev,
        labels: data.labels,
        upVoteCount: data.upVoteCount,
        downVoteCount: data.downVoteCount
      }));
    };
    getData();
  }, []);
    
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: 'Last 12 Weeks of Upvotes and Downvotes in Confessions',
        font: { size: 24 }
      }
    }
  };
  const { labels } = ratio;
  const dataSet = {
    labels,
    datasets: [
      {
        fill: false,
        label: 'Upvotes',
        data: ratio.upVoteCount,
        borderColor: '#245c4f',
        pointBackgroundColor: '#9984a6',
        pointBorderColor: '#245c4f'

      }, {
        fill: false,
        label: 'Downvotes',
        data: ratio.downVoteCount,
        borderColor: '#71a89c',
        pointBackgroundColor: '#9984a6',
        pointBorderColor: '#71a89c'

      }
    ]
  };
  return (
    <div className='min-h-[75vh] grid place-items-center'>
      <Line width={'700px'} height="500px" options={options} data={dataSet} />
    </div>
  );
};

export default UpDownChart;