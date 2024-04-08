import React from 'react';
import { Link, useHistory } from 'react-router-dom';

function Menu({ botID, show = true }) {
  const history = useHistory();

  const asPath = history.location.pathname;

  const pathName = asPath.split('/');

  return (
    <ul id="topmenush" className="flex mb-5">
      {show && (
        <>
          <li
            onClick={() => {
              history.push(`/bot-status/${botID}`);
            }}
            className={`${
              pathName[1] === 'bot-status' ? 'bg-[#3bc48d] ' : 'bg-[#939393] '
            }text-[white]  rounded mx-1 my-[9px] px-2.5 py-[5px] text-[11px] md:text-[15px] text-center md:px-5 md:py-2.5`}
          >
            <Link to={`/bot-status/${botID}`}>View Status</Link>
          </li>
          <li
            onClick={() => {
              history.push(`/bot-history/${botID}`);
            }}
            className={`${
              pathName[1] === 'bot-history' ? 'bg-[#3bc48d] ' : 'bg-[#939393] '
            }text-[white]  rounded mx-1 my-[9px] px-2.5 py-[5px] text-[11px] md:text-[15px] text-center md:px-5 md:py-2.5`}
          >
            <Link to={`/bot-history/${botID}`}>View History</Link>
          </li>
        </>
      )}
      <li
        onClick={() => {
          history.push('/list-bot');
        }}
        className="text-[white] bg-[#939393] rounded mx-1 my-[9px] px-2.5 py-[5px] text-[11px] md:text-[15px] text-center md:px-5 md:py-2.5"
      >
        <Link to="/list-bot">Bots List</Link>
      </li>
      <li
        onClick={() => {
          history.push('/errors-list');
        }}
        className={`${
          pathName[1] === 'errors-list' ? 'bg-[#3bc48d] ' : 'bg-[#939393] '
        } text-[white]  rounded mx-1 my-[9px] px-2.5 py-[5px] text-[11px] md:text-[15px] text-center md:px-5 md:py-2.5`}
      >
        <Link to="/errors-list">Errors List</Link>
      </li>
    </ul>
  );
}

export default Menu;
