const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const hotdogSchema = new Schema({
  name: { type: 'String', required: true },
  price: { type: 'Number' },
  image: { type: 'String' },
});

module.exports = mongoose.model('Hotdog', hotdogSchema);
