import { DashboardProvider } from '../context/DashboardContext';
import DashboardPage from '../Dashboard/Pages/DashboardPage';

const Dashboard = () => (
  <>
    <DashboardProvider>
      <DashboardPage />
    </DashboardProvider>
  </>
);

export default Dashboard;