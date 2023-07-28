import { useContext, useEffect, useRef } from 'react';
import Text from '../atoms/Text';
import Confession from '../organisms/Confession';
import { dateConverter } from '../../utils/dateConverter';
import Loading from '../atoms/Loading';
import { ProfileContext } from '../../context/ProfileContext';

const ProfileConfessions = ({ className }) => {
  const bottom = useRef(null);
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
      threshold: 1
    };
  
    const observer = new IntersectionObserver(handleObserver, options);
    if (bottom.current) {
      observer.observe(bottom.current);
    }
  }, [bottom, hasMore, confessions]);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  },[]);

  return (
    <div className={`grid z-5 place-items-center my-20 w-full sm:max-w-[80vw] md:max-w-[60vw] lg:max-w-[58vw] ${ className }`}>
      <div >
        {confessions?.map((confession, index) => {
          if (confessions.length === index + 1) {
            return (
              <div ref={bottom} key={confession.id}>
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
              </div>
            );
          }
          else {
            return (
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
            );
          }
        })}
        {isLoading && (
          <div className="flex justify-center w-full">
            <Loading />
          </div>
        )}
        <Text className="text-center text-gray-400">{ !isLoading && 'End of page'}</Text>
      </div>
    </div>
  );
};

export default ProfileConfessions;
