const mongoose = require('mongoose');

const setupDB = () => {
  beforeAll(async () => {
    const DB =
      'mongodb+srv://Semen:semen228666@lab2.sjl4u.mongodb.net/lab2?retryWrites=true&w=majority';
    //Connect to DB
    await mongoose
      .connect(DB, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log('DB connection successful');
      })
      .catch((err) => console.log('ERROR', err));
  });
  afterAll(async () => {
    await mongoose.disconnect();
  });
};

module.exports = setupDB;
