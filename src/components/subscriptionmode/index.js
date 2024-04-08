import '../../styles/subscription.scss';
import React from 'react';

function SubscriptionMode({ setPlan, plan }) {
  return (
    <div className="w-60 flex relative p-0 bg-green-100  leading-[3rem] rounded-[3rem] mx-auto mb-7">
      <input
        type="radio"
        id="switchMonthly"
        name="switchPlan"
        value="Monthly"
        checked={plan}
        className="hidden absolute top-0"
        onChange={() => {
          setPlan(true);
        }}
      />
      <input
        type="radio"
        id="switchYearly"
        name="switchPlan"
        value="Yearly"
        className="hidden absolute top-0"
        onChange={() => {
          setPlan(false);
        }}
      />
      <label
        htmlFor="switchMonthly"
        className="w-2/4 p-0 m-0 text-center cursor-pointer text-gray-50"
      >
        Monthly
      </label>
      <label
        htmlFor="switchYearly"
        className="w-2/4 p-0 m-0 text-center cursor-pointer text-gray-50"
      >
        Half Yearly
      </label>
      <div
        className={`                   
              ${
                plan ? 'translate-x-[0%]' : 'translate-x-[100%]'
              }  absolute top-0 bottom-0 w-2/4 p-[0.15rem] z-[3] ease-[cubic-bezier(0.77,0,0.175,1)] duration-[0.5s] `}
      >
        <div className="rounded-[3rem] bg-gray-50 text-green-100 h-full dark:bg-grey-900 dark:text-green-100">
          {/* <div className="w-full text-center opacity-0 block text-[#046c4e] transition-opacity duration-[0.2s] ease-[cubic-bezier(0.77,0,0.175,1)] delay-[0.125s] will-change-[opacity] absolute top-0 left-0">Monthly</div> */}
          <div className="text-center">{plan ? 'Monthly' : ' Half Yearly'}</div>
        </div>
      </div>
    </div>
  );
}

export default SubscriptionMode;
