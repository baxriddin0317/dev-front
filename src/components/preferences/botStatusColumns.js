import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { updateBotStatusSettings } from '../../store/actions/userSettingsAction';

function BotStatusColumns() {
  const dispatch = useDispatch();
  const botListSettings = useSelector((state) => state.settings);
  const data = botListSettings.botStatusSettings;
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
    dispatch(updateBotStatusSettings(newState));
  };
  useEffect(() => {}, []);
  return (
    <div className="py-5">
      {data &&
        data.map((column) => (
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

export default BotStatusColumns;
