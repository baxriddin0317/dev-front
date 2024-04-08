import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';
import PageTitle from '../components/Typography/PageTitle';
import BotListColumns from '../components/preferences/botListColumns';
import BotStatusColumns from '../components/preferences/botStatusColumns';
import BotHistoryColumns from '../components/preferences/botHistoryColumns';
import DarkMode from '../components/darkmode';
import {
  // getBotHistorySettings,
  // getBotStatusSettings,
  // getBotErrorSettings,
  // getBotListSettings,
  // getCreateBotSettings,
  addBotSettings,
  getAllBotSettings,
} from '../store/actions/userSettingsAction';
import '../styles/preference.scss';
import CreateBotSettings from 'components/preferences/createBotSettings';
import BotErrorColumns from 'components/preferences/botErrorColumns';

function Preferences() {
  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(getBotHistorySettings());
    // dispatch(getBotStatusSettings());
    // dispatch(getBotErrorSettings());
    // // dispatch(getBotListSettings());
    // // dispatch(getCreateBotSettings);
    dispatch(getAllBotSettings());
  });
  return (
    <>
      <PageTitle>Preferences</PageTitle>

      <div className="container px-5 relative" id="preference">
        <button
          className="mr-[40px] outline-none bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded absolute right-0"
          onClick={() => {
            dispatch(addBotSettings(true));
          }}
        >
          Reset
        </button>
        <br />
        <br />
        <Accordion allowZeroExpanded>
          <AccordionItem key={0}>
            <AccordionItemHeading className="shadow-lg dark:bg-gray-800 dark:text-gray-300 bg-white">
              <AccordionItemButton>Bot List Columns</AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel className="flex shadow-lg dark:bg-gray-800 dark:text-gray-300 px-10">
              <BotListColumns />
            </AccordionItemPanel>
          </AccordionItem>
          <AccordionItem key={1}>
            <AccordionItemHeading className="shadow-lg dark:bg-gray-800 dark:text-gray-300 bg-white">
              <AccordionItemButton>Bot Status Columns</AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel className="shadow-lg dark:bg-gray-800 dark:text-gray-300 flex  px-10">
              <BotStatusColumns />
            </AccordionItemPanel>
          </AccordionItem>
          <AccordionItem key={2}>
            <AccordionItemHeading className="shadow-lg dark:bg-gray-800 dark:text-gray-300 bg-white">
              <AccordionItemButton>Bot History Columns</AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel className="shadow-lg dark:bg-gray-800 dark:text-gray-300 flex  px-10">
              <BotHistoryColumns />
            </AccordionItemPanel>
          </AccordionItem>
          <AccordionItem key={3}>
            <AccordionItemHeading className="shadow-lg dark:bg-gray-800 dark:text-gray-300 bg-white">
              <AccordionItemButton>Bot Error Columns</AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel className="shadow-lg dark:bg-gray-800 dark:text-gray-300 flex  px-10">
              <BotErrorColumns />
            </AccordionItemPanel>
          </AccordionItem>
          <AccordionItem key={4}>
            <AccordionItemHeading className="shadow-lg dark:bg-gray-800 dark:text-gray-300 bg-white">
              <AccordionItemButton>Bot Settings</AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel className="shadow-lg dark:bg-gray-800 dark:text-gray-300 flex  px-10">
              <CreateBotSettings />
            </AccordionItemPanel>
          </AccordionItem>
          <AccordionItem key={5}>
            <AccordionItemHeading className="shadow-lg dark:bg-gray-800 dark:text-gray-300 bg-white">
              <AccordionItemButton>Default Mode</AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel className="shadow-lg dark:bg-gray-800 dark:text-gray-300 flex  px-10">
              <DarkMode />
            </AccordionItemPanel>
          </AccordionItem>
        </Accordion>

        {/* <div className="grid grid-cols-2 gap-20 mb-10">
          <BotHistoryColumns />
        </div> */}
      </div>
    </>
  );
}

export default Preferences;
