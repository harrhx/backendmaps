
import express from 'express';
import SearchHistory from '../models/SearchHistory.js';
const router = express.Router();

// GET: List all search records
router.get('/', async (req, res) => {
  try {
    const entries = await SearchHistory.find().sort({ timestamp: -1 });
    res.json(entries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST: Save a search record
router.post('/', async (req, res) => {
  try {
    const { location, type, minRating, stores, timestamp } = req.body;
    const search = new SearchHistory({
      location,
      type,
      minRating,
      stores,
      timestamp
    });
    const saved = await search.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE: Remove a search record by ID
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await SearchHistory.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Record not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
