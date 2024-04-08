import React, { useEffect, useState, useContext, useRef } from 'react';
import Table from '../table/tableView';
import * as Yup from 'yup';
import { Formik, ErrorMessage } from 'formik';
import { connectAgainAPI } from 'store/actions/connectAgainAction';
import { deleteKey } from 'store/actions/deleteKeyAction';
import '../../styles/countdown.css';
import { FaTimes } from 'react-icons/fa';
import moment from 'moment';
import ReactTooltip from 'react-tooltip';
import StepThree from 'assets/img/spotenablesteps/03.jpeg';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  WindmillContext,
} from '@windmill/react-ui';
import { IoInformationCircle } from 'react-icons/io5';

import { useDispatch, useSelector } from 'react-redux';
import { getKeysData } from '../../store/actions/listKeysAction';
import { addKeys } from '../../store/actions/addKeysAction';
import Exchanges from '../../utils/bot/Exchanges';
import ComboBox from 'components/combobox/ComboBox';

const schema = Yup.object().shape({
  exchanges: Yup.object().required('*Exchange is required.'),
  apikey: Yup.string().required('*API Key is required.'),
  apisecret: Yup.string().required('*API Secret is required.'),
  passphrase: Yup.string().when('exchanges', {
    is: 'kucoin',
    then: Yup.string()
      .matches(/^[^\W_]+$/, '*Passphrase cannot contain special characters')
      .required('*Passphrase is required for KuCoin.'),
    otherwise: Yup.string(),
  }),
});

