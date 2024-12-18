import axios from 'axios';
import { calculateFajrAsr, calculateIsha, calculateZuhr, calculateMaghrib } from './calculation';

const InsertYear = async (year) => {
  const API_URL = `https://api.aladhan.com/v1/calendarByCity/${year}?city=Toronto&country=Canada&method=15`;

  try {
    const response = await axios.get(API_URL); // Replace with your actual API endpoint
    console.log('API Response:', response); // Debugging statement

    // Check if response.data and response.data.data exist
    if (!response.data || !response.data.data) {
      throw new Error('Invalid API response structure');
    }

    const entireData = response.data.data;
    console.log('Entire Data:', entireData); // Debugging statement

    var Fajr = "";
    var Asr = "";
    var Zuhr = "";
    var Maghrib = "";
    var Isha = "";

    for (const months in entireData) {
      const datasets = entireData[months];
      for (const dataset of datasets) {
        const day = dataset.date.gregorian.day;
        const month = dataset.date.gregorian.month.number;
        const year = dataset.date.gregorian.year;
        const date = `${year}-${month}-${day}`;
        const weekday = dataset.date.gregorian.weekday.en;

        if (
          (weekday === "Saturday" && month === 3 && day >= 7 && day <= 13) ||
          (weekday === "Saturday" && month === 11 && day >= 1 && day <= 6) ||
          (weekday === "Saturday" && month === 10 && day === 31)
        ) {
          // Do nothing
        } else if (weekday === "Saturday") {
          Fajr = calculateFajrAsr(dataset.timings.Fajr);
          Asr = calculateFajrAsr(dataset.timings.Asr);
          Zuhr = calculateZuhr(dataset.timings.Dhuhr);
          Maghrib = calculateMaghrib(dataset.timings.Maghrib);
          Isha = calculateIsha(dataset.timings.Isha);
        } else if (weekday === "Sunday" && month === 3 && day >= 8 && day <= 14) {
          Fajr = calculateFajrAsr(dataset.timings.Fajr);
          Asr = calculateFajrAsr(dataset.timings.Asr);
          Zuhr = calculateZuhr(dataset.timings.Dhuhr);
          Maghrib = calculateMaghrib(dataset.timings.Maghrib);
          Isha = calculateIsha(dataset.timings.Isha);
        } else if (weekday === "Sunday" && month === 11 && day >= 1 && day <= 7) {
          Fajr = calculateFajrAsr(dataset.timings.Fajr);
          Asr = calculateFajrAsr(dataset.timings.Asr);
          Zuhr = calculateZuhr(dataset.timings.Dhuhr);
          Maghrib = calculateMaghrib(dataset.timings.Maghrib);
          Isha = calculateIsha(dataset.timings.Isha);
        } else {
          Maghrib = calculateMaghrib(dataset.timings.Maghrib);
        }

        const FajrStart = dataset.timings.Fajr;
        const ZuhrStart = dataset.timings.Dhuhr;
        const AsrStart = dataset.timings.Asr;
        const IshaStart = dataset.timings.Isha;
        const timingswithDate = { date, weekday, FajrStart, Fajr, ZuhrStart, Zuhr, AsrStart, Asr, Maghrib, IshaStart, Isha };

        try {
          const existingTiming = await axios.get(`http://tests-env-1.eba-dudpkeyx.us-east-1.elasticbeanstalk.com/prayerTimes/${date}`);
          if (!existingTiming.data) {
            // Insert a new record
            await axios.post('http://tests-env-1.eba-dudpkeyx.us-east-1.elasticbeanstalk.com/prayerTimes', timingswithDate);
            console.log('Data successfully inserted into the database');
          }
        } catch (error) {
        
            console.error('Error inserting prayer time:', error.response ? error.response.data : error);
         
        }
      }
    }
  } catch (error) {
    console.error('Error fetching prayer times:', error);
  }
};

export default InsertYear;