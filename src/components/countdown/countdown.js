import { useState, useEffect } from 'react';

function Countdown({ lastDate, gettime }) {
  const [countdownDate, setCountdownDate] = useState(
    new Date(lastDate).getTime()
  );

  const [state, setState] = useState({
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    setInterval(() => setNewTime(), 1000);
  }, []);

  const setNewTime = () => {
    if (countdownDate) {
      const currentTime = new Date().getTime();

      const distanceToDate = currentTime - countdownDate;

      let minutes = Math.floor(
        (distanceToDate % (1000 * 60 * 60)) / (1000 * 60)
      );
      let seconds = Math.floor((distanceToDate % (1000 * 60)) / 1000);

      const numbersToAddZeroTo = [1, 2, 3, 4, 5, 6, 7, 8, 9];

      if (numbersToAddZeroTo.includes(minutes)) {
        minutes = `0${minutes}`;
      } else if (numbersToAddZeroTo.includes(seconds)) {
        seconds = `0${seconds}`;
      }

      setState({ minutes, seconds });
      gettime(minutes);
    }
  };

  return (
    <div>
      <div className="countdown-wrapper">
        <div className="time-section">
          <div className="time">
            {state.minutes || '00'}:{state.seconds || '00'}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Countdown;
