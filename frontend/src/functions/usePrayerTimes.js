import { useState, useEffect } from 'react';

const convertTo24Hour = (time) => {
  if (!time) return ''; // Return an empty string if time is undefined

  const [timePart, modifier] = time.split(' ');
  let [hours, minutes] = timePart.split(':');

  if (hours === '12') {
    hours = '00';
  }

  if (modifier === 'PM') {
    hours = parseInt(hours, 10) + 12;
  }

  return `${hours}:${minutes}`;
};

const usePrayerTimes = (prayerTimes) => {
  const prayerTimess = {
    Fajr: prayerTimes.Fajr,
    Zuhr: prayerTimes.Zuhr,
    Asr: prayerTimes.Asr,
    Maghrib: prayerTimes.Maghrib, // Replace with actual time if available
    Isha: prayerTimes.Isha,
  };

  const [blinkFajr, setBlinkFajr] = useState(false);
  const [darkenFajr, setDarkenFajr] = useState(false);
  const [blinkZuhr, setBlinkZuhr] = useState(false);
  const [darkenZuhr, setDarkenZuhr] = useState(false);
  const [blinkAsr, setBlinkAsr] = useState(false);
  const [darkenAsr, setDarkenAsr] = useState(false);
  const [blinkMaghrib, setBlinkMaghrib] = useState(false);
  const [darkenMaghrib, setDarkenMaghrib] = useState(false);
  const [blinkIsha, setBlinkIsha] = useState(false);
  const [darkenIsha, setDarkenIsha] = useState(false);
  const [message, setMessage] = useState("");
  const [countdown, setCountdown] = useState({});

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = new Date();
      const currentMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();
      const currentSeconds = currentMinutes * 60 + currentTime.getSeconds();

      Object.keys(prayerTimess).forEach(prayer => {
        let timeString = prayerTimess[prayer];
        if (prayer !== "Fajr") {
          timeString = convertTo24Hour(timeString);
        }

        if (!timeString) return; // Skip if timeString is empty or undefined
console.log(timeString);
        const [hours, minutes] = timeString.split(":").map(Number);
        const prayerMinutes = hours * 60 + minutes;
        const prayerSeconds = prayerMinutes * 60;

        if (currentSeconds >= prayerSeconds + 120) {
          setBlink(prayer, false);
          setDarken(prayer, false);
          setMessage("");
        } else if (currentSeconds >= prayerSeconds) {
          setBlink(prayer, true);
          setDarken(prayer, true);
          setMessage("It is Time for Salah");
        } else if (currentSeconds >= prayerSeconds - 600) {
          setBlink(prayer, false);
          setDarken(prayer, false);

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
          setBlink(prayer, true);
          setDarken(prayer, false);
          setMessage("Time for Adhan");
        } else {
          setBlink(prayer, false);
          setDarken(prayer, false);
          setCountdown(prev => ({
            ...prev,
            [prayer]: "",
          }));
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [prayerTimess]);

  const setBlink = (prayer, value) => {
    switch (prayer) {
      case "Fajr":
        setBlinkFajr(value);
        break;
      case "Zuhr":
        setBlinkZuhr(value);
        break;
      case "Asr":
        setBlinkAsr(value);
        break;
      case "Maghrib":
        setBlinkMaghrib(value);
        break;
      case "Isha":
        setBlinkIsha(value);
        break;
      default:
        break;
    }
  };

  const setDarken = (prayer, value) => {
    switch (prayer) {
      case "Fajr":
        setDarkenFajr(value);
        break;
      case "Zuhr":
        setDarkenZuhr(value);
        break;
      case "Asr":
        setDarkenAsr(value);
        break;
      case "Maghrib":
        setDarkenMaghrib(value);
        break;
      case "Isha":
        setDarkenIsha(value);
        break;
      default:
        break;
    }
  };

  return {
    blinkFajr,
    darkenFajr,
    blinkZuhr,
    darkenZuhr,
    blinkAsr,
    darkenAsr,
    blinkMaghrib,
    darkenMaghrib,
    blinkIsha,
    darkenIsha,
    message,
    countdown,
  };
};

export default usePrayerTimes;