const express = require('express');
const PrayerTime = require('../models/PrayerTime');
const db = require("../models");
const router = express.Router();

// GET all prayer times
router.get('/', async (req, res) => {
    try {
        const prayerTimes = await db.PrayerTime.findAll();;
        res.json(prayerTimes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/:date', async (req, res) => {
    try {
        const prayerTimes = await db.PrayerTime.findOne({ where: { date: req.params.date } });
        res.json(prayerTimes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST create a new prayer time
router.post('/', async (req, res) => {
    try {
        const newPrayerTime = await db.PrayerTime.create(req.body);
        res.status(201).json(newPrayerTime);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT update a prayer time by date
router.put('/:date', async (req, res) => {
    try {
      const [updated] = await db.PrayerTime.update(req.body, { where: { date: req.params.date } });
      
        // Fetch and send the updated record
        const updatedPrayerTime = await db.PrayerTime.findOne({ where: { date: req.params.date } });
        res.json({ message: 'Prayer time updated', updatedPrayerTime });
      
    } catch (err) {
      res.status(400).json({ message: err.message, req: req.body });
    }
  });
  

// DELETE a prayer time by date
router.delete('/:date', async (req, res) => {
    try {
        const deleted = await db.PrayerTime.destroy({ where: { date: req.params.date } });
        if (deleted) {
            res.json({ message: 'Prayer time deleted' });
        } else {
            res.status(404).json({ message: 'Prayer time not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;