// import toast from 'react-hot-toast';
import {
  HiOutlineHome,
  HiOutlineUser,
} from 'react-icons/hi2';
import { 
  MdSolarPower, 
  MdFactory, 
  MdLocationOn, 
  MdElectricBolt, 
  MdOutlineAnalytics,
  MdOutlineEmail,
  MdOutlineTrackChanges,
  MdAttachMoney
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
      {
        isLink: true,
        url: '/profile',
        icon: HiOutlineUser,
        label: 'company profile',
      },
    ],
  },
  {
    catalog: 'imperum solis workflow',
    listItems: [
      {
        isLink: true,
        url: '/facility-database',
        icon: MdLocationOn,
        label: 'facility database',
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
        label: 'energy usage\nestimation',
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
];
