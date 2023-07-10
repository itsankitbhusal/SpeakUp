import { useContext, useEffect, useRef } from 'react';
import Text from '../atoms/Text';
import { ModalProvider } from '../../context/ModalContext';
import { ConfessionContext } from '../../context/ConfessionContext';
import Confession from '../organisms/Confession';
import WriteConfession from '../organisms/WriteConfession';
import { dateConverter } from '../../utils/dateConverter';
import Loading from '../atoms/Loading';

const HomeMidFull = () => {
  const bottom = useRef(null);
  const confessionRef = useRef(null);
  const { confessions, setPage, isLoading, hasMore } = useContext(ConfessionContext);
  
  // handle observer
  const handleObserver = entries => {
    const target = entries[0];
    if (target.isIntersecting && hasMore) {
      setPage(prevPage => prevPage + 1);
    }
  };
  
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '20px',
      threshold: 1 // Change threshold to detect partial visibility
    };
  
    const observer = new IntersectionObserver(handleObserver, options);
    if (bottom.current) {
      observer.observe(bottom.current);
    }
  }, [ bottom ]);

  return (
    <div className={'grid place-items-center max-w-[95vw] sm:max-w-[80vw] md:max-w-[60vw] lg:max-w-[40vw] '}>
      <div className='overflow-hidden sm:overflow-visible lg:w-full'>
        <ModalProvider>
          <WriteConfession />
        </ModalProvider>
      </div>
      <div ref={confessionRef} className='w-full'>
        {confessions?.map(confession => (
          <Confession
            key={confession.id}
            confessionId={confession.id}
            handle={confession.user.handle}
            date={dateConverter(confession.created_at)}
            views={confession.views_count}
            title={confession.title}
            body={confession.body}
          />
        ))}
        {isLoading && (
          <div className="flex justify-center w-full">
            <Loading />
          </div>
        )}
        <div ref={bottom} className='my-8' >
          <Text className="text-center text-gray-400">{ !isLoading && 'End of page'}</Text>
        </div>
      </div>
    </div>
  );
};

export default HomeMidFull;
