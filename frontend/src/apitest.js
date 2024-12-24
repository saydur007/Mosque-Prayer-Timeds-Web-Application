const todays = new Date();
const years = todays.getFullYear();
const months = todays.getMonth()+1;
const dates= todays.getDate();
const full_dates= years + "-" + months + "-" + dates;

export const fetchPrayerTimess = async () => {
  const prayerTimes = [];
  let currentDate = new Date();
  let previousTimes = null;
  let nextChangeDate = null;
  let changedTime = null;
let formattedDate = null;
  const formatDate = (date) => {

    return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
  };

  while (true) {
     formattedDate = formatDate(currentDate);
    console.log(formattedDate);

    try {
      const response = await fetch(`https://dawahcentre.click/prayerTimes/${formattedDate}`);
      const data = await response.json();
      if (!data) break;

      const Fajr = data.Fajr;
const Zuhr = data.Zuhr;
const Asr = data.Asr;
const Isha = data.Isha;
const Maghrib = data.Maghrib;
      if (previousTimes) {
        if (
          previousTimes.Fajr !== Fajr ||
          previousTimes.Zuhr !== Zuhr ||
          previousTimes.Asr !== Asr ||
          previousTimes.Isha !== Isha
        ) {
          nextChangeDate = formatDate(currentDate);
          changedTime = { Fajr, Zuhr, Asr, Isha, Maghrib, nextChangeDate };
          return data;
          break;
        }
      }

      prayerTimes.push(data);
      previousTimes = { Fajr, Zuhr, Asr, Isha };

      currentDate.setDate(currentDate.getDate() + 1);
    } catch (error) {
      console.error(`Error fetching prayer times for ${formattedDate}:`, error);
      break;
    }
  }

  return {
    changedTime
  };
};
