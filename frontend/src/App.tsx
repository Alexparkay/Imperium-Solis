// import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  ScrollRestoration,
} from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Menu from './components/menu/Menu';
import Error from './pages/Error';
import ToasterProvider from './components/ToasterProvider';
import Login from './pages/Login';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import FacilityDataScraper from './pages/FacilityDataScraper';
import FacilityAIAnalysis from './pages/FacilityAIAnalysis';
import EnergyUsageEstimation from './pages/EnergyUsageEstimation';
import SolarPanelPotential from './pages/SolarPanelPotential';
import EmailAutomation from './pages/EmailAutomation';
import OutreachTracking from './pages/OutreachTracking';
import Pricing from './pages/Pricing';

function App() {
  const Layout = () => {
    return (
      <div
        id="rootContainer"
        className="w-full p-0 m-0 overflow-visible min-h-screen flex flex-col justify-between"
      >
        <ToasterProvider />
        <ScrollRestoration />
        <div>
          <Navbar />
          <div className="w-full flex gap-0 pt-20 xl:pt-[96px] 2xl:pt-[112px] mb-auto">
            <div className="hidden xl:block xl:w-[250px] 2xl:w-[280px] 3xl:w-[350px] border-r-2 border-base-300 dark:border-slate-700 px-3 xl:px-4 xl:py-1 fixed h-[calc(100vh-96px)] overflow-y-auto">
              <Menu />
            </div>
            <div className="w-full xl:ml-[250px] 2xl:ml-[280px] 3xl:ml-[350px] px-4 xl:px-4 2xl:px-5 xl:py-2 overflow-clip">
              <Outlet />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <Home />,
        },
        {
          path: '/profile',
          element: <Profile />,
        },
        {
          path: '/profile/edit',
          element: <EditProfile />,
        },
        {
          path: '/facility-data-scraper',
          element: <FacilityDataScraper />,
        },
        {
          path: '/facility-ai-analysis',
          element: <FacilityAIAnalysis />,
        },
        {
          path: '/facility-ai-analysis/:facilityId',
          element: <FacilityAIAnalysis />,
        },
        {
          path: '/energy-usage-estimation',
          element: <EnergyUsageEstimation />,
        },
        {
          path: '/solar-panel-potential',
          element: <SolarPanelPotential />,
        },
        {
          path: '/email-automation',
          element: <EmailAutomation />,
        },
        {
          path: '/outreach-tracking',
          element: <OutreachTracking />,
        },
        {
          path: '/pricing',
          element: <Pricing />,
        },
      ],
      errorElement: <Error />,
    },
    {
      path: '/login',
      element: <Login />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
