import CreateConfessionModal from './ui/organisms/CreateConfessionModal';
import Home from './ui/pages/Home.jsx';
import { MyContext } from './context/MyContext';
import Register from './ui/pages/Register';
import Login from './ui/pages/Login';

const App = () => (
  <MyContext.Provider value={{}}>
    {/* <Home />
    <CreateConfessionModal /> */}
    <Register />
    <Login />

  </MyContext.Provider>
);

export default App;