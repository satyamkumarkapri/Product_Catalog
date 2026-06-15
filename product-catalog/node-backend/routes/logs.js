import express from 'express';
import { UserSearchLog } from '../models/UserSearchLog.js';

const router = express.Router();

// CREATE: Log a new search
router.post('/', async (req, res) => {
  try {
    const { userId, searchQuery } = req.body;
    
    if (!searchQuery) {
      return res.status(400).json({ error: 'Search query is required' });
    }

    const newLog = new UserSearchLog({ userId, searchQuery });
    const savedLog = await newLog.save();
    
    res.status(201).json(savedLog);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create search log', details: error.message });
  }
});

// READ: Get all search logs (Optional: filter by userId)
router.get('/', async (req, res) => {
  try {
    const { userId } = req.query;
    const filter = userId ? { userId: Number(userId) } : {};
    
    const logs = await UserSearchLog.find(filter).sort({ timestamp: -1 });
    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve search logs', details: error.message });
  }
});

// READ: Get a single search log by ID
router.get('/:id', async (req, res) => {
  try {
    const log = await UserSearchLog.findById(req.params.id);
    if (!log) {
      return res.status(404).json({ error: 'Search log not found' });
    }
    res.status(200).json(log);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve search log', details: error.message });
  }
});

// UPDATE: Update a search log (e.g., if a user corrects a typo)
router.put('/:id', async (req, res) => {
  try {
    const { searchQuery } = req.body;
    
    const updatedLog = await UserSearchLog.findByIdAndUpdate(
      req.params.id,
      { searchQuery },
      { new: true, runValidators: true }
    );

    if (!updatedLog) {
      return res.status(404).json({ error: 'Search log not found' });
    }
    
    res.status(200).json(updatedLog);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update search log', details: error.message });
  }
});

// DELETE: Remove a search log
router.delete('/:id', async (req, res) => {
  try {
    const deletedLog = await UserSearchLog.findByIdAndDelete(req.params.id);
    
    if (!deletedLog) {
      return res.status(404).json({ error: 'Search log not found' });
    }
    
    res.status(200).json({ message: 'Search log deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete search log', details: error.message });
  }
});

export default router;
