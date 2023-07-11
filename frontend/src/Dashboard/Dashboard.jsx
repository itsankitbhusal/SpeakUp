import { Outlet } from 'react-router-dom';
import Links from './components/Links';
import { DashboardProvider } from '../context/DashboardContext';

const Dashboard = ({ children }) => (
  <>
    <DashboardProvider>
      <div className=' block lg:flex mx-4 max-h-screen gap-8 justify-between transition-all'>
        <div className='w-full lg:w-4/12'>
          <Links />
        </div>
        <div className='w-full lg:w-8/12 grid place-items-center'>
          <Outlet />
        </div>
      </div>
      {children}
    </DashboardProvider>
  </>
);

export default Dashboard;