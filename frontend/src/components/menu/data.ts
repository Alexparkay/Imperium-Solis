// import toast from 'react-hot-toast';
import {
  HiOutlineHome,
  HiOutlineArrowLeftOnRectangle,
} from 'react-icons/hi2';
import { 
  MdSolarPower, 
  MdFactory, 
  MdLocationOn, 
  MdElectricBolt, 
  MdOutlineAnalytics,
  MdOutlineEmail,
  MdOutlineTrackChanges
} from 'react-icons/md';

export const menu = [
  {
    catalog: 'main',
    listItems: [
      {
        isLink: true,
        url: '/',
        icon: HiOutlineHome,
        label: 'dashboard',
      },
    ],
  },
  {
    catalog: 'imperum solis workflow',
    listItems: [
      {
        isLink: true,
        url: '/facility-data-scraper',
        icon: MdLocationOn,
        label: 'facility data scraper',
      },
      {
        isLink: true,
        url: '/facility-ai-analysis',
        icon: MdFactory,
        label: 'facility ai analysis',
      },
      {
        isLink: true,
        url: '/energy-usage-estimation',
        icon: MdElectricBolt,
        label: 'energy usage estimation',
      },
      {
        isLink: true,
        url: '/solar-panel-potential',
        icon: MdSolarPower,
        label: 'solar panel potential',
      },
      {
        isLink: true,
        url: '/email-automation',
        icon: MdOutlineEmail,
        label: 'email automation',
      },
      {
        isLink: true,
        url: '/outreach-tracking',
        icon: MdOutlineTrackChanges,
        label: 'outreach tracking',
      },
    ],
  },
  {
    catalog: 'miscellaneous',
    listItems: [
      {
        isLink: true,
        url: '/login',
        icon: HiOutlineArrowLeftOnRectangle,
        label: 'log out',
      },
    ],
  },
];
