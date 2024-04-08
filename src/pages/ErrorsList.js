import React, { useEffect } from 'react';
import { isMobile } from 'react-device-detect';
import TableView from '../components/table/tableView';
import Menu from '../components/menu/menu';
// import { getBotErrorSettings } from 'store/actions/userSettingsAction';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBidErrorData } from 'store/actions/errorOrderAction';
import { Link } from 'react-router-dom';
import moment from 'moment';

function ErrorsList() {
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
        isVisible: true,
        accessor: 'created_at',
        Cell: ({ cell }) => (
          <p>{moment(cell.value).format('D-MM-YYYY, H:mm:ss ')}</p>
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
        Cell: ({ cell }) => (
          <Link to={`/bot-status/${cell.value}`}>{cell.value}</Link>
        ),
      },
      {
        ID: 10,
        Header: 'Active',
        accessor: 'active',
        isVisible: !isMobile,
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
          cell.row.original.active === 1 &&
          cell.row.original.status == 'NEW' ? (
            <button
              onClick={() => {
                let x;
                if (window.confirm('Are you sure to cancel bid?') == true) {
                }
                return x;
              }}
              className="rounded bg-red-600 p-1 text-white border-none outline-none"
            >
              Cancel
            </button>
          ) : cell.row.original.active === 2 ? (
            'Cancelled'
          ) : (
            ''
          ),
      },
    ],
    []
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBidErrorData());
  }, []);

  const botListSettings = useSelector((state) => state.settings);
  const { botErrorData } = useSelector((state) => state.errorBids);
  const colData = botListSettings.botErrorSettings;

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
    // dispatch(getBotErrorSettings());
  }, []);
  return (
    <div className="w-full  my-8 sm:w-full dark:border-gray-400 overflow-scroll  no-scrollbar ring-1 ring-black ring-opacity-5">
      <Menu show={false} />
      <TableView
        columns={newColArr}
        data={botErrorData}
        paginationVisible
        customPageSize={40}
        selectVisible
      />
    </div>
  );
}

export default ErrorsList;
