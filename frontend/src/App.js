import React, { useState, useEffect } from 'react';
import './App.css';
import HomePage from './components/HomePage';
import EditPrayerTimes from './components/EditPrayerTimes';
import { fetchPrayerTimess } from './apitest';
import { fetchPrayerTimes } from './api';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
function App() {
  const [prayerTimes, setPrayerTimes] = useState([]);
  const [changedTime, setChangedTime] = useState([]);

  useEffect(() => {
    const fetchPrayerData = async () => {
      const data = await fetchPrayerTimes();
      setPrayerTimes(data);
    };
    fetchPrayerData();
    const intervalId = setInterval(fetchPrayerData, 10 * 10 * 1000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const fetchChangedTime = async () => {
      const data = await fetchPrayerTimess();
      setChangedTime(data);
    };
    fetchChangedTime();
    const intervalId = setInterval(fetchChangedTime, 10 * 10 * 1000);
    return () => clearInterval(intervalId);
  }, []);
  console.log(prayerTimes);
  console.log(changedTime);

  return (
    <div className="App">'
    <Router>
      <Routes>
        <Route path="/" element={<HomePage prayerTimes={prayerTimes} changedprayer={changedTime} />} />
        <Route path="/edit" element={<EditPrayerTimes prayerTimes={prayerTimes} changedprayer={changedTime} />} />
        </Routes>
      
      <br></br>
      <div id="scroll-container">
        <div id="scroll-text">Assalamualaikum Warahmatullahi Wabarakatuh. Welcome to Dawah Centre.</div>
      </div>
    </Router>
    </div>
  );
}

export default App;