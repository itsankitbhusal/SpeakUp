import { createContext, useEffect, useState } from 'react';
import { getApprovedConfessions } from '../services/confessions';

const ConfessionContext = createContext();

const ConfessionProvider = ({ children }) => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
    
  const [confessions, setConfessions] = useState([]);
  const getConfession = async () => {
    const response = await getApprovedConfessions(limit, page);
    if (response.success) {
      const data = await response.data;
      setConfessions(data.confessions);
    } else {
      throw new Error(response.message);
    }
  };
  const handleLimitChange = event => {
    setLimit(event.target.value);
  };
  const handlePageChange = event => {
    setPage(event.target.value);
  };
    
  // on change of page or limit, get the confessions
  useEffect(() => {
    getConfession();
  }, [page, limit]);
    
  return (
    <ConfessionContext.Provider value={{ confessions, handleLimitChange, handlePageChange }}>
      {children}
    </ConfessionContext.Provider>
  );};

export { ConfessionContext, ConfessionProvider };