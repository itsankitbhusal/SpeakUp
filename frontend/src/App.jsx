import { useRoutes } from 'react-router-dom';
import routes from './routes/routes';
import { ToastContainer } from './utils/toast';
import { NavbarProvider } from './context/NavbarContext';

const App = () => {
  const routing = useRoutes(routes);

  // check for `/login` or `/register` routes
  const isLoginOrRegister = window.location.pathname === '/login' || window.location.pathname === '/register';
  return (
    <div className=' bg-cwhite'>
      {isLoginOrRegister ? (
        <>
          <ToastContainer />
          {routing}
        </>
      ): 
        <NavbarProvider>
          <ToastContainer />
          {routing}
        </NavbarProvider>
      }
    </div>
  );
};

export default App;