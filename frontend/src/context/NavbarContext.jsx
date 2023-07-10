import { useState, createContext, useEffect } from 'react';

const NavbarContext = createContext();

const NavbarProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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

  return (
    <NavbarContext.Provider value={{ isSidebarOpen, handleSidebar }}>
      {children}
    </NavbarContext.Provider>
  );
};

export { NavbarContext, NavbarProvider };
