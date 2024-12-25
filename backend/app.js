require('dotenv').config();
const express = require('express');
const cors = require('cors');

const axios = require('axios');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const db = require("./models");

const today = new Date();
const year = today.getFullYear()+3 ;
const API_URL= `https://api.aladhan.com/v1/calendarByCity/${year}?city=Toronto&country=Canada&method=15`;
const timecalc = require('./calculation');

const fetchDataAndInsertNew = async () => {
  try {
    const response = await axios.get(API_URL); // Replace with your actual API endpoint
    const entireData = response.data.data;
    var Fajr="";
    var Asr="";
    var Zuhr="";
    var Maghrib="";
    var Isha="";
for(const months in entireData)
  {
    const datasets = entireData[months];
    for(const dataset of datasets)
      {
        const day = dataset.date.gregorian.day;
          const month = dataset.date.gregorian.month.number;
          const year = dataset.date.gregorian.year;
          const date = year + "-" + month + "-" + day;
          const weekday = dataset.date.gregorian.weekday.en;
          if (weekday == "Saturday" && month ==3 && day >= 7 && day <= 13) 
            {
            //Do nothing
            }
          else if (weekday == "Saturday" && month ==11 && day >= 1 && day <= 6) 
            {
            //Do nothing
            }
            else if(weekday == "Saturday" && month ==10 && day == 31)
              {
                //Do nothing
              }
            else if (weekday == "Saturday")
              {
                Fajr = timecalc.calculateFajrAsr(dataset.timings.Fajr);
                Asr = timecalc.calculateFajrAsr(dataset.timings.Asr);
                Zuhr = timecalc.calculateZuhr(dataset.timings.Dhuhr);
                Maghrib = timecalc.calculateMaghrib(dataset.timings.Maghrib);
                Isha = timecalc.calculateIsha(dataset.timings.Isha);
              }
            else if (weekday == "Sunday" && month ==3 && day >= 8 && day <= 14)
              {
                Fajr = timecalc.calculateFajrAsr(dataset.timings.Fajr);
                Asr = timecalc.calculateFajrAsr(dataset.timings.Asr);
                Zuhr = timecalc.calculateZuhr(dataset.timings.Dhuhr);
                Maghrib = timecalc.calculateMaghrib(dataset.timings.Maghrib);
                Isha = timecalc.calculateIsha(dataset.timings.Isha);
              }
              else if (weekday == "Sunday" && month ==11 && day >= 1 && day <= 7)
              {
                Fajr = timecalc.calculateFajrAsr(dataset.timings.Fajr);
                Asr = timecalc.calculateFajrAsr(dataset.timings.Asr);
                Zuhr = timecalc.calculateZuhr(dataset.timings.Dhuhr);
                Maghrib = timecalc.calculateMaghrib(dataset.timings.Maghrib);
                Isha = timecalc.calculateIsha(dataset.timings.Isha);
              }
              else{
                Maghrib = timecalc.calculateMaghrib(dataset.timings.Maghrib);
              }
          const FajrStart = dataset.timings.Fajr;
          const ZuhrStart = dataset.timings.Dhuhr; 
          const AsrStart = dataset.timings.Asr;
          const IshaStart = dataset.timings.Isha; 
          const timingswithDate= {date, weekday,FajrStart, Fajr, ZuhrStart, Zuhr,AsrStart, Asr, Maghrib,IshaStart, Isha};
          const existingTiming = await db.PrayerTime.findOne({
           where: { date }
         });
         if(!existingTiming){
           // Insert a new record
           await db.PrayerTime.create(timingswithDate);
           console.log('Data successfully inserted into the database');
         }
      }
   
  }
    console.log('Data successfully fetched and inserted into the database');
  } catch (error) {
    console.error('Error fetching data or inserting into the database', error);
  }
};
const prayerTimesRouter = require('./routes/PrayerTimes');
app.use('/prayerTimes', prayerTimesRouter);
db.sequelize.sync().then(()=> {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    //fetchDataAndInsert();
    fetchDataAndInsertNew();

  });
});
