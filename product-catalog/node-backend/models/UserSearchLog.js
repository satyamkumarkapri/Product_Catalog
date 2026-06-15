import mongoose from 'mongoose';

const userSearchLogSchema = new mongoose.Schema({
  userId: {
    type: Number, // Links to PostgreSQL user id
    required: false
  },
  searchQuery: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

export const UserSearchLog = mongoose.model('UserSearchLog', userSearchLogSchema, 'user_search_logs');
