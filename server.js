// Import express and other dependencies
import express from 'express';
import routes from './routes/index.js';
import mongoose from 'mongoose';
import errorHandler from './middlewares/errorHandler.js';
import dotenv from 'dotenv';

dotenv.config();

const DB_URL = process.env.DB_URL;
const app = express();

// Connect to MongoDB
mongoose.connect(DB_URL).then(()=>{console.log('DB CONNECTED ')}).catch((err)=>{
console.log(err)
});

// const db = mongoose.connection;
// db.on('error', (err) => console.error('Connection error:', err));
// db.once('open', () => {
//   console.log('DB Connected...');
// });

// Middleware
app.use(express.json());
app.use('/api', routes);
app.use(errorHandler);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port: http://localhost:${PORT}`);
});
