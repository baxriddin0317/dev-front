/* eslint-disable radix */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect } from 'react';
import { TbRobotOff, TbPlugConnected } from 'react-icons/tb';
import { AiOutlineRobot } from 'react-icons/ai';
import { BiWallet } from 'react-icons/bi';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import '../styles/darkmode.scss';
import {
  fetchBotList,
  fetchBalance,
  getAllPrecision,
} from '../store/actions/createBotAction';
import { getKeysData } from 'store/actions/listKeysAction';
import { fetchBidErrorData } from 'store/actions/errorOrderAction';
import Table from '../components/table/tableView';
import ComboBox from 'components/combobox/ComboBox';
import {
  getSubscriptionHistory,
  getActiveSubscriptions,
} from 'store/actions/subscriptionAction';
import { XMarkIcon } from '@heroicons/react/20/solid';

function Dashboard() {
  const [called, setCalled] = useState(false);
  const dispatch = useDispatch();

  const allKeysData = useSelector((state) => state.listKeys);
  const { allKeys } = allKeysData;
  const exchanges = allKeys.map((x) => x.exchange);

  const [exchange, setExchange] = useState('');

  if (exchanges.length != 0 && !called) {
    setExchange(exchanges[0]);
    dispatch(fetchBalance(exchanges[0]));
    dispatch(getAllPrecision(exchanges[0]));
    setCalled(true);
  }

  useEffect(() => {
    dispatch(getKeysData());
    dispatch(fetchBotList());
    dispatch(getSubscriptionHistory());
    dispatch(fetchBidErrorData());
    dispatch(getActiveSubscriptions());
  }, []);

  const subscriptionData = useSelector((state) => state.subscriptionData);
  const { activeSubscription } = subscriptionData;
  const marketData = useSelector((state) => state.createBot);
  const { botErrorData } = useSelector((state) => state.errorBids);
  const countErrors = botErrorData.length;
  const lastHourError = botErrorData.filter(
    (bid) => bid.updatedAt > new Date() - 3600000
  ).length;

  let balanceChart = Object.keys(marketData.balance).map((key) => {
    const percision =
      `${key}/USDT` in marketData.allprecision
        ? marketData.allprecision[`${key}/USDT`].coinPrecision
        : 2;
    const dollar =
      `${key}/USDT` in marketData.allprecision
        ? marketData.allprecision[`${key}/USDT`].lastprice
        : 1;
    return {
      name: key,
      y: parseFloat(
        (marketData.balance[key].total * dollar).toFixed(percision)
      ),
      total: marketData.balance[key].total.toFixed(percision),
      free: marketData.balance[key].free.toFixed(percision),
      used: marketData.balance[key].used.toFixed(percision),
      fiat: dollar,
    };
  });

  const updateBalance = (e) => {
    dispatch(fetchBalance(e));
    dispatch(getAllPrecision(e));
    balanceChart = Object.keys(marketData.balance).map((key) => {
      const percision =
        `${key}/USDT` in marketData.allprecision
          ? marketData.allprecision[`${key}/USDT`].coinPrecision
          : 2;
      const dollar =
        `${key}/USDT` in marketData.allprecision
          ? marketData.allprecision[`${key}/USDT`].lastprice
          : 1;
      return {
        name: key,
        y: parseFloat(
          (marketData.balance[key].total * dollar).toFixed(percision)
        ),
        total: marketData.balance[key].total.toFixed(percision),
        free: marketData.balance[key].free.toFixed(percision),
        used: marketData.balance[key].used.toFixed(percision),
        fiat: dollar,
      };
    });
  };

  const columns = [
    {
      Header: 'Coin',
      accessor: 'name',
      isVisible: true,
      Cell: ({ cell }) => (
        <>
          <p>{cell.value}</p>
        </>
      ),
    },
    {
      Header: 'Total',
      accessor: 'total',
      isVisible: true,
      Cell: ({ cell }) => (
        <>
          <p>
            {cell.value} ({(cell.row.original.fiat * cell.value).toFixed(2)} $)
          </p>
        </>
      ),
    },
    {
      Header: 'Free',
      accessor: 'free',
      isVisible: true,
      Cell: ({ cell }) => (
        <>
          <p>
            {cell.value} ({(cell.row.original.fiat * cell.value).toFixed(2)} $)
          </p>
        </>
      ),
    },
    {
      Header: 'Used',
      accessor: 'used',
      isVisible: true,
      Cell: ({ cell }) => (
        <>
          <p>
            {cell.value} ({(cell.row.original.fiat * cell.value).toFixed(2)} $)
          </p>
        </>
      ),
    },
  ];

  const history = useHistory();
  const [isVisible, setIsVisible] = useState(true);

  const hideElement = () => {
    setIsVisible(false);
  };
  return (
    <div className="w-full mb-[1rem] sm:w-full overflow-hidden dark:border-gray-400 rounded-lg  ring-opacity-5">
      {/* <PageTitle>Dashboard</PageTitle> */}
      <div
        className={`flex items-center gap-x-6 bg-amber-500 px-6 py-2.5 sm:px-3.5 sm:before:flex-1 ${
          isVisible ? 'block' : 'hidden'
        }`}
      >
        <p className="text-sm leading-6 text-gray-900">
          <a
            href="https://www.metronix-trading.com/2023/10/06/coin-of-the-month-kaspa-kas/"
            target='"blank'
          >
            <strong className="font-semibold">
              Discover the New in Metronix - &nbsp;Coin of the Month&nbsp;
              <span aria-hidden="true">&rarr;</span>
            </strong>
          </a>
        </p>
        <div className="flex flex-1 justify-end">
          <button
            type="button"
            className="-m-3 p-3 focus-visible:outline-offset-[-4px]"
            onClick={hideElement}
          >
            <span className="sr-only">Dismiss</span>
            <XMarkIcon className="h-5 w-5 text-white" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className=" gap-4 flex flex-row md:flex-col">
        <div className="w-full">
          <div className="grid lg:grid-cols-2 gap-4 mb-5 sm:grid-cols-1 md:grid-cols-1">
            <div
              className="col-span-1 cursor-pointer"
              onClick={() => {
                history.push('/errors-list');
              }}
            >
              <div className="rounded sm:col-span-4 md:col-span-8 bg-gray-50 dark:bg-gray-800 dark:text-gray-300 shadow-md p-[0.5rem] ">
                <div className="flex justify-between items-center font-semibold">
                  <span className="text-red-600 text-[18px]">Errors</span>
                  <h3 className="font-bold text-[18px] text-red-600 flex-auto ml-4">
                    {countErrors}
                  </h3>
                  <span className=" rounded-full w-10 h-10 flex items-center justify-center">
                    <TbRobotOff color="red" />
                  </span>
                </div>
                <p className="font-normal text-xs">
                  <span className="font-semibold text-2ac1c3">
                    {lastHourError} error(s)
                  </span>
                  &nbsp;in last 1 hour
                </p>
              </div>
            </div>
            <div
              className="col-span-1 cursor-pointer"
              onClick={() => {
                history.push('/list-bot');
              }}
            >
              <div className="rounded sm:col-span-4 md:col-span-8 bg-gray-50 dark:bg-gray-800 dark:text-gray-300 shadow-md p-[0.5rem] ">
                <div className="flex justify-between items-center font-semibold">
                  <span className="text-green-100 text-[18px] ">
                    Active Bots
                  </span>
                  <h3 className="font-bold text-[18px] text-green-100 flex-auto ml-4">
                    {marketData.botList?.length}
                  </h3>
                  <span className="rounded-full w-10 h-10 flex items-center justify-center">
                    <AiOutlineRobot color="#3bc48d" />
                  </span>
                </div>
                {/* <h3 className="font-bold text-2xl pb-2 text-[#31c48d]">
                  {marketData.botList?.length}
                </h3> */}
                <p className="font-normal text-xs">
                  <span className="font-semibold text-2ac1c3">
                    {marketData.botList?.length} total bots
                  </span>
                </p>
              </div>
            </div>
            {/* <div className="col-span-1">
              <div className="rounded sm:col-span-4 md:col-span-4 dark:bg-gray-800 dark:text-gray-300 shadow-md p-3 bg-white">
                <div className="flex justify-between items-center font-semibold">
                  <span className="text-[#3BC48D]">Portfolio</span>
                  <span className="cardIcn3">
                    <BsCurrencyDollar color="green" />
                  </span>
                </div>
                <h3 className="font-bold text-2xl pb-2 text-[#3BC48D]">
                  Coming Soon
                </h3>
                <p className="font-normal text-xs">
                  <span className="percentColor3 text-red-500">$5,000 </span>
                  total used till date
                  &nbsp;
                </p>
              </div>
            </div> */}
          </div>

          <div className="grid lg:grid-cols-2 gap-4 mb-5 sm:grid-cols-1 md:grid-cols-1">
            <div
              className="col-span-1 cursor-pointer"
              onClick={() => {
                history.push('/settings/subscription-history');
              }}
            >
              <div className="rounded sm:col-span-4 md:col-span-8 bg-gray-50 dark:bg-gray-800 dark:text-gray-300 shadow-md p-[0.5rem] ">
                <div className="flex justify-between items-center font-semibold">
                  <span className="text-green-100">Subscription</span>
                  <span className="w-10 h-10 flex items-center justify-center">
                    <BiWallet color="#3bc48d" />
                  </span>
                </div>
                {activeSubscription &&
                  activeSubscription.length > 0 &&
                  activeSubscription.map((activeSub) => (
                    <div className="flex items-center justify-between">
                      <h6 className="font-bold text-2ac1c3 mb-0">
                        {activeSub.name} Sub
                      </h6>{' '}
                      {activeSub.daysLeft <= 2 && (
                        <span className="font-semibold text-2ac1c3 text-xs mt-1">
                          {activeSub.daysLeft} day(s) left
                        </span>
                      )}
                      {activeSub.daysLeft > 2 && (
                        <span className="font-normal text-xs mt-1">
                          {activeSub.daysLeft} day(s) left
                        </span>
                      )}
                    </div>
                  ))}

                {!activeSubscription && (
                  <h6 className="font-bold  pb-2 text-green-100 mb-0">
                    No Active Subscriptions
                  </h6>
                )}
              </div>
            </div>
            <div
              className="col-span-1 cursor-pointer"
              id="apistatus"
              onClick={() => {
                history.push('/myexchange');
              }}
            >
              <div className="rounded sm:col-span-4 md:col-span-8 bg-gray-50 dark:bg-gray-800 dark:text-gray-300 shadow-md p-[0.5rem] ">
                <div className="flex justify-between items-center font-semibold">
                  <span className="text-green-100">API Status</span>
                  <span className="w-10 h-10 flex items-center justify-center">
                    <TbPlugConnected color="#3bc48d" />
                  </span>
                </div>
                <div className="font-normal text-xs">
                  {allKeys.length > 0 ? (
                    allKeys.map((keys) => (
                      <>
                        {keys.connected === '2' && (
                          <div className="mt-1">
                            <span className="font-semibold text-2ac1c3">
                              {keys.exchange.toUpperCase()}
                            </span>
                            <span> connected</span>
                          </div>
                        )}
                        {keys.connected === '0' && (
                          <div className="mt-1">
                            <span className="font-semibold text-2ac1c3">
                              {keys.exchange.toUpperCase()}
                            </span>
                            <span> Not connected</span>
                          </div>
                        )}
                      </>
                    ))
                  ) : (
                    <h3 className="font-bold pb-2">Loading...</h3>
                  )}
                </div>
              </div>
            </div>
            {/* <div className="col-span-1">
              <div className="rounded sm:col-span-4 md:col-span-4 dark:bg-gray-800 dark:text-gray-300 shadow-md p-3 bg-white">
                <div className="flex justify-between items-center font-semibold">
                  <span className="text-[#3BC48D]">This block is</span>
                  <span className="cardIcn3">
                    <BsClock color="green" />
                  </span>
                </div>
                <h3 className="font-bold text-2xl pb-2 text-[#3BC48D]">
                  Coming Soon
                </h3>
                <p className="font-normal text-xs">
                  <span className="percentColor3 text-red-500">Test</span>
                  &nbsp;
                </p>
              </div>
            </div> */}
          </div>

          {/* <div className="grid lg:grid-cols-3 gap-4 sm:grid-cols-1 md:grid-cols-1">
            <div className="lg:col-span-2 md:col-span-2 sm:col-span-3">
              <div
                className={`sm:col-span-4 md:col-span-4 dark:bg-gray-800 dark:text-gray-300 shadow-md p-3 bg-white`}
              >
                <div className="flex justify-between items-center font-semibold">
                  <span className="text-[#3BC48D]">Profits</span>
                  <span className="cardIcn2">
                    <BsCurrencyBitcoin color="green" />
                  </span>
                </div>
                <div>
                  <ReactHighcharts config={configPrice}></ReactHighcharts>
                </div>
              </div>
            </div>
            <div className="lg:col-span-1 md:col-span-2 sm:col-span-3">
              <div
                className={`sm:col-span-4 md:col-span-4 dark:bg-gray-800 dark:text-gray-300 shadow-md p-3 bg-white`}
              >
                <div className="flex justify-between items-center font-semibold">
                  <span className="text-[#3BC48D]">Coins</span>
                  <span className="cardIcn2">
                    <GiTwoCoins color="green" />
                  </span>
                </div>
                <div id="piechart">
                  <ReactHighcharts config={pieConfig}></ReactHighcharts>
                </div>
              </div>
            </div>
          </div> */}
        </div>
        {/* <div className="w-1/4 wResp2">
          <div className="rounded sm:col-span-4 md:col-span-4 dark:bg-gray-800 dark:text-gray-300 shadow-md p-3 bg-white">
            <div className="flex justify-between items-center font-semibold">
              <span className="text-[#3BC48D]">Balance</span>
              <span className="cardIcn2">
                <GiTwoCoins color="green" />
              </span>
            </div>
            <div id="piechart">
              <ReactHighcharts config={pieConfig} />
            </div>
          </div>
        </div> */}
      </div>
      <div className="rounded sm:col-span-4 md:col-span-8 bg-gray-50 dark:bg-gray-800 dark:text-gray-300 shadow-md p-[0.5rem] ">
        <h1 className="text-[15px] font-bold text-gray-900 dark:text-gray-300">
          Balance
        </h1>
        {exchange != '' && (
          <div>
            <div className="mb-4 basis-[24%]">
              <ComboBox
                name="exchanges"
                selectedValue={exchange.toUpperCase()}
                isSearchable={false}
                id="exchanges"
                // styles={customStyles}
                dataList={exchanges.map((x) => ({
                  label: x.toUpperCase(),
                  value: x,
                }))}
                value={{
                  label: exchange.toUpperCase(),
                  value: exchange,
                }}
                onChange={(selectedOption) => {
                  setExchange(selectedOption.value);
                  updateBalance(selectedOption.value);
                }}
              />
            </div>
          </div>
        )}
      </div>
      <div className="relative">
        {balanceChart.length < 1 && exchange !== '' && (
          <div
            role="status"
            className="absolute -translate-x-1/2 -translate-y-1/2 left-2/4 top-2/4  bg-gray-50 dark:bg-gray-800 dark:text-gray-300"
          >
            <svg
              aria-hidden="true"
              className="w-12 h-12 mr-2 text-gray-300 animate-spin dark:text-gray-900 fill-green-100"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          </div>
        )}
        <Table columns={columns} data={balanceChart} paginationVisible />
      </div>
      {exchange === '' && (
        <div id="darkmode" className="py-5">
          <p
            style={{ textAlign: 'center' }}
            className="font-semibold text-gray-900 dark:text-gray-300"
          >
            No exchange available. Connect now,
          </p>
          <a
            className="font-semibold text-cyan-500 dark:text-green-100"
            href="/myexchange"
          >
            click here!
          </a>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
