import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import ConfessionPost from '../molecules/ConfessionPost';
import { createView, getConfessionViewsByUserId } from '../../services/ConfessionView';

const Confession = ({ handle, date, views, title, body, confessionId, isApproved, isProfile }) => {
  const confessionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false); 
  const [isAlreadyViewed, setIsAlreadyViewed] = useState(false);

  // framer motion hook
  const isInView = useInView(confessionRef, { once: true });

  const callbackFunction = entries => {
    const [entry] = entries;
    if (entry.isIntersecting && !isVisible) {
      setIsVisible(true);
    }
  };
  // set initial view count by fetching from backend
  useEffect(() => {
    async function getViews() {
      try {
        const response = await getConfessionViewsByUserId(confessionId);
        if (response.success) {
          setIsAlreadyViewed(true);
        } else {
          setIsAlreadyViewed(false);
        }
      } catch (error) {
        console.error(error);
      }
    }
    getViews();
  }, []);

  // if the isVisible than create view in the backend
  useEffect(() => {
    let viewTimeout;
    if (isVisible && !isAlreadyViewed) {
      viewTimeout = setTimeout(() => {
        try {
          createView(confessionId);
          setIsAlreadyViewed(true);
        } catch (error) {
          console.error(error);
        }
      }, 2000);
    }
    return () => {
      clearTimeout(viewTimeout);
    };
  }, [isVisible, isAlreadyViewed, confessionId]);

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
    <motion.div
      ref={confessionRef}
      className=" my-8 outline outline-1 px-4 py-2 rounded-sm  outline-gray-200  transition-shadow"
      initial={{ scale: 0 }}
      animate={{ scale: isInView ? 1 : 0 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20, duration: 0.3 }}

    >
      <ConfessionPost
        confessionId={confessionId}
        handle={handle}
        date={date}
        views={views}
        title={title}
        body={body}
        isApproved={isApproved}
        isProfile={isProfile}
      />
    </motion.div>
  );
};

export default Confession;
