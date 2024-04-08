import React, { useEffect } from 'react';
import TableView from '../components/table/tableView';
import { getSubscriptionHistory } from 'store/actions/subscriptionAction';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';

function SubscriptionHistory() {
  const Columns = React.useMemo(
    () => [
      {
        ID: 1,
        Header: 'Subscription',
        accessor: 'subscription_id',
        isVisible: true,
        Cell: ({ cell }) => (
          <div className="subscription_id">
            <Link
              className="no-outline bg-blue-400  text-white font-bold py-1 px-4 whitespace-no-wrap text-sm"
              to={`/subscription#${cell.row.original.subscription_id}`}
            >
              View
            </Link>
          </div>
        ),
      },
      {
        ID: 2,
        Header: 'Amount',
        accessor: 'amount',
        isVisible: true,
        Cell: ({ cell }) => <div>${cell.row.original.amount}</div>,
      },
      {
        ID: 2,
        Header: 'Amount MEOX',
        accessor: 'amount_meox',
        isVisible: true,
        Cell: ({ cell }) => (
          <div>
            {cell.row.original.amount_meox
              ? cell.row.original.amount_meox
              : '-'}
          </div>
        ),
      },

      {
        ID: 4,
        Header: 'Payment Status',
        accessor: 'payment_status',
        isVisible: true,
        Cell: ({ cell }) => (
          <p style={{ color: cell.value == false ? 'red' : 'green' }}>
            {cell.value == false ? 'Pending' : 'Success'}
          </p>
        ),
      },

      {
        ID: 5,
        Header: 'Payment Link',
        accessor: 'transactionHash',
        isVisible: true,
        Cell: ({ cell }) => (
          <>
            {cell.row.original.payment_status && cell.value != null && (
              <div className="paymentlink">
                <a
                  target="_blank"
                  className="no-outline bg-green-400  text-white font-bold py-1 px-4 whitespace-no-wrap text-sm"
                  href={`https://bscscan.com/tx/${cell.value}`}
                  rel="noreferrer"
                >
                  Visit Link
                </a>
              </div>
            )}
            {cell.row.original.payment_status && cell.value == null && (
              <div>Paid with MEOX</div>
            )}
          </>
        ),
      },
      {
        ID: 6,
        Header: 'Payment Time',
        accessor: 'payment_time',
        isVisible: true,
        Cell: ({ cell }) => (
          <p>{moment(cell.value).format('D-MM-YYYY, H:mm:ss ')}</p>
        ),
      },
      // {
      //   ID: 6,
      //   Header: 'Order ID',
      //   accessor: 'orderid',
      //   isVisible: true,
      // },
    ],
    []
  );
  const dispatch = useDispatch();

  const subscriptionData = useSelector((state) => state.subscriptionData);
  const { subData } = subscriptionData;

  // const getSubscriptionName = async (e) => {
  //   const token = localStorage.getItem('token_key');
  //   const res = await fetch(
  //     `${process.env.REACT_APP_API_BASE_URL}/subscription/fetch-one/${e}`,
  //     {
  //       method: 'get',
  //       headers: new Headers({
  //         Authorization: `Bearer ${token}`,
  //         'Content-Type': 'application/json',
  //       }),
  //     }
  //   );

  //   const resData = await res.json();
  //   return resData?.name;
  // };

  useEffect(() => {
    dispatch(getSubscriptionHistory());
  }, []);
  return (
    <div className="w-full  my-8 sm:w-full dark:border-gray-400 overflow-scroll  no-scrollbar ring-1 ring-black ring-opacity-5">
      <TableView
        columns={Columns}
        data={subData || []}
        paginationVisible
        customPageSize={40}
      />
    </div>
  );
}

export default SubscriptionHistory;
