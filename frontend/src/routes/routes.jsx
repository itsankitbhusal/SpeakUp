import Home from '../ui/pages/Home';
import Login from '../ui/pages/Login';
import NotFound from '../ui/pages/NotFound';
import Profile from '../ui/pages/Profile';
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
}, {
  path: '/profile',
  element: <Profile />
}, {
  path: '*',
  element: <NotFound />
}];

export default routes;