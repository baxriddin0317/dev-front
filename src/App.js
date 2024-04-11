import React, { lazy } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ToastContainer } from './utils/toast';
import AccessibleNavigationAnnouncer from './components/AccessibleNavigationAnnouncer';
import './styles/global.css';
import './styles/responsive.css';
import 'react-accessible-accordion/dist/fancy-example.css';
import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes';
import ProtectedAuth from './components/ProtectedRoutes/ProtectedAuth';

const Layout = lazy(() => import('./layout/Layout'));
const Login = lazy(() => import('./pages/Login'));
const SignUp = lazy(() => import('./pages/SignUp'));
const ForgetPassword = lazy(() => import('./pages/ForgotPassword'));
const ResetPassword = lazy(() => import('./pages/ResetPassword'));

function App() {
  const auth = useSelector((state) => state.auth);

  const { isLoggedIn } = auth;
  return (
    <>
      <ToastContainer />
      <Router>
        <AccessibleNavigationAnnouncer />
        <ProtectedAuth isLoggedIn={!isLoggedIn}>
          <Route exact exactly path="/signup/:refcode?">
            <SignUp />
          </Route>
          <Route exact path="/forgot-password">
            <ForgetPassword />
          </Route>
          <Route exact path="/login" exactly>
            <Login />
          </Route>
          <Route exact exactly path="/reset-password/:token">
            <ResetPassword />
          </Route>
        </ProtectedAuth>
        <ProtectedRoutes isLoggedIn={!isLoggedIn}>
          <Switch>
            <Route path="/" component={Layout} />
          </Switch>
        </ProtectedRoutes>
      </Router>
    </>
  );
}

export default App;
