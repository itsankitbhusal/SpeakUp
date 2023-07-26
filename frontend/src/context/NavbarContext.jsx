import { useState, createContext, useEffect } from 'react';
import decode from 'jwt-decode';

const NavbarContext = createContext();

const NavbarProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isVerifiedUser, setIsVerifiedUser] = useState(null);

  const handleSidebar = () => {
    setIsSidebarOpen(prevState => !prevState);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isSidebarOpen]);

  useEffect(() => {
    const token = localStorage.getItem('access');
    if (token) {
      const decodedToken = decode(token);
      const { is_verified } = decodedToken;
      if (is_verified === true) {
        setIsVerifiedUser(true);
      } else {
        setIsVerifiedUser(false);
      }
    }
  }, []);

  // listen for changes in access token
  useEffect(() => {
    const handleTokenChange = () => {
      const token = localStorage.getItem('access');
      if (token) {
        const decodedToken = decode(token);
        const { is_verified } = decodedToken;
        setIsVerifiedUser(is_verified);
      }
    };
    window.addEventListener('storage', handleTokenChange);

    // when component unmounts
    return () => {
      window.removeEventListener('storage', handleTokenChange);
    };
  }, []);

  return (
    <NavbarContext.Provider
      value={{ isSidebarOpen, handleSidebar, isVerifiedUser }}
    >
      {children}
    </NavbarContext.Provider>
  );
};

export { NavbarContext, NavbarProvider };
