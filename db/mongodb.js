const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://saiwei:135246Acbd@106.14.142.169:37017/saiwei', {
    server: { auto_reconnect: true },
});

const db = mongoose.connection;
db.once('open', () => {
  console.log('Connection using Mongoose succeed!');
});
db.on('error', error => {
  console.error('Error in MongoDB connection' + error);
  //reconnect may solve the error.
  mongoose.disconnect();
});

exports.mongoose = mongoose;
