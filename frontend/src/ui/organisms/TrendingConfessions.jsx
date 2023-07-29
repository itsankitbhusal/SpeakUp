import { useEffect, useState } from 'react';
import { FaHotjar } from 'react-icons/fa';
import { getTrendingConfessions } from '../../services/recommendation';
import { dateConverter } from '../../utils/dateConverter';
import Heading from '../atoms/Heading';
import Confession from './Confession';
import Line from '../atoms/Line';

const TrendingConfessions = () => {
  const [confessions, setConfessions] = useState([]);
  const getConfessionData = async() => {
    try {
      const response = await getTrendingConfessions();
      const data = await response.data;
      setConfessions(data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getConfessionData();
  }, []);
  return(
    <>
      <div className='w-full' >
        <div id='trendingHeader' className='sticky top-20 z-0 left-0 right-0 lg:top-20 lg:z-10 bg-cwhite' >
          <div className=' py-4'>
            <div className='relative grid place-items-center justify-start'>
              <Heading heading="h3" className='tracking-tighter mt-0 font-extrabold flex gap-2 justify-start items-center text-lg sm:text-xl'>
                <FaHotjar className='text-red-500 ' />
          Trending Confessions
              </Heading>
              <div className=' absolute bottom-0 top-0 right-0'>
                <span className=' bg-white rounded-full px-3 py-1 sm:px-4 sm:py-1 font-semibold right-0 text-sm sm:text-sm'>
                  {new Date().toLocaleString('default', { month: 'long' })}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div >
          {confessions?.map(confession => (
            <Confession
              key={confession.id}
              trending={true}
              confessionId={confession.id}
              handle={confession.user.handle}
              date={dateConverter(confession.created_at)}
              views={confession.views_count}
              title={confession.title}
              body={confession.body}
            />
          ))}
          <div className=' grid place-items-center my-16'>
            <Line className="hidden sm:block sm:w-full border-gray-400" />
            <div className=' mt-0 sm:-mt-8 text-center w-fit bg-cwhite px-4'>
              <Heading heading="h6" className="text-lg tracking-tighter"  >End of trending confessions</Heading>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default TrendingConfessions;