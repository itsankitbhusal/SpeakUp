import { Outlet } from 'react-router-dom';
import Links from './compoenents/Links';
import { DashboardProvider } from '../context/DashboardContext';

const Dashboard = ({ children }) => (
  <>
    <DashboardProvider>
      <div className=' flex mx-[8vw] max-h-screen gap-8 justify-between'>
        <div className='w-4/12'>
          <Links />
        </div>
        <div className='w-8/12 grid place-items-center'>
          <Outlet />
        </div>
      </div>
      {children}
    </DashboardProvider>
  </>
);

export default Dashboard;