import React, { useState, useEffect } from 'react';
import moment from 'moment';
import '../styles/HomePage.css';
import dclogo from './dc.png';
import usePrayerTimes from '../functions/usePrayerTimes';
function HomePage({ prayerTimes, changedprayer }) {
  const { blink, darken, message, countdown } = usePrayerTimes(prayerTimes);
  return (
    <div className={`home-page`}>
      <div>
      <div class="image">
        <img src={dclogo}></img>
      </div>
      </div>
      {message && <p className="message blinktext">{message}</p>}
      <table id="prayerTimesTable"  >
    <thead>
      <tr>
        <th>Prayers</th>
        <th>Current Times</th>
        <th>From {new Date(changedprayer.date).toLocaleString('default', { month: 'long' })} {new Date(changedprayer.date).getDate() + 1}</th> 
      </tr>
    </thead>
    <tbody>

      <tr>
        <td id = "prayerName">Fajr</td>
        <td className={`${blink["Fajr"] ? 'blink' : ''} ${darken["Fajr"] ? 'darken' : ''}`}>{prayerTimes.Fajr} am</td>
        <td>{changedprayer.Fajr} am</td>
      </tr>

      <tr>
      <td id = "prayerName">Zuhr</td>
        <td className={`${blink["Zuhr"] ? 'blink' : ''} ${darken["Zuhr"] ? 'darken' : ''}`}>{prayerTimes.Zuhr} pm</td>
        <td>{changedprayer.Zuhr} pm </td>
      </tr>
      <tr>
      <td id = "prayerName">Asr</td>
        <td className={`${blink["Asr"] ? 'blink' : ''} ${darken["Asr"] ? 'darken' : ''}`}>{prayerTimes.Asr} pm</td>
        <td>{changedprayer.Asr} pm</td>
      </tr>
      <tr>
      <td id = "prayerName">Maghrib</td>
        <td className={`${blink["Maghrib"] ? 'blink' : ''} ${darken["Maghrib"] ? 'darken' : ''}`}>{prayerTimes.Maghrib} pm </td>
        <td>{changedprayer.Maghrib} pm </td>
      </tr>
      <tr>
      <td id = "prayerName">Isha</td>
        <td className={`${blink["Isha"] ? 'blink' : ''} ${darken["Isha"] ? 'darken' : ''}`}>{prayerTimes.Isha} pm </td>
        <td>{changedprayer.Isha} pm </td>
      </tr>

    </tbody>

  </table>
  <br></br>
  <table id="prayerTimesTable"  >
    <thead>
      <tr>
        <th>Jummah Prayers</th>
        <th>1st Prayer</th>
        <th>2nd Prayer</th> 
      </tr>
    </thead>
    <tbody>

      <tr>
        <td id = "prayerName">Khutbah</td>
        <td> 1:00 pm</td>
        <td>2:00 pm</td>
      </tr>


    </tbody>
  </table>

    </div>

  );
}

export default HomePage;