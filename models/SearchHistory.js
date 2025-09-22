
import mongoose from 'mongoose';


const StoreSchema = new mongoose.Schema({
  id: String,
  name: String,
  address: String,
  rating: Number,
  lat: Number,
  lng: Number,
  type: String
}, { _id: false });

const SearchHistorySchema = new mongoose.Schema({
  location: String,
  type: String,
  minRating: Number,
  stores: [StoreSchema],
  timestamp: { type: Date, default: Date.now }
});

export default mongoose.model('SearchHistory', SearchHistorySchema);