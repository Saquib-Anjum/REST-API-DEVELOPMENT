// import mongoose from 'mongoose';

// // Replace with your MongoDB connection string
// const DB_URL = 'mongodb://127.0.0.1:27017/testing';
// ;

// // Connect to MongoDB
// mongoose.connect(DB_URL, {
  
  
// })
// .then(() => {
//   console.log('Successfully connected to the MongoDB database');
// })
// .catch((error) => {
//   console.error('Error connecting to the database:', error);
// });

// // Example schema and model
// const userSchema = new mongoose.Schema({
//   name: String,
//   email: String,
//   age: Number
// });

// const User = mongoose.model('User', userSchema);

// // Example: Save a user to the database
// async function createUser() {
//   try {
//     const user = new User({
//       name: 'John Doe',
//       email: 'john.doe@example.com',
//       age: 25
//     });
//     await user.save();
//     console.log('User saved successfully');
//   } catch (error) {
//     console.error('Error saving user:', error);
//   }
// }

// createUser();
