import React, { useEffect, useState, useContext } from 'react';
import Table from '../table/tableView';
import { isMobile } from 'react-device-detect';
import * as Yup from 'yup';
import { Formik, ErrorMessage } from 'formik';
import Select from 'react-select';
import { getKeysData } from '../../store/actions/listKeysAction';
import '../../styles/countdown.css';
import {
  Modal,
  ModalHeader,
  ModalBody,
  WindmillContext,
} from '@windmill/react-ui';

import { useDispatch, useSelector } from 'react-redux';
import { addKeys } from '../../store/actions/addKeysAction';
import Exchanges from '../../utils/bot/Exchanges';

console.log('Backup');

const schema = Yup.object().shape({
  exchanges: Yup.object().required('*Exchange is required.'),
  apikey: Yup.string().required('*API Key is required.'),
  apisecret: Yup.string().required('*API Secret is required.'),
});

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    width: state.selectProps.width,
    color: 'black',
    padding: 10,
  }),
  control: () => ({
    display: 'flex',
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';
    const color = 'green-100';

    return {
      ...provided,
      opacity,
      transition,
      color,
    };
  },
};

function MyExchange() {
  const { mode } = useContext(WindmillContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [update, setupdate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function closeModal() {
    setIsModalOpen(false);
  }

  const Columns = React.useMemo(
    () => [
      {
        Header: 'Exchange',
        accessor: 'exchange',
        isVisible: !isMobile,
      },
      {
        Header: 'Status',
        accessor: 'status',
        isVisible: true,
        Cell: ({ cell }) => (
          <p
            className={`${
              cell.row.original.connected == 1 ||
              cell.row.original.connected == 2
                ? 'bg-green-100'
                : 'bg-red-500'
            } text-white`}
          >
            {cell.row.original.connected == 1 ||
            cell.row.original.connected == 2
              ? 'Connected'
              : 'Not Connected'}
          </p>
        ),
      },
      {
        Header: 'Error',
        accessor: 'error',
        isVisible: !isMobile,
      },
      {
        Header: 'Expiration	',
        accessor: 'expiration	',
        isVisible: true,
      },
      {
        Header: 'Connect Again',
        accessor: 'again',
        isVisible: !isMobile,
      },
      {
        Header: 'Delete API',
        isVisible: true,
      },
    ],
    []
  );

  const dispatch = useDispatch();

  const allKeysData = useSelector((state) => state.listKeys);

  const { allKeys } = allKeysData;

  useEffect(() => {
    dispatch(getKeysData());
    if (isModalOpen) {
      setTimeout(() => {
        setIsModalOpen(false);
        dispatch(getKeysData());
      }, 10000);
    }
  }, [dispatch, isModalOpen]);

  return (
    <div className="w-full  my-8 sm:w-full overflow-hidden dark:border-gray-400 rounded-lg ring-1 ring-black ring-opacity-5">
      <Formik
        validationSchema={schema}
        validateOnChange={false}
        validateOnBlur={false}
        initialValues={{
          exchanges: '',
          apikey: '',
          apisecret: '',
        }}
        onSubmit={async (values) => {
          setIsLoading(true);

          try {
            const response = await fetch(
              'https://dev.metronix-trading.club/myexchange',
              {
                method: 'GET',
                headers: {
                  'Cache-Control': 'no-store',
                  // Weitere Header, falls erforderlich
                },
              }
            );

            const data = await response.json();

            // Verarbeite die empfangenen Daten hier
            console.log(data);
          } catch (error) {
            // Handle Fehler hier
            console.error('Fehler beim Abrufen der Daten:', error);
          } finally {
            setIsLoading(false);
          }

          dispatch(
            addKeys({
              exchange: values.exchanges.value,
              key: values.apikey,
              secret: values.apisecret,
            })
          ).then(() => {
            setIsModalOpen(true);
          });
        }}
      >
        {({
          values,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
        }) => {
          useEffect(() => {
            if (allKeys.length > 0) {
              allKeys.map((keys) => {
                if (keys.exchange === 'MEXC') {
                  setFieldValue(
                    'exchanges',
                    { value: 'MEXC', label: 'MEXC' },
                    false
                  );

                  setFieldValue('apikey', keys.api_key, false);
                  setFieldValue('apisecret', keys.secret_key, false);
                  setupdate(true);
                } else {
                  setFieldValue(
                    'exchanges',
                    { value: 'Binance', label: 'Binance' },
                    false
                  );

                  setFieldValue('apikey', keys.api_key, false);
                  setFieldValue('apisecret', keys.secret_key, false);
                  setupdate(true);
                }
              });
            }
          }, [allKeys]);
          return (
            <div className="md:w-full lg:w-full my-8 sm:w-full overflow-hidden  dark:border-gray-700 rounded-lg ring-1 ring-black ring-opacity-5">
              <form
                className="bg-white dark:bg-gray-800  shadow-md rounded px-8 pt-6 pb-8 mb-4"
                onSubmit={handleSubmit}
                id="listbot"
              >
                <div className="flex justify-between filter">
                  <div
                    className="dark:border-white border mb-4"
                    style={{ flexBasis: '33%' }}
                  >
                    <Select
                      name="exchanges"
                      className="dark:bg-gray-800"
                      isSearchable={false}
                      id="exchanges"
                      styles={customStyles}
                      placeholder="Select Exchange"
                      options={Exchanges}
                      value={values.exchanges}
                      onChange={(selectedOption) => {
                        if (allKeys.length > 0) {
                          if (selectedOption.label === 'MEXC') {
                            allKeys.map((keys) => {
                              if (keys.exchange === 'MEXC') {
                                setFieldValue(
                                  'exchanges',
                                  { value: 'MEXC', label: 'MEXC' },
                                  false
                                );

                                setFieldValue(
                                  'apikey',
                                  keys.exchange === 'MEXC' ? keys.api_key : '',
                                  false
                                );
                                setFieldValue(
                                  'apisecret',
                                  keys.exchange === 'MEXC'
                                    ? keys.secret_key
                                    : '',
                                  false
                                );
                                setupdate(true);
                              } else {
                                setFieldValue(
                                  'exchanges',
                                  selectedOption,
                                  false
                                );
                                setFieldValue('apikey', '', false);
                                setFieldValue('apisecret', '', false);
                                setupdate(false);
                              }
                            });
                          } else if (
                            selectedOption.label === 'Binance' &&
                            selectedOption.label !== 'MEXC'
                          ) {
                            allKeys.map((keys) => {
                              if (keys.exchange === 'Binance') {
                                setFieldValue(
                                  'exchanges',
                                  { value: 'Binance', label: 'Binance' },
                                  false
                                );

                                setFieldValue(
                                  'apikey',
                                  keys.exchange === 'Binance'
                                    ? keys.api_key
                                    : '',
                                  false
                                );
                                setFieldValue(
                                  'apisecret',
                                  keys.exchange === 'Binance'
                                    ? keys.secret_key
                                    : '',
                                  false
                                );
                                setupdate(true);
                              } else {
                                setFieldValue(
                                  'exchanges',
                                  selectedOption,
                                  false
                                );
                                setFieldValue('apikey', '', false);
                                setFieldValue('apisecret', '', false);
                                setupdate(false);
                              }
                            });
                          }
                        } else {
                          setFieldValue('exchanges', selectedOption, false);
                        }
                      }}
                      onBlur={() => {
                        handleBlur({ target: { name: 'exchanges' } });
                      }}
                    />

                    <ErrorMessage
                      name="exchanges"
                      component="p"
                      className="mt-2 text-sm text-red-600"
                    />
                  </div>
                  <div
                    className="dark:border-white border mb-4"
                    style={{ flexBasis: '33%' }}
                  >
                    <input
                      className="text-black fixtext border-transparent outline-none w-full  bg-gray-100 dark:bg-transparent dark:text-white placeholder-gray-500"
                      id="apikey"
                      type="text"
                      name="apikey"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.apikey}
                      placeholder="API Key"
                    />
                    <ErrorMessage
                      name="apikey"
                      component="p"
                      className="mt-2 text-sm text-red-600"
                    />
                  </div>
                  <div
                    className="mb-4 dark:border-white border "
                    style={{ flexBasis: '33%' }}
                  >
                    <input
                      className="fixtext border-transparent outline-none w-full  bg-gray-100 dark:bg-transparent dark:text-white placeholder-gray-500"
                      id="apisecret"
                      type="text"
                      name="apisecret"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.apisecret}
                      placeholder="API Secret"
                    />
                    <ErrorMessage
                      name="apisecret"
                      component="p"
                      className="mt-2 text-sm text-red-600"
                    />
                  </div>
                </div>

                <div className="flex items-center  justify-between">
                  <button
                    className="bg-white hover:bg-white text-[#9E9E9EFF] font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                    style={{
                      backgroundColor: '#3bc48d',
                      outline: 'none',
                      color: 'white',
                    }}
                    disabled={isLoading}
                  >
                    {update ? 'Update' : 'Connect'}
                  </button>
                </div>
              </form>
            </div>
          );
        }}
      </Formik>
      <Table columns={Columns} data={allKeys} />
      <Modal isOpen={isModalOpen} onClose={closeModal} id={`count${mode}`}>
        <ModalHeader style={{ textAlign: 'center', marginBottom: '20' }}>
          Connecting...
        </ModalHeader>
        <ModalBody>
          <div className="numero_counting_wrapper">
            <div className="numero_shape" />
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default MyExchange;
