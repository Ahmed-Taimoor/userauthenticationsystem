const mongoose = require('mongoose');

console.log(process.env.DB);
module.exports = async () => {
  const connectionPrams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  try {
    const conn = await mongoose.connect(
      'mongodb://localhost:27017/hello',
      connectionPrams,
    );
    console.log('Connected Succesfully');
  } catch (error) {
    console.log(error);
    console.log('Could not connect to database');
  }
};
