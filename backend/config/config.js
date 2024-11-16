require('dotenv').config(); // Make sure to install dotenv

module.exports = {
  port: process.env.PORT || 3000,
  dbURI: process.env.DB_URI || 'mongodb://localhost:27017/yourdb',
};