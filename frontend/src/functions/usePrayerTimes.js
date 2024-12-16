import { useState, useEffect } from 'react';

const prayerTimess = {
  Fajr: "05:15",
  Zuhr: "13:45",
  Asr: "13:51",
  Maghrib: "16:40", // Replace with actual time if available
  Isha: "16:07",
};

const usePrayerTimes = (prayerTime) => {
  const [blink, setBlink] = useState({});
  const [darken, setDarken] = useState({});
  const [message, setMessage] = useState("");
  const [countdown, setCountdown] = useState({});

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = new Date();
      const currentMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();
      const currentSeconds = currentMinutes * 60 + currentTime.getSeconds();

      Object.keys(prayerTimess).forEach(prayer => {
        const timeString = prayerTimess[prayer];
        const [hours, minutes] = timeString.split(":").map(Number);
        const prayerMinutes = hours * 60 + minutes;
        const prayerSeconds = prayerMinutes * 60;

        if (currentSeconds >= prayerSeconds + 180) {
          setBlink(prev => ({ ...prev, [prayer]: false }));
          setMessage("");
        } else if (currentSeconds >= prayerSeconds) {
          setBlink(prev => ({ ...prev, [prayer]: true }));
          setMessage("It is Time for Salah");
        } else if (currentSeconds >= prayerSeconds - 600) {
          setBlink(prev => ({ ...prev, [prayer]: false }));

          // Calculate the countdown
          const remainingSeconds = prayerSeconds - currentSeconds;
          const minutesRemaining = Math.floor(remainingSeconds / 60);
          const secondsRemaining = remainingSeconds % 60;
          const countdownString = `${minutesRemaining}m ${secondsRemaining}s`;

          setMessage(`Prayer soon: ${countdownString}`);
          setCountdown(prev => ({
            ...prev,
            [prayer]: countdownString,
          }));
        } else if (currentSeconds >= prayerSeconds - 900) {
          setBlink(prev => ({ ...prev, [prayer]: true }));
          setMessage("Time for Adhan");
        } else {
          setBlink(prev => ({ ...prev, [prayer]: false }));
          setCountdown(prev => ({
            ...prev,
            [prayer]: "",
          }));
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return { blink, darken, message, countdown };
};

export default usePrayerTimes;