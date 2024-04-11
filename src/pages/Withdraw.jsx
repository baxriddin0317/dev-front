import PageTitle from 'components/Typography/PageTitle';
import CoinSelect from 'components/withdraw/CoinSelect';
import Recent from 'components/withdraw/Recent';
import Values from 'components/withdraw/Values';
import WithdrawInfo from 'components/withdraw/WithdrawInfo';
import React, { useEffect, useState } from 'react';
import { BsFillCheckCircleFill } from 'react-icons/bs';

function Withdraw() {
  const [toAddres, setToAddres] = useState('');
  const [addres, setAddres] = useState('');
  const [timelineStep, setTimelineStep] = useState(0);

  useEffect(() => {
    if(timelineStep > 0){
      if(toAddres.length > 0 && addres.length > 0){
        setTimelineStep(2);
      }else{
        setTimelineStep(1);
      }
    }
  }, [toAddres, addres])

  const handleSubmit = (event) => {
      event.preventDefault();
      
      setTimelineStep(3);
  };
  return (
    <div className="w-full mb-[1rem] sm:w-full dark:border-gray-400 rounded-lg ring-opacity-5">
      <PageTitle>Withdraw</PageTitle>
      <div className="grid md:grid-cols-2 gap-4 lg:gap-8">
        <div className="flex items-start gap-3">
          <div className="h-full w-0.5 bg-gray-800"></div>
          <form className="flex-1 space-y-6 pb-10">
            <div className="relative">
              <BsFillCheckCircleFill className={`${timelineStep >= 1 ? "text-blue-500" : "text-gray-600"} absolute z-20 bg-white -left-6 text-xl w-5 h-5 rounded-full overflow-hidden `} />
              <CoinSelect setTimelineStep={setTimelineStep} />
            </div>
            <div className="relative">
              <BsFillCheckCircleFill className={`${timelineStep >= 2 ? "text-blue-500 " : "text-gray-600"} absolute z-20 bg-white -left-6 text-xl w-5 h-5 rounded-full overflow-hidden `} />
              <div className="pl-2 space-y-2">
                <h3 className="text-sm font-bold text-gray-700 dark:text-white">
                  Withdraw to
                </h3>
                <div className="flex items-center gap-4 w-full pb-1 border-b border-gray-600 focus-within:border-blue-500">
                  <p className="text-black dark:text-white">Address</p>
                  <input 
                    className="w-full text-sm dark:text-white flex-1 bg-transparent outline-none" 
                    onChange={(e) => setToAddres(e.target.value)}
                    disabled={timelineStep < 1}
                    type="text" 
                    placeholder="Metronix User" 
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="address" className="text-sm text-gray-700 dark:text-gray-500 font-bold">
                    Address
                  </label>
                  <input 
                    className="w-full text-sm dark:text-white outline-none bg-gray-50 dark:!bg-gray-800 px-3 py-2 rounded" 
                    type="text" 
                    onChange={(e) => setAddres(e.target.value)}
                    disabled={timelineStep < 1}
                    id="address" 
                    placeholder="Please enter your Tron withdraw address"
                  />
                </div>
                <Values />
              </div>
            </div>
          </form>
        </div>
        <WithdrawInfo />
      </div>
      <Recent />
    </div>
  );
}

export default Withdraw;