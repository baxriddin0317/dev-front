/* eslint-disable react/no-array-index-key */
/* eslint-disable no-shadow */
/* eslint-disable react/jsx-props-no-spreading */
import { useTable, useSortBy, usePagination } from 'react-table';
// import React, { memo, useContext, useState } from 'react';
import React, { memo, useState } from 'react';
import { ContextMenu, MenuItem } from 'react-contextmenu';
import { FaRegCopy, FaList, FaEllipsisV, FaShareAlt } from 'react-icons/fa';
import { RiSendPlaneFill, RiDeleteBin6Line } from 'react-icons/ri';
import '../../styles/table.css';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import ReactTooltip from 'react-tooltip';
import { BsArrowLeftShort, BsArrowRightShort } from 'react-icons/bs';
// import { WindmillContext } from '@windmill/react-ui';
import { Customselect } from '../../styles/styledComponents/table';
// import { Pagination,Customselect } from '../../styles/styledComponents/table';
import { isMobile } from 'react-device-detect';

const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef();
    const resolvedRef = ref || defaultRef;

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return (
      <div className="cat action">
        <label>
          <input type="checkbox" ref={resolvedRef} {...rest} />
          <span>All</span>
        </label>
      </div>
    );
    // <input type="checkbox" ref={resolvedRef} {...rest} />;
  }
);
function Table({
  columns,
  data,
  paginationVisible,
  selectVisible,
  customPageSize,
  tableID,
  // scroll = false,
}) {
  const [showEye, setShowEye] = useState(false);
  // const { mode } = useContext(WindmillContext);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    page,
    prepareRow,
    allColumns,
    getToggleHideAllColumnsProps,
    canPreviousPage,
    canNextPage,
    pageOptions,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
    setHiddenColumns,
  } = useTable(
    {
      columns,
      data,
    },
    useSortBy,
    usePagination
  );

  // const firstPageRows = rows.slice(0, 40);

  React.useEffect(() => {
    setHiddenColumns(
      columns
        .filter((column) => !column.isVisible)
        .map((column) => column.accessor)
    );
    if (customPageSize) {
      setPageSize(customPageSize);
    }
  }, [setHiddenColumns, columns, customPageSize, setPageSize]);

  return (
    <div className="px-1 sm:px-6 lg:px-8 mb-[1rem] shadow-md rounded bg-gray-50 dark:bg-gray-800 py-2">
      {/* {data.length < 1 && (
        <div
          role="status"
          className="relative -translate-x-1/2 -translate-y-1/2 top-2/4 left-[92%]"
        >
          <svg
            aria-hidden="true"
            className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
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
      )} */}
      {selectVisible && (
        <div className="samerow flex">
          <div id="hidecolumns">
            <div className="flex cursor-pointer">
              <p data-tip>
                {showEye && (
                  <AiFillEyeInvisible
                    size="24"
                    className="dark:text-white  text-3bc48d ml-2"
                    onClick={() => {
                      setShowEye(!showEye);
                    }}
                  />
                )}
                {!showEye && (
                  <AiFillEye
                    size="24"
                    className="dark:text-white text-3bc48d ml-2 mb-4"
                    onClick={() => {
                      setShowEye(!showEye);
                    }}
                  />
                )}
              </p>
              <ReactTooltip disable={isMobile}>
                <span className="text-sm font-medium ">Hide Columns</span>
              </ReactTooltip>
            </div>
            {showEye && (
              <IndeterminateCheckbox {...getToggleHideAllColumnsProps()} />
            )}

            {showEye &&
              allColumns.map((column) => (
                <div className="cat action" key={column.id}>
                  <label>
                    <input type="checkbox" {...column.getToggleHiddenProps()} />{' '}
                    <span>{column.Header}</span>
                  </label>
                </div>
              ))}
          </div>
          <Customselect>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
              }}
            >
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
          </Customselect>
        </div>
      )}
      <div className="overflow-x-auto">
        <table
          {...getTableProps()}
          className="min-w-full divide-y divide-gray-300 table-auto"
          id={tableID}
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => {
                  return (
                    // Add the sorting props to control sorting. For this example
                    // we can add them into the header props
                    <th
                      className={`${
                        column.isSticky
                          ? `sticky ${
                              column.isStickyLeft
                                ? 'left-[53px]'
                                : 'left-[-1px]'
                            } bg-white dark:bg-gray-800`
                          : ''
                      } py-[3px] pl-2 pr-3 text-center text-sm font-semibold dark:text-white text-black sm:pl-0`}
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                    >
                      {column.render('Header')}
                      {/* Add a sort direction indicator */}
                      <span>
                        {column.isSorted
                          ? column.isSortedDesc
                            ? ' 🔽'
                            : ' 🔼'
                          : ''}
                      </span>
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()} className="divide-y divide-gray-200">
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    // console.log(cell.column.Header ,'cell');
                    return (
                      <td
                        className={`${
                          cell.column.isSticky
                            ? `sticky ${
                                cell.column.isStickyLeft
                                  ? 'left-[53px]'
                                  : 'left-[-1px]'
                              } bg-white dark:bg-gray-800`
                            : ''
                        }  py-[3px] pl-2 pr-3 text-center text-[12px] font-medium dark:text-white text-black sm:pl-0`}
                        {...cell.getCellProps()}
                      >
                        {cell.render('Cell')}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {paginationVisible && rows.length > pageSize && (
        <div className="w-1/2  mx-auto my-0 p-[5px] shadow-[0_3px_6px_rgba(0,0,0,0.16),0_3px_6px_rgba(0,0,0,0.23)] rounded flex justify-between dark:border dark:border-solid dark:border-[white] ">
          <span className="flex align-middle justify-items-center text-[13px] content-center items-center">
            <BsArrowLeftShort className="outline-none dark:text-white text-[#000]" />
            <button
              className="outline-none dark:text-white text-[#000] text-[10px] md:text-[14px]"
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
            >
              Prev
            </button>{' '}
          </span>

          <div className="flex items-center flex-wrap gap-[6px]">
            {pageOptions.map((page, index) => (
              <button
                type="button"
                value={page + 1}
                key={index}
                onClick={(e) => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0;
                  gotoPage(page);
                }}
                className={`${
                  pageIndex + 1 === page + 1
                    ? 'bg-[#000] text-white dark:bg-white dark:text-[#000] dark:border dark:border-solid dark:border-white'
                    : 'dark:text-white text-black'
                } rounded-[50%] md:text-[12px] text-[10px] h-[12px] md:h-[15px] md:w-[15px] w-[12px] md:leading-[15px] leading-3 outline-none dark:text-black`}
              >
                {page + 1}
              </button>
            ))}
          </div>

          <span className="flex align-middle justify-items-center text-[13px] content-center items-center">
            <button
              className="outline-none dark:text-white text-[#000] text-[10px] md:text-[14px]"
              onClick={() => nextPage()}
              disabled={!canNextPage}
            >
              Next
            </button>
            <BsArrowRightShort className="outline-none dark:text-white text-[#000]" />
          </span>
        </div>
      )}
      {/* <br /> */}
      <ContextMenu id="contextmenu">
        <MenuItem data={{ copy: 'MI50' }}>
          <FaRegCopy className="copy" />
          <span>Copy</span>
        </MenuItem>
        <MenuItem>
          <FaEllipsisV className="openwith" />
          <span>Open with</span>
        </MenuItem>
        <MenuItem>
          <FaList className="watchlist" />
          <span>Add to watchlist</span>
        </MenuItem>
        <MenuItem>
          <RiSendPlaneFill className="send" />
          <span>Send</span>
        </MenuItem>
        <MenuItem>
          <RiDeleteBin6Line className="delete" />
          <span>Delete</span>
        </MenuItem>
        <MenuItem>
          <FaShareAlt className="share" />
          <span>Share</span>
        </MenuItem>
      </ContextMenu>
      {selectVisible && (
        <div className=" bg-gray-50 dark:bg-gray-800 dark:text-gray-300 text-[12px]">
          Showing {pageSize > rows.length ? rows.length : pageSize} out of{' '}
          {rows.length} result
        </div>
      )}
    </div>
  );
}

export default memo(Table);
