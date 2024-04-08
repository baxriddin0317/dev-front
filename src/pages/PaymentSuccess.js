import React, { useEffect, useContext } from 'react';
import {
  Card,
  CardBody,
  Modal,
  ModalHeader,
  ModalBody,
  WindmillContext,
} from '@windmill/react-ui';
import { useParams } from 'react-router-dom';
import { getSubscriptionHistory } from 'store/actions/subscriptionAction';
import { useDispatch, useSelector } from 'react-redux';
import { checkOrderStatus } from 'store/actions/generateBuyLinkAction';
import '../styles/countdown.css';
import YesGif from 'assets/gif/yes.gif';
import YesDarkGif from 'assets/gif/yesdark.gif';

// import CryptoJS from 'crypto-js';

function PaymentSuccess() {
  const Param = useParams();

  const { mode } = useContext(WindmillContext);
  const dispatch = useDispatch();

  const { id } = Param;

  const subscriptionData = useSelector((state) => state.subscriptionData);
  const { subData } = subscriptionData;

  const buyLinkData = useSelector((state) => state.buyData);

  const paidSubscription = [];
  let hash = '';
  let subID = '';
  if (subData.length > 0) {
    subData?.map((sub) => {
      if (sub.orderid == id) {
        paidSubscription.push(sub);
        hash += sub.hash;
        subID += sub._id;
      }
    });
  }

  if (hash && subID) {
    dispatch(checkOrderStatus(hash, subID));
  }

  useEffect(() => {
    dispatch(getSubscriptionHistory());
  }, []);

  return (
    <div className="createbotbox w-full my-8 sm:w-full overflow-hidden border border-gray-400 dark:border-gray-400 rounded-lg ring-1 ring-black ring-opacity-5">
      <Card colored className=" w-3/6 mx-auto ">
        <CardBody className="flex flex-col">
          {/* <h2 className="mb-4 font-semibold text-black dark:text-white text-center">
            Payment Successfull
          </h2>
          <h2 className="mb-4 font-semibold text-black dark:text-white text-center">
            {buyLinkData.paymentDone
              ? 'Subscription Activated'
              : 'Waiting for subscription to activate...'}
          </h2> */}
          <Modal isOpen={!buyLinkData.paymentDone} id="countsuccess">
            <ModalHeader style={{ textAlign: 'center', marginBottom: '20' }}>
              Payment Successfull
              {mode == 'dark' ? (
                <img className="successimg" src={YesDarkGif} alt="" />
              ) : (
                <img className="successimg" src={YesGif} alt="" />
              )}
            </ModalHeader>
            <ModalBody>
              <p className="mb-4">
                Your payment history will be updated in 1 minute
              </p>
              <a
                href="/settings/subscription-history"
                className="mx-auto bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
              >
                Check History
              </a>
            </ModalBody>
          </Modal>
        </CardBody>
      </Card>
    </div>
  );
}

export default PaymentSuccess;
