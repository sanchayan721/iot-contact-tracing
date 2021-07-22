import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/components/DashboardLayout';
import MainLayout from 'src/components/MainLayout';
import BeaconList from 'src/pages/BeaconList';
import Dashboard from 'src/pages/Dashboard';


const routes = [{
  path: '/',
  element: <MainLayout />,
  children: [
    { path: '/', element: <Navigate to="/app/dashboard" /> }, //home page
    { path: '*', element: <Navigate to="/404" /> } //unknown page
  ]
},
{
  path: 'app',
  element: <DashboardLayout />,
  children: [
    { path: 'beacons', element: <BeaconList /> }, //live data
    { path: 'dashboard', element: <Dashboard /> }, //dashboard for analytics
    { path: '*', element: <Navigate to="/404" /> }
  ]
}

];

export default routes;
