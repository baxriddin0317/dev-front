import React from 'react';
import '../styles/subscription.scss';
import { BsCheck } from 'react-icons/bs';
import SubscriptionMode from '../components/subscriptionmode';
import PageTitle from '../components/Typography/PageTitle';

function Subscription() {
  return (
    <>
      <PageTitle>Subscription</PageTitle>
      <SubscriptionMode />
      <div className="w-4/4 wResp1 subsBg">
        <div className="grid lg:grid-cols-4 gap-4 mb-8 sm:grid-cols-1 md:grid-cols-1">
          <div className="col-span-1">
            <div className="sm:col-span-4 md:col-span-4 bg-white dark:bg-gray-800 dark:text-gray-300 shadow-md p-3 text-center">
              <span className="font-bold text-sm pb-5">Premium</span>
              <h3 className="font-bold text-3xl colorgreen">$150</h3>
              <h6 className="font-normal text-xs pb-4 colorgreen">/Monthly</h6>
              <p className="font-normal text-xs customTxt pb-2">
                Demo text here
              </p>
              <p className="font-normal text-xs customTxt pb-2">
                Demo text will be here
              </p>
              <p className="font-normal text-xs customTxt pb-2">
                Demo text will be here
              </p>
              <p className="font-normal text-xs customTxt pb-2">
                Demo text will be here
              </p>
              <button className="goPrem text-xs font-bold">Go Premium</button>
            </div>
          </div>
          <div className="col-span-1">
            <div className="sm:col-span-4 md:col-span-4 bg-white dark:bg-gray-800 dark:text-gray-300 shadow-md p-3 text-center">
              <span className="font-bold text-sm pb-5">Basic</span>
              <h3 className="font-bold text-3xl colorgreen">$100</h3>
              <h6 className="font-normal text-xs pb-4 colorgreen">/Monthly</h6>
              <p className="font-normal text-xs customTxt pb-2">
                Demo text here
              </p>
              <p className="font-normal text-xs customTxt pb-2">
                Demo text will be here
              </p>
              <p className="font-normal text-xs customTxt pb-2">
                Demo text will be here
              </p>
              <p className="font-normal text-xs customTxt pb-2">
                Demo text will be here
              </p>
              <button className="goPrem text-xs font-bold">Go Premium</button>
            </div>
          </div>
          <div className="col-span-1">
            <div className="sm:col-span-4 md:col-span-4 bg-white dark:bg-gray-800 dark:text-gray-300 shadow-md p-3 text-center">
              <span className="font-bold text-sm pb-5">Starter</span>
              <h3 className="font-bold text-3xl colorgreen">$50</h3>
              <h6 className="font-normal text-xs pb-4 colorgreen">/Monthly</h6>
              <p className="font-normal text-xs customTxt pb-2">
                Demo text here
              </p>
              <p className="font-normal text-xs customTxt pb-2">
                Demo text will be here
              </p>
              <p className="font-normal text-xs customTxt pb-2">
                Demo text will be here
              </p>
              <p className="font-normal text-xs customTxt pb-2">
                Demo text will be here
              </p>
              <button className="goPrem text-xs font-bold">Go Premium</button>
            </div>
          </div>
          <div className="col-span-1">
            <div className="sm:col-span-4 md:col-span-4 bg-white dark:bg-gray-800 dark:text-gray-300 shadow-md p-3 text-center">
              <span className="font-bold text-sm pb-5">Small</span>
              <h3 className="font-bold text-3xl colorgreen">$10</h3>
              <h6 className="font-normal text-xs pb-4 colorgreen">/Monthly</h6>
              <p className="font-normal text-xs customTxt pb-2">
                Demo text here
              </p>
              <p className="font-normal text-xs customTxt pb-2">
                Demo text will be here
              </p>
              <p className="font-normal text-xs customTxt pb-2">
                Demo text will be here
              </p>
              <p className="font-normal text-xs customTxt pb-2">
                Demo text will be here
              </p>
              <button className="goPrem text-xs font-bold">Go Premium</button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-4/4 wResp1 subsBg checkbg">
        <div className="grid lg:grid-cols-4 gap-4 mb-5 sm:grid-cols-1 md:grid-cols-2 dark:text-gray-300">
          <div className="col-span-1">
            <h3 className="font-bold text-md ">All Account Included</h3>
          </div>
          <div className="col-span-1">
            <div className="imgCheck text-sm customTxt">
              <img src={BsCheck} alt="" />
              Take your desired plan
            </div>
            <div className="imgCheck text-sm customTxt">
              <img src={BsCheck} alt="" />
              Take your desired plan
            </div>
            <div className="imgCheck text-sm customTxt">
              <img src={BsCheck} alt="" />
              Take your desired plan
            </div>
          </div>
          <div className="col-span-1">
            <div className="imgCheck text-sm customTxt">
              <img src={BsCheck} alt="" />
              Take your desired plan
            </div>
            <div className="imgCheck text-sm customTxt">
              <img src={BsCheck} alt="" />
              Take your desired plan
            </div>
            <div className="imgCheck text-sm customTxt">
              <img src={BsCheck} alt="" />
              Take your desired plan
            </div>
          </div>
          <div className="col-span-1">
            <div className="imgCheck text-sm customTxt">
              <img src={BsCheck} alt="" />
              Take your desired plan
            </div>
            <div className="imgCheck text-sm customTxt">
              <img src={BsCheck} alt="" />
              Take your desired plan
            </div>
            <div className="imgCheck text-sm customTxt">
              <img src={BsCheck} alt="" />
              Take your desired plan
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Subscription;
