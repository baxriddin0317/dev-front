import React from 'react';
import { MdSecurity, MdOutlineAttachMoney } from 'react-icons/md';
import { ImUserTie } from 'react-icons/im';
import { BsLayoutWtf } from 'react-icons/bs';
import { FaFileExport } from 'react-icons/fa';

import { Link } from 'react-router-dom';
import PageTitle from '../components/Typography/PageTitle';

function Settings() {
  return (
    <>
      <PageTitle>Settings</PageTitle>
      <div className="container px-5">
        <div className="grid lg:grid-cols-2 gap-10  mb-10 sm:grid-cols-1 md:grid-cols-1">
          <Link to="/settings/edit-profile">
            <div className="flex justify-between items-center w-full shadow-lg col-span-1 p-5 mx-auto bg-white  dark:bg-gray-800 dark:text-gray-300 rounded-lg">
              <div>
                <h2 className="font-bold text-xl">Edit Profile</h2>

                <p className="text-xs text-gray-500">Change your details</p>
              </div>
              <ImUserTie size={40} />
            </div>
          </Link>

          <Link to="/settings/preferences">
            <div className="flex justify-between items-center w-full shadow-lg col-span-1 p-5 mx-auto bg-white  dark:bg-gray-800 dark:text-gray-300 rounded-lg">
              <div>
                <h2 className="font-bold text-xl">Preferences</h2>

                <p className="text-xs text-gray-500">Customize your UI</p>
              </div>
              <BsLayoutWtf size={40} />
            </div>
          </Link>
        </div>
        <div className="grid lg:grid-cols-2 gap-10  mb-10 sm:grid-cols-1 md:grid-cols-1">
          <Link to="/settings/security">
            <div className="flex justify-between items-center w-full shadow-lg col-span-1 p-5 mx-auto bg-white  dark:bg-gray-800 dark:text-gray-300 rounded-lg">
              <div>
                <h2 className="font-bold text-xl">Security</h2>

                <p className="text-xs text-gray-500">Manage your security</p>
              </div>
              <MdSecurity size={40} />
            </div>
          </Link>

          <div className="flex justify-between items-center w-full shadow-lg col-span-1 p-5 mx-auto bg-white  dark:bg-gray-800 dark:text-gray-300 rounded-lg">
            <div>
              <h2 className="font-bold text-xl">Data Export</h2>
              <p className="text-xs text-gray-500">Export your data</p>
            </div>
            <FaFileExport size={40} />
          </div>
        </div>
        <div className="grid lg:grid-cols-2 gap-10  mb-10 sm:grid-cols-1 md:grid-cols-1">
          <Link to="/settings/subscription-history">
            <div className="flex justify-between items-center w-full shadow-lg col-span-1 p-5 mx-auto bg-white  dark:bg-gray-800 dark:text-gray-300 rounded-lg">
              <div>
                <h2 className="font-bold text-xl">Subscription History</h2>

                <p className="text-xs text-gray-500">
                  Check your subscription history
                </p>
              </div>
              <MdOutlineAttachMoney size={40} />
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Settings;
