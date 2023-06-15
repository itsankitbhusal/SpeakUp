import EditConfession from '../ui/pages/EditConfession';
import Home from '../ui/pages/Home';
import Login from '../ui/pages/Login';
import NotFound from '../ui/pages/NotFound';
import Profile from '../ui/pages/Profile';
import Register from '../ui/pages/Register';

import Dashboard from '../Dashboard/Dashboard';

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
  path: '/edit/:id',
  element: <EditConfession />
}, {
  path: '/dashboard',
  element: <Dashboard />
},
{
  path: '*',
  element: <NotFound />
}];

export default routes;