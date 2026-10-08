const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const connectDB = async () => {
  const connStr = process.env.MONGO_URI;
  if (!connStr) {
    throw new Error('MONGO_URI is not set. Add your MongoDB connection string to backend/.env.');
  }

  try {
    const conn = await mongoose.connect(connStr);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    if (error.code === 'ENOTFOUND' || error.cause?.code === 'ENOTFOUND') {
      throw new Error(`MongoDB hostname could not be resolved. Verify the cluster hostname in backend/.env against your MongoDB Atlas connection string. (${error.message})`);
    }
    throw error;
  }
};

module.exports = connectDB;
