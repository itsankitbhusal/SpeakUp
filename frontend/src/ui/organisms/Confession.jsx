import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import ConfessionPost from '../molecules/ConfessionPost';
import { createView } from '../../services/ConfessionView';

const Confession = ({ handle, date, views, title, body, confessionId, isApproved, isProfile, trending }) => {
  const confessionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  // framer motion hook
  const isInView = useInView(confessionRef, { once: true });

  const callbackFunction = entries => {
    const [entry] = entries;
    if (entry.isIntersecting && !isVisible) {
      setIsVisible(true);
    }
  };

  // if the isVisible than create view in the backend
  useEffect(() => {
    let viewTimeout;
    if (isVisible) {
      viewTimeout = setTimeout(async () => {
        try {
          await createView(confessionId);
        } catch (error) {
          console.error(error);
        }
      }, 2000);
    }
    return () => {
      clearTimeout(viewTimeout);
    };
  }, [isVisible]);

  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 1.0
  };

  useEffect(() => {
    const observer = new IntersectionObserver(callbackFunction, options);
    if (confessionRef.current) { observer.observe(confessionRef.current); }
    return () => {
      if (confessionRef.current) { observer.unobserve(confessionRef.current); }
    };
  }, [confessionRef, options]);
  
  return (
    <motion.div
      ref={confessionRef}
      className={`my-8 pt-16 sm:pt-2 outline outline-1 px-4 py-2 rounded-sm  outline-gray-200 ${ trending && 'bg-white' }  transition-shadow`}
      initial={{ scale: trending ? .9: 0 }}
      animate={{ scale: isInView ? 1 : .5 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20, duration: 0.3 }}

    >
      <ConfessionPost
        trending={trending}
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
