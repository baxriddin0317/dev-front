import React, { useContext, useEffect, useRef, useState } from 'react';
import { Avatar, WindmillContext } from '@windmill/react-ui';
import { FaBell } from 'react-icons/fa';
import { IoMenu, IoMoonSharp, IoSunny, IoLogOutOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { handleLogout } from '../../store/actions/authAction';
import {
  getAllBotSettings,
  // getThemeModeSettings,
} from 'store/actions/userSettingsAction';

import { SidebarContext } from '../../context/SidebarContext';

function Header() {
  const dispatch = useDispatch();

  const { toggleSidebar } = useContext(SidebarContext);
  const adminInfo = JSON.parse(localStorage.getItem('user_detail'));
  const { toggleMode } = useContext(WindmillContext);
  const [profileOpen, setProfileOpen] = useState(false);
  // const [notificationOpen, setNotificationOpen] = useState(false);
  const pRef = useRef();
  const nRef = useRef();

  const { themeMode } = useSelector((state) => state.settings);
  const themeModePreference = localStorage.getItem('mode');
  const mode = themeModePreference == 1 ? 'dark' : 'light';

  const handleLogOut = () => {
    dispatch(handleLogout());
  };
  useEffect(() => {
    if (themeModePreference == 0) {
      document.getElementById('settheme').classList.remove('dark');
      toggleMode();
    } else {
      document.getElementById('settheme').classList.add('dark');
      toggleMode();
    }
  }, [themeMode]);
  useEffect(() => {
    dispatch(getAllBotSettings());

    if (themeModePreference == 0) {
      document.getElementById('settheme').classList.remove('dark');
    } else {
      document.getElementById('settheme').classList.add('dark');
    }
    // toggleMode();
    const handleClickOutside = (e) => {
      if (!pRef?.current?.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
  }, [pRef, nRef, themeMode]);
  // const handleNotificationOpen = () => {
  //   setNotificationOpen(!notificationOpen);
  //   setProfileOpen(false);
  // };
  const handleProfileOpen = () => {
    setProfileOpen(!profileOpen);
    // setNotificationOpen(false);
  };

  const changeMode = () => {
    if (mode === 'dark') {
      localStorage.setItem('mode', 0);

      // dispatch(updateThemeModeSettings(0));
      document.getElementById('settheme').classList.remove('dark');
    } else {
      localStorage.setItem('mode', 1);

      document.getElementById('settheme').classList.add('dark');
    }
    toggleMode();
  };
  return (
    <header
      className="z-40 py-4 bg-gray-50 shadow-sm dark:bg-gray-800"
      style={{ marginBottom: '25px' }}
    >
      <div className="container flex items-center justify-between h-full px-6 mx-auto text-green-100 dark:text-green-100">
        {/* <!-- Mobile hamburger --> */}
        <button
          className="p-1 mr-5 -ml-1 rounded-md lg:hidden focus:outline-none"
          onClick={toggleSidebar}
          aria-label="Menu"
        >
          <IoMenu className="w-6 h-6" aria-hidden="true" />
        </button>
        <span />

        <ul className="flex justify-end items-center flex-shrink-0 space-x-6">
          {/* <!-- Theme toggler --> */}
          <li className="flex">
            <button
              className="rounded-md  focus:ring-black dark:focus:ring-white"
              aria-label="Toggle color mode"
            >
              <FaBell />
            </button>
          </li>
          <li className="flex">
            <button
              className="rounded-md   focus:ring-black dark:focus:ring-white"
              onClick={changeMode}
              id="togglemode"
              aria-label="Toggle color mode"
            >
              {mode === 'dark' ? (
                <IoSunny className="w-5 h-5" aria-hidden="true" />
              ) : (
                <IoMoonSharp className="w-5 h-5" aria-hidden="true" />
              )}
            </button>
          </li>

          {/* <!-- Notifications menu --> */}

          {/* <!-- Profile menu --> */}
          <li className="relative inline-block  text-left" ref={pRef}>
            <button
              title="Profil"
              className="rounded-full dark:bg-gray-500 bg-green-100 text-white h-8 w-8 font-medium mx-auto focus:gray-900 dark:focus:ring-white"
              onClick={handleProfileOpen}
            >
              {adminInfo?.image ? (
                <Avatar
                  className="align-middle"
                  src={`${adminInfo.image}`}
                  aria-hidden="true"
                />
              ) : (
                ''
              )}
            </button>
            {profileOpen && (
              <ul className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-900 ring-1 ring-black ring-opacity-5 focus:outline-none">
                <li className="justify-between font-serif font-medium py-2 pl-4 transition-colors duration-150 hover:bg-gray-100 text-gray-500 hover:text-3bc48d dark:text-[#9E9E9EFF] dark:hover:bg-gray-900 dark:hover:text-gray-200">
                  <a
                    href="/settings/edit-profile"
                    className="..."
                    style={{ textAlign: 'center', textDecoration: 'underline' }}
                  >
                    Hi ! {adminInfo.name ? <span>{adminInfo.name}</span> : ''}
                  </a>

                  {/* <Link to="/dashboard">
                      <span className="flex items-center text-sm">
                        <IoGridOutline
                          className="w-4 h-4 mr-3"
                          aria-hidden="true"
                        />
                        <span>Dashboard</span>
                      </span>
                    </Link> */}
                </li>
                {/* <li className="justify-between font-serif font-medium py-2 pl-4 transition-colors duration-150 hover:bg-gray-100 text-gray-500 hover:text-green-500 dark:text-[#9E9E9EFF] dark:hover:bg-gray-900 dark:hover:text-gray-200">
                    <Link to="/settings/edit-profile">
                      <span className="flex items-center text-sm">
                        <IoSettingsOutline
                          className="w-4 h-4 mr-3"
                          aria-hidden="true"
                        />
                        <span>Edit Profile</span>
                      </span>
                    </Link>
                  </li> */}
                <li
                  onClick={handleLogOut}
                  className="cursor-pointer justify-between font-serif font-medium py-2 pl-4 transition-colors duration-150 hover:bg-gray-100 text-gray-500 hover:text-3bc48d dark:text-[#9E9E9EFF] dark:hover:bg-gray-900 dark:hover:text-gray-200"
                >
                  <span className="flex items-center text-sm">
                    <IoLogOutOutline
                      className="w-4 h-4 mr-3"
                      aria-hidden="true"
                    />
                    <span>Log out</span>
                  </span>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
