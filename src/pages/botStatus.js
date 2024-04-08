import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { isMobile } from 'react-device-detect';
import TableView from '../components/table/tableView';
import { getBotStatusData } from '../store/actions/botStatusAction';
import { cancelBid, activateBid } from '../store/actions/cancelBidAction';
import Menu from '../components/menu/menu';
// import { getBotStatusSettings } from '../store/actions/userSettingsAction';

function BotStatus() {
  const Columns = React.useMemo(
    () => [
      {
        ID: 1,
        Header: 'Order No',
        accessor: 'order_no',
        isVisible: !isMobile,
      },
      {
        ID: 2,
        Header: 'Pair',
        accessor: 'symbol',
        isVisible: true,
      },
      {
        ID: 3,
        Header: 'Type',
        accessor: 'side',
        isVisible: true,
      },
      {
        ID: 4,
        Header: 'Date',
        accessor: 'created_at',
        isVisible: true,
        Cell: ({ cell }) => (
          <p className="whitespace-nowrap">
            {moment(cell.value).format('D-MM-YYYY, H:mm:ss ')}
          </p>
        ),
      },
      {
        ID: 5,
        Header: 'Amount',
        accessor: 'origQty',
        isVisible: !isMobile,
      },
      {
        ID: 6,
        Header: 'Price',
        accessor: 'price',
        isVisible: !isMobile,
      },
      {
        ID: 7,
        Header: 'Round',
        accessor: 'round',
        isVisible: !isMobile,
      },
      {
        ID: 8,
        Header: 'Status',
        accessor: 'status',
        isVisible: !isMobile,
      },
      {
        ID: 9,
        Header: 'Bot ID',
        accessor: 'bot_id',
        isVisible: !isMobile,
      },
      {
        ID: 10,
        Header: 'Active',
        accessor: 'active',
        isVisible: !isMobile,
        Cell: ({ cell }) =>
          cell.row.original.active === 0 ? (
            <button
              onClick={() => {
                let x;
                dispatch(activateBid(cell.row.original.id));
                dispatch(getBotStatusData(id));
                return x;
              }}
              className="rounded bg-green-600 p-1 text-white border-none outline-none"
            >
              Activate
            </button>
          ) : (
            1
          ),
      },
      {
        ID: 11,
        Header: 'Error',
        accessor: 'error',
        isVisible: !isMobile,
      },
      {
        ID: 12,
        Header: 'Actions',
        accessor: 'actions',
        isVisible: true,
        Cell: ({ cell }) =>
          cell.row.original.status !== 'canceled' ? (
            <button
              onClick={() => {
                let x;
                if (window.confirm('Are you sure to cancel bid?') == true) {
                  dispatch(cancelBid(cell.row.original.orderId, id));
                  dispatch(getBotStatusData(id));
                }
                return x;
              }}
              className="rounded bg-red-600 p-1 text-white border-none outline-none"
            >
              Cancel
            </button>
          ) : cell.row.original.active === 0 ? (
            'Cancelled'
          ) : (
            ''
          ),
      },
    ],
    []
  );
  const params = useParams();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.botStatus);

  const { id } = params;

  const { botStatusData, loading } = data;

  const botListSettings = useSelector((state) => state.settings);
  const colData = botListSettings.botStatusSettings;

  const newColArr = [];
  Columns.map((col, i) => {
    if (col.Cell) {
      newColArr.push({
        ID: col.ID,
        isVisible: colData[i]?.isVisible,
        accessor: col.accessor,
        Cell: col.Cell && col.Cell,
        Header: col.Header,
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
    dispatch(getBotStatusData(id));
    // dispatch(getBotStatusSettings());
  }, [dispatch, id]);
  return (
    <div className="w-full  my-8 sm:w-full dark:border-gray-400 overflow-scroll  no-scrollbar ring-1 ring-black ring-opacity-5">
      <Menu botID={id} />
      {loading && (
        <div
          role="status"
          className="absolute -translate-x-1/2 -translate-y-1/2 left-2/4 top-2/4"
        >
          <svg
            aria-hidden="true"
            className="w-12 h-12 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-[#00e5a5]"
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
      <TableView
        columns={newColArr}
        data={botStatusData}
        paginationVisible
        customPageSize={40}
      />
    </div>
  );
}

export default BotStatus;
