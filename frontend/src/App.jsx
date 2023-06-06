import { useRoutes } from 'react-router-dom';
import { MyContext } from './context/MyContext';
import routes from './routes/routes';
import { ToastContainer } from './utils/toast';

const App = () => {
  const routing = useRoutes(routes);
  return (
    <>
      <MyContext.Provider value={{}}>
        <ToastContainer />
        {routing}
      </MyContext.Provider>
    </>
  );
};

export default App;