import React, { useContext } from 'react';
import { NavLink, Route } from 'react-router-dom';
import { Button, WindmillContext } from '@windmill/react-ui';
import { IoLogOutOutline } from 'react-icons/io5';
import { useDispatch } from 'react-redux';
import logoDark from '../../assets/img/logo/logo-dark.png';
import logoLight from '../../assets/img/logo/logo-light.png';
import sidebar from '../../routes/sidebar';
import { handleLogout } from '../../store/actions/authAction';

function SidebarContent() {
  const dispatch = useDispatch();
  const { mode } = useContext(WindmillContext);

  const handleLogOut = () => {
    dispatch(handleLogout());
  };

  return (
    <div className="py-4 text-gray-500 dark:text-[#9E9E9EFF]">
      <a className=" text-gray-900 dark:text-gray-300" href="/dashboard">
        {mode === 'dark' ? (
          <img src={logoLight} alt="dashtar" width="135" className="pl-6" />
        ) : (
          <img src={logoDark} alt="dashtar" width="135" className="pl-6" />
        )}
      </a>
      <ul className="mt-8">
        {sidebar.map((route) => (
          <li className="relative" key={route.name}>
            <NavLink
              exact
              to={route.path}
              className="px-6 py-4 inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-3bc48d dark:hover:text-gray-200"
              activeClassName="text-3bc48d dark:text-gray-100"
            >
              <Route path={route.path} exact={route.exact}>
                <span
                  className="absolute inset-y-0 left-0 w-1 bg-3bc48d rounded-tr-lg rounded-br-lg"
                  aria-hidden="true"
                />
              </Route>
              <route.icon className="w-5 h-5" aria-hidden="true" />
              <span className="ml-4">{route.name}</span>
            </NavLink>
          </li>
        ))}
      </ul>
      <span className="lg:fixed bottom-0 px-6 py-6 w-64 mx-auto relative mt-3 block">
        <Button
          onClick={handleLogOut}
          size="large"
          className="w-full bg-3bc48d hover:bg-[#3bc48d]"
        >
          <span className="flex items-center">
            <IoLogOutOutline className="mr-3 text-lg" />
            <span className="text-sm">Log out</span>
          </span>
        </Button>
      </span>
    </div>
  );
}

export default SidebarContent;
