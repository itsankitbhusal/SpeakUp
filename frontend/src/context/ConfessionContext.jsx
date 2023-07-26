import { createContext, useEffect, useState } from 'react';
import { getApprovedConfessions } from '../services/confessions';

const ConfessionContext = createContext();

const ConfessionProvider = ({ children }) => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [confessions, setConfessions] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const getConfession = async () => {
    if (!hasMore) {return;}
    setIsLoading(true);
    try {
      const response = await getApprovedConfessions(limit, page);
      if (response.success) {
        const { data } = response;
        if (data.confessions.length < limit) {
          setHasMore(false);
        }
        setConfessions(prevConfessions => [...prevConfessions, ...data.confessions]);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  // on change of page or limit, get the confessions
  useEffect(() => {
    getConfession();
  }, [page, limit]);
    
  return (
    <ConfessionContext.Provider value={{ confessions, page, setPage, isLoading, hasMore, setConfessions }}>
      {children}
    </ConfessionContext.Provider>
  );};

export { ConfessionContext, ConfessionProvider };