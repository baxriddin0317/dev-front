import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { updateBotHistorySettings } from '../../store/actions/userSettingsAction';

function BotHistoryColumns() {
  const dispatch = useDispatch();
  const botListSettings = useSelector((state) => state.settings);
  const data = botListSettings.botHistorySettings;
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
    dispatch(updateBotHistorySettings(newState));
  };
  useEffect(() => {}, []);
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

export default BotHistoryColumns;
