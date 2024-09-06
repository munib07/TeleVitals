const mongoose = require('mongoose');

const connectDB = async () => {
  const mongoUrl = process.env.MONGO_URL || "";
  console.log(mongoUrl);
  try {
    mongoose.set('strictQuery', false);
    const connection = await mongoose.connect(mongoUrl);
    console.log(`Mongodb connected ${connection.host}`);
  } catch (error) {
    console.log(`Mongodb Server Issue ${error}`);
  }
};

module.exports = connectDB;