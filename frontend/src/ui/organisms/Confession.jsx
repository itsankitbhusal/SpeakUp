import { useEffect, useRef, useState } from 'react';
import Line from '../atoms/Line';
import ConfessionPost from '../molecules/ConfessionPost';
import WriteComment from '../molecules/WriteComment';
import { createView, getConfessionViewsByUserId } from '../../services/ConfessionView';

const Confession = ({ handle, date, views, title, body, confessionId }) => {
  const confessionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false); 
  const [isAlreadyViewed, setIsAlreadyViewed] = useState(false);

  const callbackFunction = entries => {
    const [entry] = entries;
    if (entry.isIntersecting && !isVisible) {
      setIsVisible(true);
    }
  };
  // set initial view count by fetching from backend
  useEffect(() => {
    async function getViews() {
      const response = await getConfessionViewsByUserId(confessionId);
      if (response.success) {
        setIsAlreadyViewed(true);
      } else {
        setIsAlreadyViewed(false);
      }
    }
    getViews();
  }, []);

  // if the isVisible than create view in the backend
  useEffect(() => {
    const createViewAfterDelay = () => {
      setTimeout(() => {
        if (isVisible && !isAlreadyViewed) {
          createView(confessionId);
        }
      }, 2000);
    };
    return () => {
      createViewAfterDelay();
    };
  }, [isVisible, isAlreadyViewed]);

  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 1.0
  };

  useEffect(() => {
    const observer = new IntersectionObserver(callbackFunction, options);
    if (confessionRef.current) {observer.observe(confessionRef.current);}
    return () => {
      if (confessionRef.current) {observer.unobserve(confessionRef.current);}
    };
  }, [confessionRef, options]);
  
  return (
    <div ref={confessionRef} className=" my-8">
      <ConfessionPost
        confessionId={confessionId}
        handle={handle}
        date={date}
        views={views}
        title={title}
        body={body}
      />
      <div className=" my-4">
        <WriteComment confessionId={confessionId} />
      </div>
      <Line />
    </div>
  );
};

export default Confession;
