import React, { useEffect, useState, useContext } from 'react';
import Table from '../components/table/tableView';
import { WindmillContext, Modal, ModalBody } from '@windmill/react-ui';
import { Formik, ErrorMessage } from 'formik';
import { BsThreeDots } from 'react-icons/bs';
import 'react-dropdown/style.css';
import { useHistory, Link } from 'react-router-dom';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker from 'react-datepicker';
import { cancelBot } from '../store/actions/cancelBotAction';
import {
  getMarkets,
  fetchBotList,
  getAllPrecision,
} from '../store/actions/createBotAction';
import Exchanges from '../utils/bot/Exchanges';
import { getAllBotSettings } from '../store/actions/userSettingsAction';
import ComboBox from 'components/combobox/ComboBox';

const Type = [
  { value: 'buy', label: 'Buy' },
  { value: 'sell', label: 'Sell' },
];

const Option = [
  { value: 1, label: 'Market' },
  { value: 2, label: 'Coin' },
  { value: 3, label: 'Mix' },
  { value: 4, label: 'Coin+' },
  { value: 5, label: 'Mix+' },
];

function ListBot() {
  const botListSettings = useSelector((state) => state.settings);
  const colData = botListSettings.botListSettings;
  const [botID, setBotID] = useState(null);
  const [resetTrue, setResetTrue] = useState(false);
  const history = useHistory();
  useEffect(() => {
    setResetTrue(false);
  }, [resetTrue]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  function openModal(e) {
    setIsModalOpen(true);
    setBotID(e);
  }
  function closeModal() {
    setIsModalOpen(false);
  }

  const valueToString = (meox) => {
    let value = meox;
    if (typeof meox == 'string') {
      value = parseFloat(meox);
    }
    if (value / 1000000 >= 1) {
      return `${(value / 1000000).toFixed(0)}M`;
    }
    if (value / 1000 >= 1) {
      return `${(value / 1000).toFixed(2)}K`;
    }

    return meox;
  };

  const { mode } = useContext(WindmillContext);
  const columns = [
    {
      Header: 'Profit',
      accessor: 'profit',
      isVisible: true,
      Cell: ({ cell }) => {
        return (
          <>
            <p
              style={{
                color:
                  cell.row.original.profit_24h <= 0
                    ? ''
                    : cell.row.original.profit_24h > 1
                    ? '#3bc48d'
                    : '#FFA500',
              }}
            >
              {Number(cell.value).toFixed(2)}%
            </p>
            <p
              style={{
                color:
                  cell.row.original.profit_24h <= 0
                    ? ''
                    : cell.row.original.profit_24h > 1
                    ? '#3bc48d'
                    : '#FFA500',
              }}
            >
              {/* {Number(cell.row.original.profit_24h).toFixed(2)}%/24h */}
            </p>
          </>
        );
      },
    },
    {
      Header: 'Pair',
      accessor: 'pair',
      isVisible: true,
      isSticky: true,
      Cell: ({ cell }) => (
        <>
          <p>{cell.value}</p>
          <p className="text-green-100">
            {Number(cell.row.original.yearly_prof).toFixed(2)}% APY
          </p>
        </>
      ),
    },

    {
      Header: 'Date',
      accessor: 'date',
      Cell: ({ cell }) => (
        <>
          <p>{moment(cell.value).format('DD-MM-YYYY')}</p>
          <p className="text-green-100 whitespace-nowrap">
            {cell.row.original.last_bid_date
              ? moment(cell.row.original.last_bid_date).format('DD-MM-YYYY')
              : '00-00-0000'}
          </p>
        </>
      ),
    },

    {
      Header: 'Round',
      accessor: 'round',
    },
    {
      Header: 'Exchange',
      accessor: 'exchange',
      isVisible: true,
      Cell: ({ cell }) => (
        <>
          <p>{cell.value}</p>
          <p className="text-green-100">{cell.row.original.actual_price}</p>
        </>
      ),
    },
    {
      Header: 'Actual%',
      accessor: 'actual_percentage',
      isVisible: false,
      Cell: ({ cell }) => (
        <>
          <p>{Number(cell.value).toFixed(2)} %</p>
          <p
            style={{
              color:
                cell.row.original.actual_price > cell.row.original.start &&
                cell.row.original.actual_price < cell.row.original.end
                  ? '#3bc48d'
                  : cell.row.original.actual_price < cell.row.original.start &&
                    cell.row.original.actual_price > cell.row.original.end
                  ? '#3bc48d'
                  : '#FFA500',
            }}
          >
            {cell.row.original.actual_price > cell.row.original.start &&
            cell.row.original.actual_price < cell.row.original.end
              ? 'Aktiv'
              : cell.row.original.actual_price < cell.row.original.start &&
                cell.row.original.actual_price > cell.row.original.end
              ? 'Aktiv'
              : 'Inaktiv'}
          </p>
        </>
      ),
    },
    {
      Header: 'Amount',
      accessor: 'amount',
      Cell: ({ cell }) => <p>{valueToString(cell.value)}</p>,
    },
    {
      Header: 'Lot',
      accessor: 'lot',
      Cell: ({ cell }) => (
        <>
          <p>{cell.value}</p>
          <p className="text-green-100">
            {(
              Math.round(
                (parseFloat(cell.row.original.step) /
                  parseFloat(cell.row.original.start)) *
                  100 *
                  parseFloat(cell.row.original.lot) *
                  100
              ) / 100
            ).toFixed(0)}
            %
          </p>
        </>
      ),
    },
    {
      Header: 'Start',
      accessor: 'start',
      isVisible: false,
      Cell: ({ cell }) => (
        <>
          <p>{valueToString(cell.value)}</p>
          <p className="text-green-100">
            {valueToString(cell.row.original.end)}
          </p>
        </>
      ),
    },
    {
      Header: 'Options',
      accessor: 'options',
      isVisible: true,
    },
    {
      Header: 'Step',
      accessor: 'step',
      isVisible: true,
    },
    {
      Header: 'Side',
      accessor: 'side',
      isVisible: true,
    },
    {
      Header: 'Bot ID',
      accessor: 'bot_id',
      Cell: ({ cell }) => (
        <Link to={`/bot-status/${cell.value}`}>{cell.value}</Link>
      ),
    },
    {
      Header: 'Status',
      accessor: 'paused',
      Cell: ({ cell }) => (
        <p style={{ color: cell.value == 1 ? '#FFA500' : '#3bc48d' }}>
          {cell.value == 1 ? 'Paused' : 'Running'}
        </p>
      ),
    },
    {
      Header: 'Actions',
      disableSortBy: true,
      accessor: 'actions',
      Cell: ({ cell }) => (
        <div className="actionmenu">
          <BsThreeDots
            onClick={() => {
              openModal(cell.row.original.bot_id);
            }}
            className="actiondot"
            size="25"
          />
        </div>
      ),
    },
  ];
  const dispatch = useDispatch();
  const marketData = useSelector((state) => state.createBot);
  const { botList, allprecision, loading } = marketData;

  const newColArr = [];
  columns.map((col, i) => {
    if (col.Cell) {
      newColArr.push({
        ID: col.ID,
        isVisible: colData[i]?.isVisible,
        accessor: col.accessor,
        Cell: col.Cell && col.Cell,
        Header: col.Header,
        isSticky: col.isSticky,
      });
    } else {
      newColArr.push({
        ID: col.ID,
        isVisible: colData[i]?.isVisible,
        accessor: col.accessor,
        Header: col.Header,
      });
    }
  });

  useEffect(() => {
    dispatch(getMarkets());
    dispatch(fetchBotList());
    dispatch(getAllBotSettings());
  }, [dispatch]);

  return (
    <div className="w-full sm:w-full overflow-hidden dark:border-gray-400 rounded-lg  ring-opacity-5">
      <Modal isOpen={isModalOpen} onClose={closeModal} id="botmenu">
        <ModalBody>
          <ul>
            <li
              onClick={() => {
                history.push(`/bot-status/${botID}`);
              }}
            >
              <Link to={`/bot-status/${botID}`}>View Status</Link>
            </li>
            <li
              onClick={() => {
                history.push(`/bot-history/${botID}`);
              }}
            >
              <Link to={`/bot-history/${botID}`}>View History</Link>
            </li>
            <li>Share</li>
            <li
              onClick={() => {
                history.push('/errors-list');
              }}
            >
              <Link to="/errors-list">Errors List</Link>
            </li>
            <li
              onClick={() => {
                let x;
                if (window.confirm('Are you sure to cancel bot?') == true) {
                  dispatch(cancelBot(botID)).then(() => {
                    setIsModalOpen(false);
                  });
                }
                return x;
              }}
            >
              <button>Cancel</button>
            </li>
          </ul>
        </ModalBody>
      </Modal>
      <Formik
        validateOnChange={false}
        validateOnBlur={false}
        initialValues={{
          exchange: '',
          market: '',
          coin: '',
          side: '',
          round: '',
          option: '',
          start: '',
          end: '',
          search: '',
        }}
        onSubmit={(values) => {
          const copy = {};
          Object.assign(copy, values);
          Object.keys(copy).forEach(function (key) {
            const data = copy[key];
            if (typeof data !== 'string') {
              if (data instanceof Date) {
                copy[key] = data.valueOf();
              } else if (!Array.isArray(data)) {
                copy[key] = data.value;
              }
            }
          });
          const splitData = copy?.market?.split('/');

          const urlString = new URLSearchParams({
            ...copy,
            coin: splitData[0] || '',
            market: splitData[1] || '',
          }).toString();
          dispatch(fetchBotList(urlString));
        }}
      >
        {({ values, handleBlur, handleSubmit, setFieldValue, resetForm }) => {
          return (
            <div className="md:w-full lg:w-full mt-[1rem]  sm:w-full  dark:border-gray-400 rounded-lg">
              <form
                className="bg-gray-50 relative z-10 dark:bg-gray-800  shadow-md rounded px-8 py-[0.5rem] mb-4"
                onSubmit={handleSubmit}
                id="listbot"
              >
                <div className="flex justify-between filter">
                  <div
                    className="mb-4 dark:text-green-100"
                    style={{ flexBasis: '24%' }}
                  >
                    <label htmlFor="exchange">Exchange</label>
                    <ComboBox
                      title=""
                      id="exchange"
                      name="exchange"
                      selectedValue={values.exchange.label}
                      className="dark:bg-gray-800"
                      setField={setFieldValue}
                      dataList={Exchanges}
                      reset={resetTrue}
                      onChange={(selectedOption) => {
                        const exchange = selectedOption.value.toLowerCase();
                        dispatch(getAllPrecision(exchange));
                        setFieldValue('exchange', selectedOption, false);
                        setFieldValue('market', '', false);
                        setFieldValue('coin', [], false);
                        handleSubmit();
                      }}
                      onBlur={() => {
                        handleBlur({ target: { name: 'exchange' } });
                      }}
                    />
                  </div>
                  <div
                    className="mb-4 dark:text-green-100"
                    style={{ flexBasis: '24%' }}
                  >
                    <label htmlFor="option">Market</label>
                    <ComboBox
                      title=""
                      name="market"
                      id="market"
                      isNoLabel
                      setField={setFieldValue}
                      dataList={allprecision}
                      selectedValue={values.market}
                      reset={resetTrue}
                      onChange={(selectedOption) => {
                        setFieldValue('coin', [], false);
                        setFieldValue('market', selectedOption, false);
                        handleSubmit();
                      }}
                      onBlur={() => {
                        handleBlur({ target: { name: 'market' } });
                      }}
                    />
                  </div>
                  <div
                    className="mb-4 dark:text-green-100"
                    style={{ flexBasis: '24%' }}
                  >
                    <label htmlFor="option">Option</label>
                    <ComboBox
                      title=""
                      name="option"
                      id="option"
                      setField={setFieldValue}
                      reset={resetTrue}
                      dataList={Option}
                      selectedValue={values.option.label}
                      onChange={(selectedOption) => {
                        setFieldValue('option', selectedOption, false);
                        handleSubmit();
                      }}
                      onBlur={() => {
                        handleBlur({ target: { name: 'option' } });
                      }}
                    />
                  </div>
                  <div
                    className="mb-4 dark:text-green-100"
                    style={{ flexBasis: '24%' }}
                  >
                    <label htmlFor="side">Side</label>
                    <ComboBox
                      title=""
                      name="side"
                      id="side"
                      setField={setFieldValue}
                      dataList={Type}
                      reset={resetTrue}
                      selectedValue={values.side.label}
                      onChange={(selectedOption) => {
                        setFieldValue('side', selectedOption, false);
                        handleSubmit();
                      }}
                      onBlur={() => {
                        handleBlur({ target: { name: 'side' } });
                      }}
                    />
                    <ErrorMessage
                      name="side"
                      component="p"
                      className="mt-2 text-sm text-red-600"
                    />
                  </div>
                </div>
                <div className="flex justify-between filter">
                  <div
                    className="mb-4 border rounded"
                    style={{ flexBasis: '24%' }}
                  >
                    <DatePicker
                      className={`startdate${mode} px-2.5 py-4 h-4 text-red border-gray-400 outline-none w-full  bg-white text-gray-900 dark:bg-gray-900 dark:text-green-100 placeholder-gray-400`}
                      selected={values.start}
                      onChange={(selectedOption) => {
                        setFieldValue('start', selectedOption, false);
                        handleSubmit();
                      }}
                      placeholderText="Start Date"
                    />
                  </div>
                  <div className="mb-4 basis-[24%]">
                    <div className="relative">
                      <label
                        htmlFor="round"
                        className="absolute -top-2 left-2 inline-block bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-300  text-xs font-medium"
                      >
                        Round
                      </label>
                      <input
                        className="block w-full rounded-md border-0 pl-3 py-1 bg-white text-gray-900 dark:bg-gray-900 dark:text-green-100 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset text-base sm:text-sm sm:leading-7"
                        id="round"
                        type="number"
                        name="round"
                        onChange={(e) => {
                          setFieldValue('round', e.target.value, false);
                          handleSubmit();
                        }}
                        onBlur={handleBlur}
                        value={values.round}
                      />
                    </div>
                  </div>
                  <div className="mb-4 basis-[24%]">
                    <div className="relative">
                      <label
                        htmlFor="search"
                        className="absolute -top-2 left-2 inline-block bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-300  text-xs font-medium"
                      >
                        Search
                      </label>
                      <input
                        className="block w-full rounded-md border-0 pl-3 py-1 bg-white text-gray-900 dark:bg-gray-900 dark:text-green-100 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset text-base sm:text-sm sm:leading-7"
                        id="search"
                        type="text"
                        name="search"
                        onChange={(e) => {
                          setFieldValue('search', e.target.value, false);
                          handleSubmit();
                        }}
                        onBlur={handleBlur}
                        value={values.search}
                      />
                    </div>
                  </div>
                  <div className="mb-4" style={{ flexBasis: '24%' }}>
                    <button
                      className="bg-green-100 text-gray-900 hover:bg-amber-500   active:bg-green-100 font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline"
                      type="submit"
                      onClick={() => {
                        resetForm();
                        setResetTrue(!resetTrue);
                      }}
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </form>
            </div>
          );
        }}
      </Formik>
      <div className="relative">
        {loading && (
          <div
            role="status"
            className="absolute -translate-x-1/2 -translate-y-1/2 left-2/4 top-2/4"
          >
            <svg
              aria-hidden="true"
              className="w-12 h-12 mr-2 text-gray-900 animate-spin dark:text-gray-300 fill-green-100"
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
        <Table
          columns={newColArr}
          data={botList}
          paginationVisible
          selectVisible
        />
      </div>
    </div>
  );
}
export default ListBot;
