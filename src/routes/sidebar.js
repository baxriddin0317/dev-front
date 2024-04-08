import { FiGrid, FiSettings } from 'react-icons/fi';
import { AiOutlineRobot } from 'react-icons/ai';
import { BiBot, BiMedal } from 'react-icons/bi';
import { TbRobotOff, TbAffiliate, TbPlugConnected } from 'react-icons/tb';
import { MdOutlineAttachMoney } from 'react-icons/md';

const sidebar = [
  {
    path: '/dashboard',
    icon: FiGrid,
    name: 'Dashboard',
  },

  {
    path: '/create-bot',
    icon: BiBot,
    name: 'Create Bot',
  },
  {
    path: '/list-bot',
    icon: AiOutlineRobot,
    name: 'Bot List',
  },
  {
    path: '/errors-list',
    icon: TbRobotOff,
    name: 'Errors List',
  },
  {
    path: '/myexchange',
    icon: TbPlugConnected,
    name: 'My Exchange',
  },
  {
    path: '/subscription',
    icon: MdOutlineAttachMoney,
    name: 'Subscription',
  },
  {
    path: '/contest',
    icon: BiMedal,
    name: 'Contest',
  },
  {
    path: '/affiliate',
    icon: TbAffiliate,
    name: 'Affiliate',
  },
  {
    path: '/settings',
    icon: FiSettings,
    name: 'Settings',
  },
];

export default sidebar;
