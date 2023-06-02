import { useRoutes } from 'react-router-dom';
import { MyContext } from './context/MyContext';
import routes from './routes/routes';

const App = () => {
  const routing = useRoutes(routes);
  return(
    <MyContext.Provider value={{}}>
      {routing}
    </MyContext.Provider>
  );
};

export default App;