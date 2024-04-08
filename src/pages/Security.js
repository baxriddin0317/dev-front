import React from 'react';
import PageTitle from 'components/Typography/PageTitle';
import 'styles/security.scss';
import { AiFillLock, AiOutlineMail } from 'react-icons/ai';
import { ImMobile } from 'react-icons/im';
import { Link } from 'react-router-dom';
import { BsKey } from 'react-icons/bs';
import { BiTimeFive } from 'react-icons/bi';
import { isMobile } from 'react-device-detect';

function Security() {
  return (
    <>
      <PageTitle>Security</PageTitle>
      <div className="flex gap-4 flex-row md:flex-col" id="security">
        <div className="w-full">
          <div className="shadow-lg dark:bg-gray-800 dark:text-gray-300 bg-white securitybox flex-col">
            <div className="flex items-center">
              <span>
                <AiFillLock size={isMobile ? 16 : 24} />
              </span>
              <h4>Password Settings</h4>
            </div>
            <p>You can change your password here</p>
            <Link to="/change-password" className="changebtn">
              Change
            </Link>
          </div>
          <div className="shadow-lg dark:bg-gray-800 dark:text-gray-300 bg-white securitybox flex-col">
            <div className="flex items-center">
              <span>
                <AiOutlineMail size={isMobile ? 16 : 24} />
              </span>
              <h4>Email Verification</h4>
            </div>
            <p>Link your email address for verification</p>
            <Link to="/change-password" className="changebtn">
              Change
            </Link>
          </div>
          <div className="shadow-lg dark:bg-gray-800 dark:text-gray-300 bg-white securitybox flex-col">
            <div className="flex items-center">
              <span>
                <ImMobile size={isMobile ? 16 : 24} />
              </span>
              <h4>Mobile Verification</h4>
            </div>
            <p>Link your mobile to receive SMS notification</p>
            <Link to="/change-password" className="changebtn">
              Link
            </Link>
          </div>
          <div className="shadow-lg dark:bg-gray-800 dark:text-gray-300 bg-white securitybox flex-col">
            <div className="flex items-center">
              <span>
                <BsKey size={isMobile ? 16 : 24} />
              </span>
              <h4>Google Authenticator</h4>
            </div>
            <p>Setup google authenticator for extra layer of security</p>
            <Link to="/2fa" className="changebtn">
              Setup
            </Link>
          </div>
          <div className="shadow-lg dark:bg-gray-800 dark:text-gray-300 bg-white securitybox flex-col">
            <div className="flex items-center">
              <span>
                <BiTimeFive size={isMobile ? 16 : 24} />
              </span>
              <h4>Security Activity</h4>
            </div>
            <p>Check your account activity</p>
            <Link to="/change-password" className="changebtn">
              Check
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Security;
