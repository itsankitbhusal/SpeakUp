import { useContext, useEffect, useRef, useState } from 'react';
import Text from '../atoms/Text';
import { ModalProvider } from '../../context/ModalContext';
import { ConfessionContext } from '../../context/ConfessionContext';
import { NavbarContext } from '../../context/NavbarContext';
import Confession from '../organisms/Confession';
import WriteConfession from '../organisms/WriteConfession';
import TrendingConfessions from '../organisms/TrendingConfessions';
import { dateConverter } from '../../utils/dateConverter';
import Loading from '../atoms/Loading';
import { FaHotjar } from 'react-icons/fa';
import Line from '../atoms/Line';

const HomeMidFull = () => {
  const lastConfessionRef = useRef();
  const { confessions, setPage, isLoading, hasMore } = useContext(ConfessionContext);
  const { isVerifiedUser } = useContext(NavbarContext);
  const [showTrendingConfessions, setShowTrendingConfessions] = useState(false);
  // handle observer
  const handleObserver = entries => {
    const target = entries[0];
    if (target.isIntersecting && hasMore) {
      if (!isVerifiedUser) {
        return;
      }
      setPage(prevPage => prevPage + 1);
    }
  };

  // handle setPage when user is interacting with last confession in the list
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '20px',
      threshold: 1.0
    };
    const observer = new IntersectionObserver(handleObserver, options);
    if (lastConfessionRef.current) {
      observer.observe(lastConfessionRef.current);
    }
  }, [lastConfessionRef, isVerifiedUser, hasMore, confessions]);

  const handleTrendingClick = () => {
    setShowTrendingConfessions(!showTrendingConfessions);
  };

  return (
    <div
      className={
        'grid place-items-center max-w-[95vw] sm:max-w-[80vw] md:max-w-[60vw] lg:max-w-[40vw] '
      }
    >
      <div className="overflow-hidden sm:overflow-visible lg:w-full">
        <ModalProvider>
          <WriteConfession />
        </ModalProvider>
      </div>
      <div className=' w-full'>
        <Line className=' hidden sm:block sm:w-full border-gray-400' />
        <div className=' flex justify-center sm:justify-end items-center gap-2 mr-0 sm:-mt-8 '>
          <div onClick={handleTrendingClick} className=' text-sm bg-white hover:cursor-pointer hover:bg-cwhite hover:shadow-xl transition-all flex justify-center items-center gap-2 px-5 py-2 rounded-full'>
            <FaHotjar className='text-red-500 ' />
            <Text className="text-gray-400 font-semibold text-sm">
            Trending
            </Text>
          </div>
        </div>
      </div>
      <div className='w-full overflow-hidden sm:overflow-visible'>
        {showTrendingConfessions && <TrendingConfessions />}
      </div>
      <div className="w-full overflow-hidden sm:overflow-visible ">
        {confessions?.map((confession, index) => {
          if (confessions.length === index + 1) {
            return (
              <div ref={lastConfessionRef} key={confession.id}>
                <Confession
                  confessionId={confession.id}
                  handle={confession.user.handle}
                  date={dateConverter(confession.created_at)}
                  views={confession.views_count}
                  title={confession.title}
                  body={confession.body}
                />
              </div>
            );
          } else {
            return (
              <Confession
                key={confession.id}
                confessionId={confession.id}
                handle={confession.user.handle}
                date={dateConverter(confession.created_at)}
                views={confession.views_count}
                title={confession.title}
                body={confession.body}
              />
            );
          }
        })}
        {!isVerifiedUser ? (
          <div className="grid place-items-center">
            <Text className="text-center text-gray-400 font-bold text-base mb-8">
              You need to verify your email to view more confession
            </Text>
          </div>
        ) : null}

        {isLoading && (
          <div className="grid place-items-center w-full lg:w-[40vw] min-h-screen">
            <Loading />
            <Loading />
            <Loading />
          </div>
        )}
        <Text className="text-center text-gray-400">
          {!isLoading && isVerifiedUser && !hasMore && 'End of page.'}
        </Text>
      </div>
    </div>
  );
};

export default HomeMidFull;
