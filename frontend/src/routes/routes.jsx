import decode from 'jwt-decode';
import EditConfession from '../ui/pages/EditConfession';
import Home from '../ui/pages/Home';
import Login from '../ui/pages/Login';
import NotFound from '../ui/pages/NotFound';
import Register from '../ui/pages/Register';

import Verify from '../ui/pages/Verify';
import Reset from '../ui/pages/Reset';

import Dashboard from '../Dashboard/Dashboard';
import Users from '../Dashboard/Pages/Users';
import Confession from '../Dashboard/Pages/Confession';
import Comment from '../Dashboard/Pages/Comment';
import Reporting from '../Dashboard/Pages/Reporting';
import DashHome from '../Dashboard/Pages/DashHome';
import Tag from '../ui/pages/Tag';
import PublicProfile from '../ui/pages/PublicProfile';
import { ProfileProvider } from '../context/ProfileContext';

const getUserRole = () => {
  const user = localStorage.getItem('access');
  if (user) {
    const decodedUser = decode(user);
    return decodedUser.role;
  } else {
    return 'not admin';
  }
};

const routes = [
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/profile/:handle',
    element: (
      <ProfileProvider>
        <PublicProfile />
      </ProfileProvider>
    )
  },
  {
    path: '/edit/:id',
    element: <EditConfession />
  },
  {
    path: '/tag/:tag',
    element: <Tag />
  },
  {
    path: '/verify/:token',
    element: <Verify />
  },
  {
    path: '/reset/:token',
    element: <Reset />
  },
  {
    path: '/dashboard',
    element: getUserRole() === 'admin' ? <Dashboard /> : null,
    children: [
      {
        index: true,
        element: <DashHome />
      },
      {
        path: 'users',
        element: <Users />
      },
      {
        path: 'confessions',
        element: <Confession />
      },
      {
        path: 'comments',
        element: <Comment />
      },
      {
        path: 'reportings',
        element: <Reporting />
      },
      {
        path: '*',
        element: <NotFound />
      }
    ]
  },
  {
    path: '*',
    element: <NotFound />
  }
];

export default routes;
