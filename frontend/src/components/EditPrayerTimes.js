import React, { useState, useEffect } from 'react';
import axios from 'axios';
import dclogo from './dc.png';
import '../styles/EditPrayerTimes.css';
import InsertYear from '../functions/InsertYear';
function EditPrayerTimes() {
  const [prayerTimes, setPrayerTimes] = useState([]);
  const [filteredPrayerTimes, setFilteredPrayerTimes] = useState([]);
  const [searchDate, setSearchDate] = useState('');
  const [message, setMessage] = useState('');
  const [year, setYear] = useState('');

  useEffect(() => {
    const fetchPrayerTimes = async () => {
      try {
        const response = await axios.get('https://dawahcentre.click/prayerTimes');
        setPrayerTimes(response.data);
        setFilteredPrayerTimes(response.data);
      } catch (error) {
        console.error('Error fetching prayer times:', error);
      }
    };
    fetchPrayerTimes();
  }, []);

  const handleSearchChange = (e) => {
    setSearchDate(e.target.value);
    if (e.target.value === '') {
      setFilteredPrayerTimes(prayerTimes);
    } else {
      setFilteredPrayerTimes(prayerTimes.filter(pt => pt.date.includes(e.target.value)));
    }
  };
  const handleYearChange = async (e) => {
    e.preventDefault();
    console.log('Year:', year);
    try {
      await InsertYear(year);
      setMessage('Year updated successfully.');
    } catch (error) {
      console.error('Error updating year:', error);
      setMessage('Error updating year.');
    }
  };

  const handleChange = (e, id) => {
    const { name, value } = e.target;
    setFilteredPrayerTimes(filteredPrayerTimes.map(pt => 
      pt.id === id ? { ...pt, [name]: value } : pt
    ));
  };

  const handleSubmit = async (e, id) => {
    e.preventDefault();
    const updatedPrayerTime = filteredPrayerTimes.find(pt => pt.id === id);
    console.log('Updating prayer time:', updatedPrayerTime);
    try {
      const response = await axios.put(`http://tests-env-1.eba-dudpkeyx.us-east-1.elasticbeanstalk.com/prayerTimes/${updatedPrayerTime.date}`, updatedPrayerTime);
      setMessage('Prayer time updated successfully.');
      console.log('Prayer time updated:', response.data);
    } catch (error) {
      console.error('Error updating prayer time:', error.response ? error.response.data : error);
      setMessage('Error updating prayer time.');
    }
  };

  return (
    <div className="edit-page">
      <div className="image">
        <img src={dclogo} alt="Logo" />
      </div>
      <label>
        Search by Date:
        <input type="date" value={searchDate} onChange={handleSearchChange} />
      </label>
      <form onSubmit={handleYearChange}><label>
        Insert Prayer Time By Year:
        <input type="number" value={year} onChange={(e) => setYear(e.target.value)}  />
      </label>
      <button type="submit">Submit Year</button>
      </form>
      {message && <p>{message}</p>}
      <table id="prayerTimesTable2">
        <thead>
          <tr>
            <th>Date</th>
            <th>Weekday</th>
            <th>Fajr</th>
            <th>Zuhr</th>
            <th>Asr</th>
            <th>Maghrib</th>
            <th>Isha</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredPrayerTimes.map(pt => (
            <tr key={pt.id}>
              <td>{pt.date}</td>
              <td>{pt.weekday}</td>
              <td>
                <input
                  type="text"
                  name="Fajr"
                  value={pt.Fajr}
                  onChange={(e) => handleChange(e, pt.id)}
                />
              </td>
              <td>
                <input
                  type="text"
                  name="Zuhr"
                  value={pt.Zuhr}
                  onChange={(e) => handleChange(e, pt.id)}
                />
              </td>
              <td>
                <input
                  type="text"
                  name="Asr"
                  value={pt.Asr}
                  onChange={(e) => handleChange(e, pt.id)}
                />
              </td>
              <td>
                <input
                  type="text"
                  name="Maghrib"
                  value={pt.Maghrib}
                  onChange={(e) => handleChange(e, pt.id)}
                />
              </td>
              <td>
                <input
                  type="text"
                  name="Isha"
                  value={pt.Isha}
                  onChange={(e) => handleChange(e, pt.id)}
                />
              </td>
              <td>
                <button onClick={(e) => handleSubmit(e, pt.id)}>Update</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EditPrayerTimes;