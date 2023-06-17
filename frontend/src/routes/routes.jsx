import decode from 'jwt-decode';
import EditConfession from '../ui/pages/EditConfession';
import Home from '../ui/pages/Home';
import Login from '../ui/pages/Login';
import NotFound from '../ui/pages/NotFound';
import Profile from '../ui/pages/Profile';
import Register from '../ui/pages/Register';

import Dashboard from '../Dashboard/Dashboard';
import Users from '../Dashboard/Pages/Users';
import Confession from '../Dashboard/Pages/Confession';
import Comment from '../Dashboard/Pages/Comment';
import Reporting from '../Dashboard/Pages/Reporting';
import DashHome from '../Dashboard/Pages/DashHome';

const getUserRole =  () => {
  const user = localStorage.getItem('access');
  if (user) {
    const decodedUser = decode(user);
    return decodedUser.role;
  } else {
    return 'not admin';
  }
};

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
  element: getUserRole() === 'admin'? <Dashboard />: null,
  children: [{
    index: true,
    element: <DashHome />
  },{
    path: 'users',
    element: <Users />
  }, {
    path: 'confessions',
    element: <Confession />
  }, {
    path: 'comments',
    element: <Comment />
  }, {
    path: 'reportings',
    element: <Reporting />
  }, {
    path: '*',
    element: <h1>not found</h1>
    
  }]
},
{
  path: '*',
  element: <NotFound />
}];

export default routes;
