import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import searchRoutes from './routes/search.js';
import logsRoutes from './routes/logs.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://satyam:satyam@ac-9yht7ed-shard-00-00.vw83dw2.mongodb.net:27017,ac-9yht7ed-shard-00-01.vw83dw2.mongodb.net:27017,ac-9yht7ed-shard-00-02.vw83dw2.mongodb.net:27017/product_catalog?ssl=true&replicaSet=atlas-7bbd67-shard-0&authSource=admin&appName=Cluster0";

mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Routes
app.use('/api/search', searchRoutes);
app.use('/api/logs', logsRoutes);

// Health check and Root route
app.get('/', (req, res) => {
  res.status(200).send(`
    <html>
      <body style="font-family: sans-serif; padding: 2rem; text-align: center;">
        <h1 style="color: #4CAF50;">✅ Node.js Backend is Running!</h1>
        <p>Connected to MongoDB Atlas successfully.</p>
        <p>Available APIs: <code>/api/search</code> and <code>/api/logs</code></p>
      </body>
    </html>
  `);
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'Node.js Backend is running' });
});

app.listen(PORT, () => {
  console.log(`🚀 Node.js Backend running on http://localhost:${PORT}`);
});
