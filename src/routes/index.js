import { lazy } from 'react';
import ChangePassword from 'pages/ChangePassword';

// use lazy for better code splitting
const Dashboard = lazy(() => import('../pages/Dashboard'));
// const Setting = lazy(() => import("../pages/Setting"));
const Page404 = lazy(() => import('../pages/404'));
const EditProfile = lazy(() => import('../pages/EditProfile'));
const Settings = lazy(() => import('../pages/Settings'));
const Preferences = lazy(() => import('../pages/Preferences'));
const CreateBot = lazy(() => import('../pages/CreateBot'));
const MyExchange = lazy(() => import('../pages/MyExchange'));
const ListBot = lazy(() => import('../pages/ListBot'));
const BotStatus = lazy(() => import('../pages/botStatus'));
const BotHistory = lazy(() => import('../pages/botHistory'));
const ErrosList = lazy(() => import('../pages/ErrorsList'));
const Subscription = lazy(() => import('../pages/Subscription'));
const SubscriptionHistory = lazy(() => import('../pages/SubscriptionHistory'));
const PaymentSuccess = lazy(() => import('../pages/PaymentSuccess'));
const Security = lazy(() => import('../pages/Security'));
const Affiliate = lazy(() => import('../pages/Affiliate'));
const Auth2fa = lazy(() => import('../pages/Auth2fa'));
const Contest = lazy(() => import('../pages/Contest'));
const Withdraw = lazy(() => import('../pages/Withdraw'));

/*
//  * ⚠ These are internal routes!
//  * They will be rendered inside the app, using the default `containers/Layout`.
//  * If you want to add a route to, let's say, a landing page, you should add
//  * it to the `App`'s router, exactly like `Login`, `CreateAccount` and other pages
//  * are routed.
//  *
//  * If you're looking for the links rendered in the SidebarContent, go to
//  * `routes/sidebar.js`
 */

const routes = [
  {
    path: '/dashboard',
    component: Dashboard,
  },

  {
    path: '/404',
    component: Page404,
  },
  {
    path: '/settings',
    component: Settings,
  },

  {
    path: '/settings/edit-profile',
    component: EditProfile,
  },
  {
    path: '/settings/subscription-history',
    component: SubscriptionHistory,
  },
  {
    path: '/settings/preferences',
    component: Preferences,
  },
  {
    path: '/settings/security',
    component: Security,
  },
  {
    path: '/create-bot',
    component: CreateBot,
  },
  {
    path: '/myexchange',
    component: MyExchange,
  },
  {
    path: '/list-bot',
    component: ListBot,
  },
  {
    path: '/bot-status/:id',
    component: BotStatus,
  },
  {
    path: '/bot-history/:id',
    component: BotHistory,
  },
  {
    path: '/errors-list',
    component: ErrosList,
  },
  {
    path: '/subscription',
    component: Subscription,
  },
  {
    path: '/payment-success/:id',
    component: PaymentSuccess,
  },
  {
    path: '/payment-failed',
    component: PaymentSuccess,
  },
  {
    path: '/change-password',
    component: ChangePassword,
  },
  {
    path: '/affiliate',
    component: Affiliate,
  },
  {
    path: '/2fa',
    component: Auth2fa,
  },
  {
    path: '/contest',
    component: Contest,
  },
  {
    path: '/withdraw',
    component: Withdraw,
  },
];

export default routes;
