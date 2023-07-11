import { createContext, useEffect, useState } from 'react';
import decode  from 'jwt-decode';

const DashboardContext = createContext();

const DashboardProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isNavOpen, setIsNavOpen] = useState(false);
    
  useEffect(() => {
    async function decodeToken(){
      const token = localStorage.getItem('access');
      const userData = await decode(token);
      if (userData && userData.role === 'admin') {
        setIsAdmin(true);
      }
      setIsLoading(false);
    }
    decodeToken();
  },[]);
    
  return (
    <DashboardContext.Provider value={{ isAdmin, isLoading, isNavOpen, setIsNavOpen }}>
      {children}
    </DashboardContext.Provider>
  );
};

export { DashboardContext, DashboardProvider };