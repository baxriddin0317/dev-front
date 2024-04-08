import React, { useState, useEffect } from 'react';
import Table from '../components/table/tableView';
import { fetchContestBots } from 'store/actions/botStatusAction';
import moment from 'moment';
import Loader from '../components/loader/Loader';

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

const columns = [
  {
    Header: 'Profit',
    accessor: 'profit',
    isVisible: true,
    isSticky: true,
    Cell: ({ cell }) => (
      <p className="text-green-100">{Number(cell.value).toFixed(2)}%</p>
    ),
  },
  {
    Header: 'Pair',
    accessor: 'symbol',
    isVisible: true,
    isSticky: true,
    isStickyLeft: true,
  },
  {
    Header: 'Date',
    accessor: 'created_at',
    isVisible: true,
    Cell: ({ cell }) => <p>{moment(cell.value).format('DD-MM-YYYY')}</p>,
  },
  {
    Header: 'Rounds',
    accessor: 'rounds',
    isVisible: true,
  },
  {
    Header: 'Exchange',
    accessor: 'exchange',
    isVisible: true,
    Cell: ({ cell }) => <p>{cell.value.toUpperCase()}</p>,
  },
  {
    Header: 'Start',
    accessor: 'start',
    isVisible: true,
    Cell: ({ cell }) => <p>{valueToString(cell.value)}</p>,
  },
  {
    Header: 'Lot',
    accessor: 'lot',
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
    Header: 'Options',
    accessor: 'botType',
    isVisible: true,
  },
  {
    Header: 'User',
    accessor: 'user.username',
    isVisible: true,
  },
  {
    Header: 'Country',
    accessor: 'user.country.label',
    isVisible: true,
  },
];

const contests = {
  1: 'Contest',
  2: 'The Sprinter',
  3: 'The Evergreen',
  4: 'The King of rounds',
  5: 'The Moneymaker',
  6: 'Promo Profit',
  7: 'Promo Sprinter',
};

function Contest() {
  const [contestData, setContestData] = useState({
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
    7: [],
  });
  const [contestId, setContestId] = useState(0);

  useEffect(() => {
    fetchContestBots(1).then((data) => {
      const temp = { ...contestData };
      temp[1] = data;
      setContestData(temp);
      setContestId(1);
    });
  }, []);

  const chooseContest = async (contest) => {
    const id = Number(contest);
    if (contestData[id].length == 0) {
      const data = { ...contestData };
      data[id] = await fetchContestBots(id);
      setContestData(data);
    }
    setContestId(id);
  };

  if (contestId == 0) {
    return <Loader />;
  }
  return (
    <div className="w-full my-4 overflow-hidden rounded-lg">
      <div className="bg-gray-50 dark:bg-gray-800 shadow-md rounded p-4 grid xxl:grid-cols-6 lg:grid-cols-4  md:grid-cols-4 grid-cols-3 gap-2">
        {Object.keys(contests).map((key) => {
          return (
            <div>
              <button
                className="h-12 text-[10px] sm:text-[16px] align-bottom inline-flex items-center justify-center cursor-pointer transition-colors duration-150 focus:outline-none px-5 py-3 rounded-lg 
                text-white bg-green-100 active:bg-green-100  hover:bg-amber-500 font-bold focus:ring focus:ring-gray-400 w-full "
                onClick={() => chooseContest(key)}
              >
                {contests[key]}
              </button>
            </div>
          );
        })}
      </div>
      {/* <PageTitle>{contests[contestId]}</PageTitle> */}
      <h1 className="my-2 text-[1rem] font-bold text-gray-700 dark:text-gray-300">
        {contests[contestId]}
      </h1>
      <Table
        columns={columns}
        data={contestData[contestId]}
        customPageSize="20"
      />
    </div>
  );
}

export default Contest;
