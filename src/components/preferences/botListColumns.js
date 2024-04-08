import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import {
  // getBotListSettings,
  updateBotListSettings,
} from '../../store/actions/userSettingsAction';

function BotListColumns() {
  const dispatch = useDispatch();
  const botListSettings = useSelector((state) => state.settings);
  const data = botListSettings.botListSettings;
  // localStorage.setItem("botList", JSON.stringify(data));
  // const [filteredBotList, setFilteredBotList] = useState([]);
  // if (data) {
  //   localStorage.setItem("botList", JSON.stringify(data));
  // }
  const removeBotListColumn = (id) => {
    const newState = data.map((obj) => {
      if (obj.isVisible === true && obj.ID === id) {
        return { ...obj, isVisible: false };
      }
      if (obj.isVisible === false && obj.ID === id) {
        return { ...obj, isVisible: true };
      }
      return obj;
    });
    dispatch(updateBotListSettings(newState));

    // setFilteredBotList((prevState) => {
    //   const newState = prevState.map((obj) => {
    //     if (obj.isVisible === true && obj.ID === id) {
    //       return { ...obj, isVisible: false };
    //     } else if (obj.isVisible === false && obj.ID === id) {
    //       return { ...obj, isVisible: true };
    //     }
    //     return obj;
    //   });
    //   localStorage.setItem("botList", JSON.stringify(newState));
    //   return newState;
    // });
  };
  useEffect(() => {
    // dispatch(getBotListSettings());
    // const setting = localStorage.getItem("botList");
    // let parsedSetting = JSON.parse(setting);
    // Array.isArray(parsedSetting)
    //   ? setFilteredBotList(parsedSetting)
    //   : setFilteredBotList([]);
  }, [dispatch]);
  return (
    <div className="py-5">
      {data.map((column) => (
        <div className="cat action" key={column.ID}>
          <label>
            <input
              value={column.accessor}
              checked={column.isVisible}
              type="checkbox"
              onChange={() => {
                removeBotListColumn(column.ID);
              }}
            />
            <span>{column.Header}</span>
          </label>
        </div>
      ))}
    </div>
  );
}

export default BotListColumns;
