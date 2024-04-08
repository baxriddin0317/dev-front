/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { Formik, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Exchanges from '../utils/bot/Exchanges';
import { Modal, ModalHeader, ModalBody, ModalFooter } from '@windmill/react-ui';

import {
  createBot,
  getPrecision,
  fetchBalance,
  fetchBotList,
  getAllPrecision,
} from '../store/actions/createBotAction';

import ComboBox from 'components/combobox/ComboBox';

const schema = Yup.object().shape({
  exchanges: Yup.object().required('*Exchange is required.'),
  market: Yup.string().required('*Market is required.'),
  buyOrSell: Yup.object().required('*Buy or Sell ?'),
  amount: Yup.number().required('*Amount is required.'),
  amountSize: Yup.number().required('*Amount Size is required.'),
  coinSize: Yup.number().required('*Coin Size is required.'),
  step: Yup.number().required('*Step is required.'),
  end: Yup.number().positive('End price cannot be negative'),
});

const Type = [
  { value: 'buy', label: 'Buy' },
  { value: 'sell', label: 'Sell' },
];

function CreateBot() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalfreedata, setModalFreeData] = useState(null);
  const [modaluseddata, setModalusedData] = useState(null);
  const [filterData, setFilterData] = useState([]);
  const marketData = useSelector((state) => state.createBot);
  const { precision, balance, allprecision } = marketData;
  const { botSettings } = useSelector((state) => state.settings);
  const [submitting, setSubmitting] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {}, [dispatch, botSettings.lot, botSettings.option]);

  const getCoinData = (market, exchange) => {
    const splitData = market?.split('/');
    dispatch(
      getPrecision({
        exchange,
        market: splitData[1],
        coin: splitData[0],
      })
    );
  };

  const getBalance = (exchange) => {
    dispatch(fetchBalance(exchange));
  };

  return (
    <>
      <Modal isOpen={modalIsOpen} onClose={closeModal}>
        <ModalHeader style={{ textAlign: 'center', marginBottom: '20' }} />
        <ModalBody className="text-center custom-modal px-8 pt-6 pb-4">
          <div className="text-gray-300">
            <h2 className="text-xl font-large mb-6">
              You do not have enough bots!
            </h2>
            <p className="mb-2">
              Your account is currently limited to
              <b>{` ${modalfreedata} `}</b>
              bots. You have
              <b>{` ${modaluseddata} `}</b>
              active bots.
            </p>
            <p className="mb-4">
              Please consider purchasing a new subscription.
            </p>
          </div>
        </ModalBody>
        <ModalFooter className="justify-center mt-10">
          <button
            onClick={closeModal}
            className="bg-gray-400  text-gray-300 font-bold py-2 px-4 rounded"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              history.push('/subscription');
            }}
            className="bg-green-100  text-gray-300 font-bold py-2 px-4 rounded"
          >
            Get Subscription Now
          </button>
        </ModalFooter>
      </Modal>
      <Formik
        validationSchema={schema}
        validateOnChange={false}
        validateOnBlur={false}
        initialValues={{
          exchanges: '',
          market: '',
          coins: '',
          buyOrSell: '',
          balance: 0,
          amount: '',
          amountSize: '',
          startPrice: '',
          coinSize: '',
          step: '',
          botType:
            botSettings.option === undefined ? '1' : String(botSettings.option),
          percent: '',
          lot: '',
          end: '',
        }}
        onSubmit={async (values, { resetForm }) => {
          setSubmitting(true);
          // Alert the input values of the form that we filled
          const splitPair = values.market.split('/');
          const coinData = {
            value: splitPair[0],
            label: splitPair[0],
          };
          const marketsData = {
            value: splitPair[1],
            label: splitPair[1],
          };
          const updatedValue = {
            ...values,
            market: marketsData,
            coins: coinData,
          };
          const res = await createBot(updatedValue);
          if (Object.keys(res).length == 0) {
            dispatch(fetchBotList());
            history.push('/list-bot');
          } else {
            setModalFreeData(res.free);
            setModalusedData(res.used);
            setIsOpen(true);
          }
          resetForm();
          setTimeout(() => {
            setSubmitting(false);
            setTimeout(() => {}, 3000);
          }, 3000);
        }}
      >
        {({
          values,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
          resetForm,
        }) => {
          const updateBalance = (exchange, market, coin, side) => {
            if (
              exchange.value === '' ||
              market.value === '' ||
              coin.value === '' ||
              side.value === ''
            ) {
              setFieldValue('balance', '', false);
            } else {
              const key =
                side.value === 'buy'
                  ? market?.split('/')[1]
                  : market?.split('/')[0];
              const bal = key in balance ? balance[key].free : 0;
              setFieldValue(
                'balance',
                parseFloat(bal)
                  .toFixed(5)
                  .replace(/\.?0+$/, ''),
                false
              );
            }
          };
          const handleBuy = () => {
            // buy or sell
            const buySell = values.buyOrSell.value;

            // amount
            const amountValue = values.amount;
            setFieldValue('amount', amountValue, false);
            // lot
            const lotValue = values.lot;
            setFieldValue('lot', lotValue, false);
            // start price
            const startPriceValue = parseFloat(values.startPrice);
            setFieldValue(
              'startPrice',
              startPriceValue.toFixed(precision.amountSize),
              false
            );
            // amount size
            const amountSizeValue = values.amountSize;
            setFieldValue('amountSize', amountSizeValue, false);
            // coin size
            const coinSizeValue = values.coinSize;
            setFieldValue('coinSize', coinSizeValue, false);
            // step
            const stepValue = values.step;
            setFieldValue('step', stepValue, false);
            // end
            const endValue = values.end;
            setFieldValue('end', endValue, false);
            // end
            const percentValue = values.percent;
            setFieldValue('percent', percentValue, false);
            // check buy sell

            const amt = amountValue;
            const lotval = lotValue;

            if (buySell === 'buy') {
              const amtSize = amt / lotval;

              const coinsize =
                amtSize / startPriceValue.toFixed(precision.amountSize);

              setFieldValue(
                'amountSize',
                amtSize.toFixed(precision.amountSize),
                false
              );
              setFieldValue(
                'coinSize',
                coinsize.toFixed(precision.coinSize),
                false
              );
              // handleBuyStepEnd
              let step =
                (startPriceValue.toFixed(precision.amountSize) * percentValue) /
                100;
              const minimal = 1 / 10 ** precision.amountSize;
              if (step < minimal) {
                step = minimal;
              }
              const end =
                startPriceValue.toFixed(precision.amountSize) -
                (lotval - 1) * step;
              setFieldValue('step', step.toFixed(precision.amountSize), false);
              setFieldValue('end', end.toFixed(precision.amountSize), false);
            } else {
              const amtSize =
                (amt / lotval) * startPriceValue.toFixed(precision.amountSize);
              const coinsize = amt / lotval;
              setFieldValue(
                'amountSize',
                amtSize.toFixed(precision.amountSize),
                false
              );
              setFieldValue(
                'coinSize',
                coinsize.toFixed(precision.coinSize),
                false
              );
              // handleSellStepEnd
              let step =
                (startPriceValue.toFixed(precision.amountSize) * percentValue) /
                100;

              const minimal = 1 / 10 ** precision.amountSize;
              if (step < minimal) {
                step = minimal;
              }

              const end =
                parseFloat(startPriceValue.toFixed(precision.amountSize)) +
                (lotval - 1) * step;
              setFieldValue('step', step.toFixed(precision.amountSize), false);
              setFieldValue('end', end.toFixed(precision.amountSize), false);
            }
          };
          const handleMin = (e) => {
            // buy or sell
            const buySell = values.buyOrSell.value;

            // amount
            const amountValue = parseFloat(values.balance) * (e / 100);
            setFieldValue(
              'amount',
              parseFloat(amountValue.toFixed(precision.amountSize)),
              false
            );
            // lot
            const lotValue = values.lot;
            setFieldValue('lot', lotValue, false);
            // start price
            const startPriceValue = parseFloat(values.startPrice);
            setFieldValue(
              'startPrice',
              startPriceValue.toFixed(precision.amountSize),
              false
            );
            // amount size
            const amountSizeValue = values.amountSize;
            setFieldValue('amountSize', amountSizeValue, false);
            // coin size
            const coinSizeValue = values.coinSize;
            setFieldValue('coinSize', coinSizeValue, false);
            // step
            const stepValue = values.step;
            setFieldValue('step', stepValue, false);
            // end
            const endValue = values.end;
            setFieldValue('end', endValue, false);
            // end
            const percentValue = values.percent;
            setFieldValue('percent', percentValue, false);

            // check buy sell

            const amt = parseFloat(amountValue.toFixed(precision.amountSize));
            const lotval = lotValue;

            if (buySell === 'buy') {
              const amtSize = amt / lotval;

              const coinsize =
                amtSize / startPriceValue.toFixed(precision.amountSize);

              setFieldValue(
                'amountSize',
                amtSize.toFixed(precision.amountSize),
                false
              );
              setFieldValue(
                'coinSize',
                coinsize.toFixed(precision.coinSize),
                false
              );
              // handleBuyStepEnd
              let step =
                (startPriceValue.toFixed(precision.amountSize) * percentValue) /
                100;
              const minimal = 1 / 10 ** precision.amountSize;
              if (step < minimal) {
                step = minimal;
              }
              const end =
                startPriceValue.toFixed(precision.amountSize) -
                (lotval - 1) * step;
              setFieldValue('step', step.toFixed(precision.amountSize), false);
              setFieldValue('end', end.toFixed(precision.amountSize), false);
            } else {
              const amtSize =
                (amt / lotval) * startPriceValue.toFixed(precision.amountSize);
              const coinsize = amt / lotval;
              setFieldValue(
                'amountSize',
                amtSize.toFixed(precision.amountSize),
                false
              );
              setFieldValue(
                'coinSize',
                coinsize.toFixed(precision.coinSize),
                false
              );
              // handleSellStepEnd
              let step =
                (startPriceValue.toFixed(precision.amountSize) * percentValue) /
                100;
              const minimal = 1 / 10 ** precision.amountSize;
              if (step < minimal) {
                step = minimal;
              }
              const end =
                parseFloat(startPriceValue.toFixed(precision.amountSize)) +
                (lotval - 1) * step;
              setFieldValue('step', step.toFixed(precision.amountSize), false);
              setFieldValue('end', end.toFixed(precision.amountSize), false);
            }
          };
          const updateMin = () => {
            // buy or sell
            const buySell = values.buyOrSell.value;

            // lot
            const lotValue = values.lot;
            setFieldValue('lot', lotValue, false);
            // start price
            const startPriceValue = parseFloat(values.startPrice);
            setFieldValue(
              'startPrice',
              startPriceValue.toFixed(precision.amountSize),
              false
            );
            // amount size
            const amountSizeValue = values.amountSize;
            setFieldValue('amountSize', amountSizeValue, false);
            // coin size
            const coinSizeValue = values.coinSize;
            setFieldValue('coinSize', coinSizeValue, false);
            // step
            const stepValue = values.step;
            setFieldValue('step', stepValue, false);
            // end
            const endValue = values.end;
            setFieldValue('end', endValue, false);
            // end
            const percentValue = values.percent;
            setFieldValue('percent', percentValue, false);

            // check buy sell

            const lotval = lotValue;

            if (buySell === 'buy') {
              const amountValue =
                precision.min * botSettings.lot +
                precision.min * botSettings.lot * 0.2;
              setFieldValue(
                'amount',
                amountValue.toFixed(precision.amountSize),
                false
              );
              const amt = amountValue;
              const amtSize = amt / lotval;

              const coinsize =
                amtSize / startPriceValue.toFixed(precision.amountSize);

              setFieldValue(
                'amountSize',
                amtSize.toFixed(precision.amountSize),
                false
              );
              setFieldValue(
                'coinSize',
                coinsize.toFixed(precision.coinSize),
                false
              );
              // handleBuyStepEnd
              let step =
                (startPriceValue.toFixed(precision.amountSize) * percentValue) /
                100;
              const minimal = 1 / 10 ** precision.amountSize;
              if (step < minimal) {
                step = minimal;
              }
              const end =
                startPriceValue.toFixed(precision.amountSize) -
                (lotval - 1) * step;
              setFieldValue('step', step.toFixed(precision.amountSize), false);
              setFieldValue('end', end.toFixed(precision.amountSize), false);
            } else {
              const amountValue =
                ((precision.min + precision.min * 0.2) / startPriceValue) *
                botSettings.lot;
              setFieldValue(
                'amount',
                amountValue.toFixed(precision.amountSize),
                false
              );
              const amt = amountValue;
              const amtSize =
                (amt / lotval) * startPriceValue.toFixed(precision.amountSize);
              const coinsize = amt / lotval;
              setFieldValue(
                'amountSize',
                amtSize.toFixed(precision.amountSize),
                false
              );
              setFieldValue(
                'coinSize',
                coinsize.toFixed(precision.coinSize),
                false
              );
              // handleSellStepEnd
              let step =
                (startPriceValue.toFixed(precision.amountSize) * percentValue) /
                100;
              const minimal = 1 / 10 ** precision.amountSize;
              if (step < minimal) {
                step = minimal;
              }
              const end =
                parseFloat(startPriceValue.toFixed(precision.amountSize)) +
                (lotval - 1) * step;
              setFieldValue('step', step.toFixed(precision.amountSize), false);
              setFieldValue('end', end.toFixed(precision.amountSize), false);
            }
          };
          const resetFormFields = () => {
            resetForm();
          };
          useEffect(() => {
            const filteredDataNolabelData =
              values.market === ''
                ? allprecision
                : allprecision?.filter((item) => {
                    return item
                      ?.toLowerCase()
                      .includes(values.market.toLowerCase());
                  });
            setFilterData(filteredDataNolabelData);
          }, [values.market, allprecision]);
          return (
            <div className="createbotbox md:w-5/12 lg:w-5/12 my-8 sm:w-full overflow-hidden border rounded-lg ">
              <form
                className="bg-gray-50 dark:bg-gray-800 shadow-md rounded px-[1.5rem] pt-6 pb-8"
                onSubmit={handleSubmit}
                id="createbot"
              >
                <div className="mb-4  rounded ">
                  <ComboBox
                    title=""
                    dataList={Exchanges}
                    handleChange={handleChange}
                    selectedValue={values.exchanges.label}
                    setField={setFieldValue}
                    onChange={(selectedOption) => {
                      setFieldValue('exchanges', selectedOption, false);
                      setFieldValue('balance', 0, false);
                      const exchange = selectedOption.value.toLowerCase();
                      // dispatch(getMarkets(exchange));
                      dispatch(getAllPrecision(exchange));
                      getBalance(exchange);
                    }}
                  />
                  <ErrorMessage
                    name="exchanges"
                    component="p"
                    className="mt-2 text-sm text-red-600"
                  />
                </div>
                <div className="flex justify-between">
                  <div className=" mb-4 mr-2" style={{ flexBasis: '68%' }}>
                    <ComboBox
                      title=""
                      isNoLabel
                      name="market"
                      dataList={allprecision}
                      setField={setFieldValue}
                      selectedValue={values.market}
                      handleChange={handleChange}
                      onChange={(selectedOption) => {
                        setFieldValue('market', selectedOption, false);
                        const exchange = values.exchanges.value;
                        getCoinData(selectedOption, exchange);
                        setFieldValue('balance', 0, false);
                        setFieldValue('coins', '', false);
                        setFieldValue('step', '', false);
                        setFieldValue('end', '', false);
                        setFieldValue('amountSize', '', false);
                        setFieldValue('amount', '', false);
                        setFieldValue('lot', '', false);
                        setFieldValue('startPrice', '', false);
                        setFieldValue('coinSize', '', false);
                        setFieldValue('percent', '', false);
                        setFieldValue('startPrice', '', false);
                        setFieldValue('buyOrSell', '', false);
                      }}
                      onBlur={() => {
                        handleBlur({ target: { name: 'market' } });
                      }}
                    />
                    <ErrorMessage
                      name="market"
                      component="p"
                      className="mt-2 text-sm text-red-600"
                    />
                  </div>

                  <div className="mb-4  rounded " style={{ flexBasis: '30%' }}>
                    <ComboBox
                      title=""
                      selectedValue={values.buyOrSell.label}
                      dataList={Type}
                      name="buyOrSell"
                      setField={setFieldValue}
                      handleChange={handleChange}
                      onChange={(selectedOption) => {
                        setFieldValue('step', '', false);
                        setFieldValue('end', '', false);
                        setFieldValue('amountSize', '', false);
                        setFieldValue('coinSize', '', false);
                        setFieldValue(
                          'startPrice                                                                          ',
                          '',
                          false
                        );
                        // const buyOrSellValue = selectedOption?.toLowerCase();
                        setFieldValue('buyOrSell', selectedOption, false);
                        setFieldValue('lot', botSettings.lot, false);
                        updateBalance(
                          values.exchanges,
                          values.market,
                          values.coins,
                          selectedOption
                        );

                        // Change after start price

                        const lotval = botSettings.lot;
                        // min amount
                        if (selectedOption.value === 'buy') {
                          const amountValue =
                            precision.min * botSettings.lot +
                            precision.min * botSettings.lot * 0.2;
                          setFieldValue(
                            'amount',
                            amountValue.toFixed(precision.amountSize),
                            false
                          );
                          // start prize
                          const startPrice =
                            precision.lastprice +
                            (precision.lastprice *
                              botSettings.startPricePercentage) /
                              100;
                          setFieldValue(
                            'startPrice',
                            startPrice.toFixed(precision.amountSize),
                            false
                          );

                          // amount size
                          const amt = amountValue;
                          const amtSize = amt / lotval;
                          const coinsize =
                            amtSize / startPrice.toFixed(precision.amountSize);

                          setFieldValue(
                            'amountSize',
                            amtSize.toFixed(precision.amountSize),
                            false
                          );
                          setFieldValue(
                            'coinSize',
                            coinsize.toFixed(precision.coinSize),
                            false
                          );
                          // handleBuyStepEnd
                          let step =
                            (startPrice.toFixed(precision.amountSize) *
                              botSettings.stepPercentage) /
                            100;
                          const minimal = 1 / 10 ** precision.amountSize;
                          if (step < minimal) {
                            step = minimal;
                          }
                          const end =
                            startPrice.toFixed(precision.amountSize) -
                            (botSettings.lot - 1) * step;
                          setFieldValue(
                            'step',
                            step.toFixed(precision.amountSize),
                            false
                          );
                          setFieldValue(
                            'end',
                            end.toFixed(precision.amountSize),
                            false
                          );
                        } else {
                          const startPrice =
                            precision.lastprice -
                            (precision.lastprice *
                              botSettings.startPricePercentage) /
                              100;
                          const amountValue =
                            ((parseFloat(precision.min) * 1.2) / startPrice) *
                            botSettings.lot;
                          setFieldValue(
                            'amount',
                            amountValue.toFixed(precision.amountSize),
                            false
                          );
                          const amt = amountValue;

                          setFieldValue(
                            'startPrice',
                            startPrice.toFixed(precision.amountSize),
                            false
                          );
                          const amtSize = (amt / lotval) * startPrice;

                          const coinsize = amt / lotval;
                          setFieldValue(
                            'amountSize',
                            amtSize.toFixed(precision.amountSize),
                            false
                          );
                          setFieldValue(
                            'coinSize',
                            coinsize.toFixed(precision.coinSize),
                            false
                          );
                          // handleSellStepEnd
                          let step =
                            (startPrice.toFixed(precision.amountSize) *
                              botSettings.stepPercentage) /
                            100;
                          const minimal = 1 / 10 ** precision.amountSize;
                          if (step < minimal) {
                            step = minimal;
                          }
                          const end =
                            parseFloat(
                              startPrice.toFixed(precision.amountSize)
                            ) +
                            (botSettings.lot - 1) * step;
                          setFieldValue(
                            'step',
                            step.toFixed(precision.amountSize),
                            false
                          );
                          setFieldValue(
                            'end',
                            end.toFixed(precision.amountSize),
                            false
                          );
                        }
                        setFieldValue(
                          'percent',
                          botSettings.stepPercentage,
                          false
                        );
                      }}
                      onBlur={() => {
                        handleBlur({ target: { name: 'buyOrSell' } });
                      }}
                    />
                    <ErrorMessage
                      name="buyOrSell"
                      component="p"
                      className="mt-2 text-sm text-red-600"
                    />
                  </div>
                </div>

                <div className="flex justify-between">
                  <div
                    className="mb-4"
                    style={{ flexBasis: '70%', padding: '' }}
                  >
                    <div className="relative">
                      <label
                        htmlFor="balanceValue"
                        className="absolute -top-2 left-2 inline-block text-xs font-medium bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-green-100"
                      >
                        Available Amount
                      </label>
                      <input
                        className="text-right py-[6px] [10px] sm:text-[13px]  w-full text-xs sm:text-base font-bold
                        bg-transparent text-grey-900
                      dark:bg-gray-900 dark:text-green-100"
                        id="balanceValue"
                        type="text"
                        name="balanceValue"
                        disabled
                        value={values.balance}
                      />
                    </div>
                  </div>

                  <div
                    className="mb-4"
                    style={{ flexBasis: '35%', padding: '' }}
                  >
                    <input
                      className="text-left py-[6px] px-[10px] w-full text-xs sm:text-base font-bold
                      bg-transparent text-gray-900
                      dark:bg-gray-900 dark:text-green-100"
                      id="balanceCurrency"
                      type="text"
                      name="balanceCurrency"
                      disabled
                      value={
                        values.buyOrSell.value === 'buy'
                          ? values.market?.split('/')[1]
                          : values.buyOrSell.value === 'sell'
                          ? values.market?.split('/')[0]
                          : 'USDT'
                      }
                    />
                  </div>
                </div>

                <div className="flex justify-between">
                  <div
                    className="mb-4"
                    style={{ flexBasis: '100%', padding: '' }}
                  >
                    <div className="relative">
                      <label
                        htmlFor="amount"
                        className="absolute -top-2 left-2 inline-block text-xs font-medium bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-300"
                      >
                        Min Amount
                      </label>
                      <input
                        className="block w-full rounded border-gray-400 pl-3 py-1 shadow-sm ring-1 ring-inset ring-gray-400 focus:ring-1 focus:ring-inset sm:text-sm sm:leading-7
                        text-gray-900 dark:text-green-100  dark:bg-gray-900"
                        id="amount"
                        type="text"
                        name="amount"
                        onChange={handleChange}
                        onBlur={(e) => {
                          setFieldValue('amount', e.target.value, false);
                          handleBuy();
                        }}
                        value={values.amount}
                      />
                    </div>
                    <ErrorMessage
                      name="amount"
                      component="p"
                      className="mt-2 text-sm text-red-600"
                    />
                  </div>
                </div>

                <div className="flex justify-between">
                  <div className="mb-4 bg-white dark:bg-gray-900 py-[6px] px-[10px] cursor-pointer rounded border border-gray-400 sm:basis-[19%]">
                    <input
                      className="text-center cursor-pointer w-full text-xs sm:text-base
                      text-gray-900 dark:bg-gray-900 dark:text-green-100"
                      id="min"
                      type="button"
                      value="Min"
                      onClick={() => {
                        updateMin();
                      }}
                    />
                  </div>
                  <div className="mb-4 bg-white dark:bg-gray-900 py-[6px] px-[10px] cursor-pointer rounded border border-gray-400 sm:basis-[19%]">
                    <input
                      className="text-center cursor-pointer w-full text-xs sm:text-base
                      text-gray-900 dark:bg-gray-900 dark:text-green-100"
                      type="button"
                      value="25%"
                      onClick={(e) => {
                        handleMin(parseFloat(e.target.value));
                      }}
                    />
                  </div>
                  <div className="mb-4 bg-white dark:bg-gray-900 py-[6px] px-[10px] cursor-pointer rounded border border-gray-400 sm:basis-[19%]">
                    <input
                      className="text-center cursor-pointer w-full text-xs sm:text-base
                      text-gray-900 dark:bg-gray-900 dark:text-green-100"
                      type="button"
                      value="50%"
                      onClick={(e) => {
                        handleMin(parseFloat(e.target.value));
                      }}
                    />
                  </div>
                  <div className="mb-4 bg-white dark:bg-gray-900 py-[6px] px-[10px] cursor-pointer rounded border border-gray-400 sm:basis-[19%]">
                    <input
                      className="text-center cursor-pointer w-full text-xs sm:text-base
                      text-gray-900 dark:bg-gray-900 dark:text-green-100"
                      type="button"
                      value="75%"
                      onClick={(e) => {
                        handleMin(parseFloat(e.target.value));
                      }}
                    />
                  </div>
                  <div className="mb-4 bg-white dark:bg-gray-900 py-[6px] px-[10px] cursor-pointer rounded border border-gray-400 sm:basis-[19%]">
                    <input
                      className="text-center cursor-pointer w-full text-xs sm:text-base
                      text-gray-900 dark:bg-gray-900 dark:text-green-100"
                      type="button"
                      value="100%"
                      onClick={(e) => {
                        handleMin(parseFloat(e.target.value));
                      }}
                    />
                  </div>
                </div>

                <div className="flex justify-between">
                  <div
                    className="mb-4"
                    style={{ flexBasis: '49%', padding: '' }}
                  >
                    <div className="relative">
                      <label
                        htmlFor="startPrice"
                        className="absolute -top-2 left-2 inline-block text-xs font-medium bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-300"
                      >
                        Start Price
                      </label>
                      <input
                        className="block w-full rounded-md border-0 border-gray-400 pl-3 py-1 shadow-sm ring-1 ring-inset ring-gray-400 focus:ring-1 focus:ring-inset sm:text-sm sm:leading-7
                        text-gray-900 dark:text-green-100  dark:bg-gray-900"
                        id="startPrice"
                        type="text"
                        name="startPrice"
                        onChange={handleChange}
                        onBlur={(e) => {
                          setFieldValue('startPrice', e.target.value, false);
                          handleBuy();
                        }}
                        value={values.startPrice}
                      />
                    </div>
                    <ErrorMessage
                      name="step"
                      component="p"
                      className="mt-2 text-sm text-red-600"
                    />
                  </div>

                  <div
                    className="mb-4"
                    style={{ flexBasis: '49%', padding: '' }}
                  >
                    <div className="relative">
                      <label
                        htmlFor="end"
                        className="absolute -top-2 left-2 inline-block text-xs font-medium bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-300"
                      >
                        End Price
                      </label>
                      <input
                        className="block w-full rounded-md border-0 border-gray-400 pl-3 py-1 shadow-sm ring-1 ring-inset ring-gray-400 focus:ring-1 focus:ring-inset sm:text-sm sm:leading-7
                        text-gray-900 dark:text-green-100  dark:bg-gray-900"
                        id="end"
                        type="text"
                        name="end"
                        onChange={handleChange}
                        onBlur={(e) => {
                          setFieldValue('end', e.target.value, false);
                          handleBuy();
                        }}
                        value={values.end}
                      />
                    </div>
                    <ErrorMessage
                      name="end"
                      component="p"
                      className="mt-2 text-sm text-red-600"
                    />
                  </div>
                </div>

                <div className="flex justify-between">
                  <div className="mb-4 " style={{ flexBasis: '20%' }}>
                    <div className="relative">
                      <label
                        htmlFor="lot"
                        className="absolute -top-2 left-2 inline-block text-xs font-medium bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-300"
                      >
                        Lot
                      </label>
                      <input
                        type="text"
                        name="lot"
                        className="block w-full rounded-md border-0 pl-3 py-1 shadow-sm ring-1 ring-inset ring-gray-400 focus:ring-1 focus:ring-inset sm:text-sm sm:leading-7
                        text-gray-900 dark:text-green-100  dark:bg-gray-900"
                        id="lot"
                        onChange={handleChange}
                        onBlur={(e) => {
                          const lotSize = e.target.value;
                          setFieldValue('lot', lotSize, false);
                          handleBuy();
                        }}
                        value={values.lot}
                      />
                    </div>
                    <ErrorMessage
                      name="lot"
                      component="p"
                      className="mt-2 text-sm text-red-600"
                    />
                  </div>
                  <div
                    className="mb-4"
                    style={{ flexBasis: '57%', padding: '' }}
                  >
                    <div className="relative">
                      <label
                        htmlFor="step"
                        className="absolute -top-2 left-2 inline-block text-xs font-medium bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-300"
                      >
                        Step
                      </label>
                      <input
                        className="block w-full rounded-md border-0 border-gray-400 pl-3 py-1 shadow-sm ring-1 ring-inset ring-gray-400 focus:ring-1 focus:ring-inset sm:text-sm sm:leading-7
                        text-gray-900 dark:text-green-100  dark:bg-gray-900"
                        id="step"
                        type="text"
                        name="step"
                        onChange={handleChange}
                        onBlur={(e) => {
                          setFieldValue('step', e.target.value, false);
                          handleBuy();
                          // handleSellStepEnd();
                        }}
                        value={values.step}
                      />
                    </div>
                    <ErrorMessage
                      name="startPrice"
                      component="p"
                      className="mt-2 text-sm text-red-600"
                    />
                  </div>
                  <div
                    className="mb-4"
                    style={{ flexBasis: '19%', padding: '' }}
                  >
                    <div className="relative">
                      <label
                        htmlFor="percent"
                        className="absolute -top-2 left-2 inline-block text-xs font-medium bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-300"
                      >
                        %
                      </label>
                      <input
                        className="block w-full rounded-md border-0 border-gray-400 pl-3 py-1 shadow-sm ring-1 ring-inset ring-gray-400 focus:ring-1 focus:ring-inset sm:text-sm sm:leading-7
                        text-gray-900 dark:text-green-100  dark:bg-gray-900"
                        id="percent"
                        type="text"
                        name="percent"
                        onChange={handleChange}
                        onBlur={(e) => {
                          setFieldValue('percent', e.target.value, false);
                          handleBuy();
                        }}
                        value={values.percent}
                      />
                    </div>
                    <ErrorMessage
                      name="percent"
                      component="p"
                      className="mt-2 text-sm text-red-600"
                    />
                  </div>
                </div>

                <div className="flex justify-between">
                  <div
                    className="mb-4"
                    style={{ flexBasis: '49%', padding: '' }}
                  >
                    <div className="relative">
                      <label
                        htmlFor="amountSize"
                        className="absolute -top-2 left-2 inline-block text-xs font-medium bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-300"
                      >
                        Amount Size
                      </label>
                      <input
                        className="block w-full rounded-md border border-gray-400 pl-3 py-1 shadow-sm focus:ring-1 focus:ring-inset sm:text-sm sm:leading-7
                        text-gray-900 dark:text-green-100  dark:bg-gray-900"
                        id="amountSize"
                        type="text"
                        name="amountSize"
                        onChange={handleChange}
                        onBlur={(e) => {
                          setFieldValue('amountSize', e.target.value, false);
                          handleBuy();
                        }}
                        value={values.amountSize}
                      />
                    </div>
                    <ErrorMessage
                      name="amountSize"
                      component="p"
                      className="mt-2 text-sm text-red-600"
                    />
                  </div>
                  <div
                    className="mb-4"
                    style={{ flexBasis: '49%', padding: '' }}
                  >
                    <div className="relative">
                      <label
                        htmlFor="coinSize"
                        className="absolute -top-2 left-2 inline-block text-xs font-medium bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-300"
                      >
                        Coin Size
                      </label>
                      <input
                        className="block w-full rounded-md border border-gray-400 pl-3 py-1 shadow-sm focus:ring-1 focus:ring-inset sm:text-sm sm:leading-7
                        text-gray-900 dark:text-green-100  dark:bg-gray-900"
                        id="coinSize"
                        type="text"
                        name="coinSize"
                        onChange={handleChange}
                        onBlur={(e) => {
                          setFieldValue('coinSize', e.target.value, false);
                          handleBuy();
                        }}
                        value={values.coinSize}
                      />
                    </div>
                    <ErrorMessage
                      name="coinSize"
                      component="p"
                      className="mt-2 text-sm text-red-600"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <p className="dark:text-gray-300 mb-2">Checkboxes</p>
                  <div className="flex justify-start">
                    <div className="mr-3">
                      <label className="mr-2 dark:text-gray-300">
                        <Field
                          className="mr-2"
                          type="radio"
                          name="botType"
                          value="1"
                          checked={values.botType === '1'}
                          onChange={(e) =>
                            setFieldValue('botType', e.target.value, false)
                          }
                        />
                        Market
                      </label>
                    </div>
                    <div className="mr-3">
                      <label className="mr-2 dark:text-gray-300">
                        <Field
                          className="mr-2"
                          type="radio"
                          name="botType"
                          value="2"
                          checked={values.botType === '2'}
                          onChange={(e) =>
                            setFieldValue('botType', e.target.value, false)
                          }
                        />
                        Coin
                      </label>
                    </div>
                    <div className="mr-3">
                      <label className="mr-2 dark:text-gray-300">
                        <Field
                          className="mr-2"
                          type="radio"
                          name="botType"
                          value="3"
                          checked={values.botType === '3'}
                          onChange={(e) =>
                            setFieldValue('botType', e.target.value, false)
                          }
                        />
                        Mix
                      </label>
                    </div>
                    <div className="mr-3">
                      <label className="mr-2 dark:text-gray-300">
                        <Field
                          className="mr-2"
                          type="radio"
                          name="botType"
                          value="4"
                          checked={values.botType === '4'}
                          onChange={(e) =>
                            setFieldValue('botType', e.target.value, false)
                          }
                        />
                        Coin+
                      </label>
                    </div>
                    <div className="mr-3">
                      <label className="mr-2 dark:text-gray-300">
                        <Field
                          className="mr-2"
                          type="radio"
                          name="botType"
                          value="5"
                          checked={values.botType === '5'}
                          onChange={(e) =>
                            setFieldValue('botType', e.target.value, false)
                          }
                        />
                        Mix+
                      </label>
                    </div>
                  </div>
                  {values.botType === '1' ? (
                    <p className="dark:text-gray-300 text-black text-[13px] mt-1">
                      You will receive your Profit in Market coins into your
                      available Balance. The Amount Size will be always the
                      same.
                    </p>
                  ) : values.botType === '2' ? (
                    <p className="dark:text-gray-300 text-black text-[13px] mt-1">
                      Your Profit will be refilled in the orderbook with the
                      sold amount. Your Amount Size will grow.
                    </p>
                  ) : values.botType === '3' ? (
                    <p className="dark:text-gray-300 text-black text-[13px] mt-1">
                      You will receive 50% of your Profit in Market Coins into
                      your available Balance. 50% of your Profit will be
                      refilled in the new order and your Amount Size will grow.
                    </p>
                  ) : values.botType === '4' ? (
                    <p className="dark:text-gray-300 text-black text-[13px] mt-1">
                      You will receive your Profit in Coins into your available
                      Balance. The Amount Size will be always the same.
                    </p>
                  ) : values.botType === '5' ? (
                    <p className="dark:text-gray-300 text-black text-[13px] mt-1">
                      You will receive 50% of your Profit in Coins into your
                      available Balance. 50% of your Profit will be refilled in
                      the new order and your Amount Size will grow.
                    </p>
                  ) : (
                    ''
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <button
                    className="bg-green-100 w-full hover:bg-amber-500 text-gray-50 font-bold py-2 px-4 rounded"
                    type="submit"
                    disabled={submitting}
                  >
                    {submitting ? 'HODL! Creating Bot...' : 'Create Bot'}
                  </button>
                </div>
              </form>
            </div>
          );
        }}
      </Formik>
    </>
  );
}

export default CreateBot;
