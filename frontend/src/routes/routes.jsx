import Home from '../ui/pages/Home';
import Login from '../ui/pages/Login';
import Register from '../ui/pages/Register';

const routes = [{
  path: '/',
  element: <Home />
}, {
  path: '/login',
  element: <Login />
}, {
  path: '/register',
  element: <Register />
}];

export default routes;