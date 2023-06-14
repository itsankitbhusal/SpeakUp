import { useContext, useEffect, useRef } from 'react';
import Text from '../atoms/Text';
import Confession from '../organisms/Confession';
import { dateConverter } from '../../utils/dateConverter';
import Loading from '../atoms/Loading';
import { ProfileContext } from '../../context/ProfileContext';

const ProfileConfessions = ({ className }) => {
  const bottom = useRef(null);
  const confessionRef = useRef(null);
  //   const { confessions, setPage, isLoading, hasMore } = useContext(ConfessionContext);
  const { confessions, setPage, isLoading, hasMore } = useContext(ProfileContext);
  
  
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
    <div className={`grid place-items-center max-w-[58vw] ${ className }`}>
      <div ref={confessionRef}>
        {confessions?.map(confession => (
          <Confession
            key={confession.id}
            confessionId={confession.id}
            handle={confession.user.handle}
            date={dateConverter(confession.created_at)}
            views={confession.views_count}
            title={confession.title}
            body={confession.body}
            isApproved={confession.is_approved}
            isProfile={true}
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

export default ProfileConfessions;
