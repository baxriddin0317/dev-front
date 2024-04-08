import '../../styles/darkmode.scss';
import { useContext } from 'react';
import { BsMoonStarsFill, BsFillSunFill } from 'react-icons/bs';
import { WindmillContext } from '@windmill/react-ui';
import { updateThemeModeSettings } from '../../store/actions/userSettingsAction';
import { useDispatch } from 'react-redux';

function DarkMode() {
  const { toggleMode } = useContext(WindmillContext);
  const dispatch = useDispatch();
  const themeModePreference = localStorage.getItem('mode');
  const mode = themeModePreference == 1 ? 'dark' : 'light';

  const changeMode = () => {
    if (mode === 'dark') {
      localStorage.setItem('mode', 0);
      dispatch(updateThemeModeSettings(0));
      document.getElementById('settheme').classList.remove('dark');
    } else {
      dispatch(updateThemeModeSettings(1));
      localStorage.setItem('mode', 1);
      document.getElementById('settheme').classList.add('dark');
    }
    toggleMode();
  };
  return (
    <div id="darkmode" className="py-5 flex justify-center">
      <input
        type="checkbox"
        className="checkbox"
        id="checkbox"
        onChange={changeMode}
        checked={mode === 'light'}
      />
      <label htmlFor="checkbox" className="label">
        <BsMoonStarsFill color="white" />
        <BsFillSunFill color="yellow" />
        <div className="ball" />
      </label>
    </div>
  );
}

export default DarkMode;
