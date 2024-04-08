import React, { useState, useEffect } from 'react';
import '../styles/subscription.scss';
import { AiOutlineQrcode } from 'react-icons/ai';
import { QRCode } from 'react-qrcode-logo';
import { useDispatch, useSelector } from 'react-redux';
import MainLogo from 'assets/img/logo/qrlogo.png';
import { IoReturnDownBackSharp } from 'react-icons/io5';
import Barloader from 'react-spinners/BarLoader';
import { useHistory } from 'react-router-dom';
// import CryptoJS from 'crypto-js';
import { RiseLoader } from 'react-spinners';
// import RandomNumber from '../utils/random';
import PageTitle from '../components/Typography/PageTitle';
import SubscriptionMode from '../components/subscriptionmode';
import { Modal, ModalFooter, ModalBody, Button } from '@windmill/react-ui';
import {
  getMeoxValue,
  createJMOrder,
  getAllSubscriptions,
  createMeoxOrder,
} from 'store/actions/subscriptionAction';
import { affiliateUsers } from 'store/actions/affiliateActions';

function Subscription() {
  const History = useHistory();

  const dispatch = useDispatch();
  const [redirectLink, setredirectLink] = useState(false);
  const affiliate = useSelector((state) => state.affiliate);
  const [buyLinkSuccess, setBuyLinkSuccess] = useState({
    month: {},
    year: {},
  });
  const [modalData, setModalData] = useState({
    id: '',
    amount: '',
  });
  const [buyLink, setBuyLink] = useState({
    month: {},
    year: {},
  });
  const [plan, setPlan] = useState(true);
  const subscriptionData = useSelector((state) => state.subscriptionData);
  const { allSub } = subscriptionData;
  const [modalIsOpen, setIsOpen] = useState(false);

  const {
    location: { hash },
  } = History;

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    dispatch(getAllSubscriptions());
    dispatch(affiliateUsers());
  }, []);

  const changePlans = (e) => {
    setPlan(e);
  };

  const meoxToString = (meox) => {
    const value = parseFloat(meox);
    if (value / 1000000 >= 1) {
      return `${(value / 1000000).toFixed(2)}M`;
    }
    if (value / 1000 >= 1) {
      return `${(value / 1000).toFixed(2)}K`;
    }

    return value.toFixed(2);
  };

  return (
    <>
      <PageTitle>Subscription</PageTitle>
      <SubscriptionMode setPlan={changePlans} plan={plan} />
      <div id="subscriptionloader">
        <RiseLoader loading={redirectLink} color="#0FCFAC" />
      </div>
      <div id="subscription" style={{ opacity: redirectLink ? '0.4' : 1 }}>
        {plan && (
          <div className="w-4/4 wResp1 subsBg">
            <div className="grid lg:grid-cols-4 gap-4 mb-8 sm:grid-cols-1 md:grid-cols-1">
              {allSub.length > 0 &&
                allSub.map((sub, id) => (
                  <>
                    {sub.period === '30' && (
                      <div
                        className="col-span-1"
                        id={sub._id}
                        key={sub._id}
                        style={{
                          border:
                            hash === `#${sub._id}` ? '2px solid #76a9fa' : '',
                        }}
                      >
                        <div className="rounded sm:col-span-4 md:col-span-4 cards bg-white dark:bg-gray-800 dark:text-gray-300 shadow-md p-3 text-center">
                          <input
                            type="checkbox"
                            id={`card${id}`}
                            className="more"
                            aria-hidden="true"
                          />
                          <div className="content">
                            <div className="front">
                              <div className="inner">
                                <label
                                  htmlFor={`card${id}`}
                                  className="flipBtn text-[#046c4e] dark:text-white"
                                  aria-hidden="true"
                                >
                                  <AiOutlineQrcode
                                    onClick={async () => {
                                      const success = {
                                        ...buyLinkSuccess.month,
                                      };
                                      success[sub._id] = false;

                                      const paymentUrl = await createJMOrder(
                                        sub._id
                                      );
                                      const update = { ...buyLink.month };
                                      update[sub._id] = paymentUrl;
                                      setBuyLink({ ...buyLink, month: update });
                                      success[sub._id] = true;
                                      setBuyLinkSuccess({
                                        ...buyLinkSuccess,
                                        month: success,
                                      });
                                    }}
                                  />
                                </label>

                                <span className="font-bold text-sm pb-5">
                                  {sub.name}
                                </span>
                                <h3 className="font-bold text-3xl text-3bc48d">
                                  ${sub.amount}
                                </h3>
                                <h6 className="font-normal text-xs pb-4 text-3bc48d">
                                  /
                                  {sub.period === '30'
                                    ? 'Monthly'
                                    : 'Half Yearly'}
                                </h6>
                                <p className="font-normal text-xs text-gray-300 pb-2">
                                  {sub.name}
                                </p>
                                <p className="font-normal text-xs text-gray-300 pb-2">
                                  Access to bot list
                                </p>
                                <p className="font-normal text-xs text-gray-300 pb-2">
                                  Access to bot history
                                </p>
                                <p className="font-normal text-xs text-gray-300 pb-2">
                                  All Exchanges
                                </p>
                                <button
                                  type="button"
                                  className="goPrem text-xs font-bold pb-5"
                                  onClick={async () => {
                                    dispatch(getMeoxValue(sub.amount)).then(
                                      () => {
                                        setModalData({
                                          id: sub._id,
                                          amount: sub.amount,
                                        });
                                        openModal();
                                      }
                                    );
                                  }}
                                >
                                  Buy Now
                                </button>
                              </div>
                            </div>
                            <div className="back">
                              <label
                                htmlFor={`card${id}`}
                                className="return"
                                aria-hidden="true"
                              >
                                <IoReturnDownBackSharp
                                  size={24}
                                  color="#046c4e"
                                />
                              </label>
                              <div className="inner">
                                <div className="loader">
                                  <Barloader
                                    loading={!buyLinkSuccess.month[sub._id]}
                                    color="#0FCFAC"
                                  />
                                </div>
                                {buyLinkSuccess.month[sub._id] && (
                                  <>
                                    <QRCode
                                      value={buyLink.month[sub._id]}
                                      logoImage={MainLogo}
                                      fgColor="#0FCFAC"
                                      bgColor="transparent"
                                      size="180"
                                    />
                                    <p className="scanwithwallet">
                                      Scans the code with your cryptocurrency
                                      wallet
                                    </p>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                ))}
            </div>
          </div>
        )}
        {!plan && (
          <div className="w-4/4 wResp1 subsBg">
            <div className="grid lg:grid-cols-4 gap-4 mb-8 sm:grid-cols-1 md:grid-cols-1">
              {allSub.length > 0 &&
                allSub.map((sub, id) => (
                  <>
                    {sub.period === '180' && (
                      <div
                        className="col-span-1"
                        id={sub._id}
                        key={sub._id}
                        style={{
                          border:
                            hash === `#${sub._id}` ? '2px solid #76a9fa' : '',
                        }}
                      >
                        <div className="rounded sm:col-span-4 md:col-span-4 cards bg-white dark:bg-gray-800 dark:text-gray-300 shadow-md p-3 text-center">
                          <input
                            type="checkbox"
                            id={`card${id}`}
                            className="more"
                            aria-hidden="true"
                          />
                          <div className="content">
                            <div className="front">
                              <div className="inner">
                                <label
                                  htmlFor={`card${id}`}
                                  className="flipBtn text-[#046c4e] dark:text-white"
                                  aria-hidden="true"
                                >
                                  <AiOutlineQrcode
                                    onClick={async () => {
                                      const success = {
                                        ...buyLinkSuccess.year,
                                      };
                                      success[sub._id] = false;

                                      const paymentUrl = await createJMOrder(
                                        sub._id
                                      );
                                      const update = { ...buyLink.year };
                                      update[sub._id] = paymentUrl;
                                      setBuyLink({ ...buyLink, year: update });
                                      success[sub._id] = true;
                                      setBuyLinkSuccess({
                                        ...buyLinkSuccess,
                                        year: success,
                                      });
                                    }}
                                  />
                                </label>

                                <span className="font-bold text-sm pb-5">
                                  {sub.name}
                                </span>
                                <h3 className="font-bold text-3xl text-3bc48d">
                                  ${sub.amount}
                                </h3>
                                <h6 className="font-normal text-xs pb-4 text-3bc48d">
                                  /
                                  {sub.period === '30'
                                    ? 'Monthly'
                                    : 'Half Yearly'}
                                </h6>
                                <p className="font-normal text-xs text-gray-300 pb-2">
                                  {sub.name}
                                </p>
                                <p className="font-normal text-xs text-gray-300 pb-2">
                                  Access to bot list
                                </p>
                                <p className="font-normal text-xs text-gray-300 pb-2">
                                  Access to bot history
                                </p>
                                <p className="font-normal text-xs text-gray-300 pb-2">
                                  All Exchanges
                                </p>
                                <button
                                  type="button"
                                  className="goPrem text-xs font-bold"
                                  onClick={async () => {
                                    dispatch(getMeoxValue(sub.amount)).then(
                                      () => {
                                        setModalData({
                                          id: sub._id,
                                          amount: sub.amount,
                                        });
                                        openModal();
                                      }
                                    );
                                  }}
                                >
                                  Buy Now
                                </button>
                              </div>
                            </div>
                            <div className="back">
                              <label
                                htmlFor={`card${id}`}
                                className="return"
                                aria-hidden="true"
                              >
                                <IoReturnDownBackSharp
                                  size={24}
                                  color="#046c4e"
                                />
                              </label>
                              <div className="inner">
                                <div className="loader">
                                  <Barloader
                                    loading={!buyLinkSuccess.year[sub._id]}
                                    color="#0FCFAC"
                                  />
                                </div>
                                {buyLinkSuccess.year[sub._id] && (
                                  <>
                                    <QRCode
                                      value={buyLink.year[sub._id]}
                                      logoImage={MainLogo}
                                      fgColor="#0FCFAC"
                                      bgColor="transparent"
                                      size="180"
                                    />
                                    <p className="scanwithwallet">
                                      Scans the code with your cryptocurrency
                                      wallet
                                    </p>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                ))}
            </div>
          </div>
        )}
        <Modal isOpen={modalIsOpen} contentlabel="Example Modal">
          <ModalBody className="text-center custom-modal px-8 pt-6 pb-4">
            <h2 className="text-xl font-medium mb-6">
              How do you want to pay?
            </h2>
            <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
              <div>
                <h2 className="text-xl font-medium">
                  <b className="font-bold text-3xl text-3bc48d">
                    {meoxToString(subscriptionData.meoxValue)}
                  </b>
                  <span className="text-3bc48d"> MEOX</span>
                </h2>
                <p className="mb-2">
                  Avail. <b>{meoxToString(affiliate.affiliatebalance)}</b>
                </p>
                <Button
                  type="submit"
                  onClick={async () => {
                    setredirectLink(true);
                    const paymentUrl = await createMeoxOrder(modalData.id);
                    window.open(paymentUrl, '_blank');
                    closeModal();
                    setredirectLink(false);
                  }}
                  className="h-7 w-44 dark:bg-green-700"
                  disabled={
                    parseFloat(subscriptionData.meoxValue) >=
                    parseFloat(affiliate.affiliatebalance)
                  }
                >
                  Buy with Meox
                </Button>
              </div>
              <div style={{ height: '100%' }}>
                <p className="font-bold text-2xl">OR</p>
              </div>
              <div>
                {/* <img
                  style={{ width: '50%' }}
                  src="https://coindataflow.com/uploads/coins/justmoney.png?ts=1630513736"
                  alt="jm"
                /> */}
                <h2 className="text-xl font-medium">
                  <b className="font-bold text-3xl text-3bc48d">
                    {parseFloat(modalData.amount).toFixed(2)}
                  </b>
                  <span className="text-3bc48d"> $</span>
                </h2>
                <p className="mb-2"> With Just.Money </p>
                <Button
                  type="submit"
                  onClick={async () => {
                    setredirectLink(true);
                    const paymentUrl = await createJMOrder(modalData.id);
                    window.open(paymentUrl, '_blank');
                    closeModal();
                    setredirectLink(false);
                  }}
                  className="h-7 w-44 dark:bg-green-700"
                >
                  Buy with JM
                </Button>
              </div>
            </div>

            {/* <span className="flex justify-center text-3xl mb-6 text-red-500">
              <FiAlertTriangle />
            </span> */}
          </ModalBody>
          <ModalFooter className="flex-end">
            <Button
              type="submit"
              onClick={closeModal}
              className="h-7 bg-gray-100 dark:bg-gray-700 focus:bg-white dark:border-white"
            >
              Back
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </>
  );
}

export default Subscription;