function MyExchange() {
  const formikRef = useRef();

  const { mode } = useContext(WindmillContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [spotModal, setspotModal] = useState(false);
  const [currentExchange, setCurrentExchange] = useState('');
  function closeModal() {
    setIsModalOpen(false);
    setDeleteModal(false);
    setspotModal(false);
  }
  const Columns = React.useMemo(
    () => [
      {
        Header: 'Exchange',
        accessor: 'exchange',
        isVisible: true,
      },
      {
        Header: 'Connection',
        accessor: 'connected',
        isVisible: true,
        Cell: ({ cell }) => (
          <p
            className={`${
              cell.row.original.connected === '0'
                ? 'bg-red-500'
                : cell.row.original.connected === '1'
                ? 'bg-3bc48d'
                : cell.row.original.connected === '2'
                ? 'bg-3bc48d'
                : ''
            } text-white text-sm py-1 rounded`}
          >
            {cell.row.original.connected === '0'
              ? 'Not Connected'
              : cell.row.original.connected === '1'
              ? 'Connected'
              : cell.row.original.connected === '2'
              ? 'Connected'
              : cell.row.original.connected === '3'
              ? 'Error'
              : ''}
          </p>
        ),
      },
      {
        Header: 'Error',
        accessor: 'errorMessage',
        isVisible: true,
        Cell: ({ cell }) => (
          <>
            <p>
              {cell.row.original.connected === '0' ? (
                'Invalid API Key'
              ) : (
                <>
                  {cell.row.original.errorMessage === 'SPOT_DISABLED'
                    ? 'Spot trading not enabled'
                    : cell.row.original.errorMessage}
                </>
              )}
            </p>
            {cell.row.original.errorMessage === 'SPOT_DISABLED' ? (
              <IoInformationCircle
                className="spotdisable"
                onClick={() => {
                  setspotModal(true);
                }}
              />
            ) : (
              ''
            )}
          </>
        ),
      },
      {
        Header: 'Expiration	',
        accessor: 'expiration',
        isVisible: true,
        Cell: ({ cell }) => (
          <p>
            {cell.row.original.expiration
              ? moment(cell.row.original.expiration).format(
                  'D-MM-YYYY, H:mm:ss '
                )
              : '-'}
          </p>
        ),
      },
      {
        Header: 'Connect Again',
        isVisible: true,
        Cell: ({ cell }) => {
          const end = moment();
          const duration = moment.duration(
            end.diff(cell.row.original.connection_tried)
          );
          const minutes = duration.asMinutes();

          return (
            <>
              {minutes <= 5 && cell.row.original.connected !== '2' ? (
                <>
                  <IoInformationCircle
                    className="connectinfo"
                    data-tip="hello world"
                  />
                  <ReactTooltip>
                    <span className="text-sm ">
                      You can connect again after 5 minute
                    </span>
                  </ReactTooltip>
                </>
              ) : (
                ''
              )}

              <button
                onClick={() => {
                  dispatch(connectAgainAPI(cell.row.original.exchange));
                }}
                className={`no-outline ${
                  (cell.row.original.connected == '2' &&
                    cell.row.original.errorMessage == null) ||
                  minutes <= 5
                    ? 'bg-gray-50'
                    : 'bg-green-100'
                }  text-white font-bold py-1 px-4 whitespace-no-wrap text-sm connectagain rounded`}
                disabled={
                  !!(
                    (cell.row.original.connected == '2' &&
                      cell.row.original.errorMessage == null) ||
                    minutes <= 5
                  )
                }
              >
                Connect Again
              </button>
            </>
          );
        },
      },
      {
        Header: 'Delete API',
        isVisible: true,
        Cell: ({ cell }) => (
          <div className="block">
            <button
              onClick={() => {
                setDeleteModal(true);
                setCurrentExchange(cell.row.original.exchange);
              }}
              className="no-outline bg-red-600 rounded  text-white font-bold py-1 text-sm px-4 deletekey whitespace-no-wrap"
            >
              Delete Key
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const dispatch = useDispatch();

  const allKeysData = useSelector((state) => state.listKeys);

  const { allKeys } = allKeysData;
  const [update, setupdate] = useState(allKeys.length == 0);

  useEffect(() => {
    dispatch(getKeysData());
    if (isModalOpen) {
      setTimeout(() => {
        setIsModalOpen(false);
        dispatch(getKeysData());
      }, 10000);
    }
  }, [dispatch, isModalOpen]);
  // console.log(allKeys);
  return (
    <div className="w-full  my-8 sm:w-full overflow-scroll dark:border-gray-400 rounded-lg ">
      <Formik
        innerRef={formikRef}
        validationSchema={schema}
        validateOnChange={false}
        validateOnBlur={false}
        initialValues={{
          exchanges: '',
          apikey: '',
          apisecret: '',
          passphrase: '',
        }}
        onSubmit={(values) => {
          if (values.apisecret !== '' && !/^[X]*$/.test(values.apisecret)) {
            dispatch(
              addKeys({
                exchange: values.exchanges.value,
                key: values.apikey,
                secret: values.apisecret,
                passphrase: values.passphrase,
              })
            ).then(() => {
              setIsModalOpen(true);
            });
          }
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
              setFieldValue(
                'exchanges',
                Exchanges.find((x) => x.value === allKeys[0].exchange)
              );
              setFieldValue('apikey', allKeys[0].api_key);
              setFieldValue('apisecret', allKeys[0].secret_key);
              setFieldValue('passphrase', allKeys[0].passphrase || '');
            }
          }, [allKeys, setFieldValue, dispatch]);
          return (
            <div className="md:w-full lg:w-full mt-[1rem]  sm:w-full dark:border-gray-400 rounded-lg">
              <form
                className="bg-gray-50 dark:bg-gray-800  shadow-md rounded px-8 pt-6 pb-8 mb-4"
                onSubmit={handleSubmit}
                id="listbot"
              >
                <div className="flex justify-between filter">
                  <div className="mb-4" style={{ flexBasis: '25%' }}>
                    <ComboBox
                      title="Exchange"
                      name="exchanges"
                      selectedValue={values.exchanges.label}
                      setField={setFieldValue}
                      dataList={Exchanges}
                      value={values.exchanges.label}
                      onChange={(selectedOption) => {
                        const filteredkeys = allKeys.filter(
                          (x) => x.exchange === selectedOption.value
                        );
                        setFieldValue('exchanges', selectedOption);
                        setFieldValue(
                          'apikey',
                          filteredkeys.length > 0 ? filteredkeys[0].api_key : ''
                        );
                        setFieldValue(
                          'apisecret',
                          filteredkeys.length > 0
                            ? filteredkeys[0].secret_key
                            : ''
                        );
                        setFieldValue(
                          'passphrase',
                          filteredkeys.length > 0
                            ? filteredkeys[0].passphrase || ''
                            : ''
                        );
                        setupdate(filteredkeys.length > 0);
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
                  <div className="mb-4 md:mt-[14px] basis-[29%] relative">
                    <label
                      htmlFor="apikey"
                      className="absolute -top-2 left-2 inline-block bg-white dark:bg-gray-900 dark:text-green-100 text-xs font-medium text-gray-900"
                    >
                      API Key
                    </label>
                    <input
                      className="block w-full rounded-md border-0 pl-3 py-1 dark:text-[#00e5a5] text-[#00e5a5] dark:bg-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-300 focus:ring-1 focus:ring-inset  sm:text-sm sm:leading-7"
                      id="apikey"
                      type="text"
                      name="apikey"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.apikey}
                      placeholder="Paste your API-Key here"
                    />
                    <ErrorMessage
                      name="apikey"
                      component="p"
                      className="mt-2 text-sm text-red-600"
                    />
                  </div>
                  <div className="mb-4 md:mt-[14px] basis-[29%] relative">
                    <label
                      htmlFor="apisecret"
                      className="absolute -top-2 left-2 inline-block bg-white dark:bg-gray-900 dark:text-green-100 text-xs font-medium text-gray-900"
                    >
                      API Secret
                    </label>
                    <input
                      className="block w-full rounded-md border-0 pl-3 py-1 dark:text-green-100 text-gray-900 dark:bg-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-300 focus:ring-1 focus:ring-inset  sm:text-sm sm:leading-7"
                      id="apisecret"
                      type="text"
                      name="apisecret"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.apisecret}
                      placeholder="Paste your API Secret here"
                    />
                    <ErrorMessage
                      name="apisecret"
                      component="p"
                      className="mt-2 text-sm text-red-600"
                    />
                  </div>
                  {values.exchanges.value === 'kucoin' && (
                    <div className="mb-4 md:mt-[14px] basis-[29%] relative">
                      <label
                        htmlFor="passphrase"
                        className="absolute -top-2 left-2 inline-block bg-white dark:bg-gray-900 dark:text-green-100 text-xs font-medium text-gray-900"
                      >
                        Passphrase
                      </label>
                      <input
                        className="block w-full rounded-md border-0 pl-3 py-1 dark:text-green-100 text-gray-900 dark:bg-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-300 focus:ring-1 focus:ring-inset sm:text-sm sm:leading-7"
                        id="passphrase"
                        type="text"
                        name="passphrase"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.passphrase}
                        placeholder="No special character! Enter your Passphrase here."
                      />
                      <ErrorMessage
                        name="passphrase"
                        component="p"
                        className="mt-2 text-sm text-red-600"
                      />
                    </div>
                  )}
                </div>

                <div className="flex items-center  justify-between">
                  <button
                    className="bg-green-100 hover:bg-amber-500 text-gray-900 outline-none font-bold py-1 px-4 rounded"
                    type="submit"
                  >
                    {update ? 'Update' : 'Connect'}
                  </button>
                </div>
              </form>
            </div>
          );
        }}
      </Formik>
      <Table columns={Columns} data={allKeys} scroll tableID="myexchange" />
      {/* <div>
        <Button onClick={openModal}>Open modal</Button>
      </div> */}
      <Modal isOpen={isModalOpen} onClose={closeModal} id={`count${mode}`}>
        <ModalHeader style={{ textAlign: 'center', marginBottom: '20' }}>
          Connecting...
        </ModalHeader>
        <ModalBody>
          <div className="bg-transparent mx-auto my-auto w-60 h-60">
            <div className="numero_shape" />
          </div>
        </ModalBody>
      </Modal>
      <Modal isOpen={deleteModal} onClose={closeModal} id={`count${mode}`}>
        <ModalHeader style={{ textAlign: 'center', marginBottom: '20' }} />
        <ModalBody>
          <div className="modal-confirm text-gray-300">
            <div className="icon-box w-20 h-20 text-center">
              <FaTimes />
            </div>
            <h4 className="text-center font-2xl w-100 m-8">Are you sure?</h4>
            <p className="font-sm w-3/4 text-center">
              Do you really want to delete the {currentExchange} key? <br />
              This process cannot be undone.
            </p>
          </div>
        </ModalBody>
        <ModalFooter className="justify-center">
          <button
            onClick={closeModal}
            className="bg-gray-400  text-white font-bold py-2 px-4 rounded"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              dispatch(deleteKey(currentExchange));
              setDeleteModal(false);
              formikRef.current?.resetForm();
              setupdate(false);
            }}
            className="bg-red-500  text-white font-bold py-2 px-4 rounded"
          >
            Delete
          </button>
        </ModalFooter>
      </Modal>
      <Modal isOpen={spotModal} onClose={closeModal} id={`count${mode}`}>
        <ModalHeader style={{ textAlign: 'center', marginBottom: '20' }} />
        <ModalBody>
          <h3 className="mb-2">Click on this link</h3>
          <div
            className="outline-none border-none p-4 mb-4 text-sm text-gray-900 bg-green-100 rounded-lg dark:bg-green-100 dark:text-gray-900"
            role="alert"
          >
            <a
              href="https://www.binance.com/en/my/settings/api-management"
              target="_blank"
              rel="noopener noreferrer"
              className="outline-none border-none"
            >
              https://www.binance.com/en/my/settings/api-management
            </a>
          </div>
          <ol className="list-decimal	mb-4 ml-4">
            <li>Edit restrictions </li>
            <li> Enable Spot & Margin Trading </li>
            <li>Press Save </li>
            <li>Press Connect again in Metronix</li>
          </ol>
          <img src={StepThree} alt="" srcSet="" />
        </ModalBody>
        <ModalFooter className="deletefooter justify-center mt-8">
          <button
            onClick={closeModal}
            className="bg-gree-100  text-gray-900 font-bold py-2 px-4 rounded ring-inset"
          >
            Close
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default MyExchange;
