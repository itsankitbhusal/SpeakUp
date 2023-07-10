import { useRoutes } from 'react-router-dom';
import routes from './routes/routes';
import { ToastContainer } from './utils/toast';
import { NavbarProvider } from './context/NavbarContext';

const App = () => {
  const routing = useRoutes(routes);
  return (
    <>
      <NavbarProvider>
        <ToastContainer />
        {routing}
      </NavbarProvider>
    </>
  );
};

export default App;