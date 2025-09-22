
import dotenv from 'dotenv';
dotenv.config();
console.log('MONGODB_URI:', process.env.MONGODB_URI);
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import searchHistoryRoutes from './routes/searchHistory.js';



const app = express();
app.use(cors({
  origin: [
    'http://localhost:8080',
    'https://frontendmap.vercel.app'
  ],
  credentials: true
}));
app.use(express.json());
// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/search-history', searchHistoryRoutes);
app.get('/', (req, res) => {
  res.send('API is running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
