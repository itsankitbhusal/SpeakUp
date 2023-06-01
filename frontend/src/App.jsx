import CreateConfessionModal from './ui/organisms/CreateConfessionModal';
import Home from './ui/pages/Home.jsx';
import { MyContext } from './context/MyContext';

const App = () => (
  <MyContext.Provider value={{}}>
    <Home />
    <CreateConfessionModal />
  </MyContext.Provider>
);

export default App;