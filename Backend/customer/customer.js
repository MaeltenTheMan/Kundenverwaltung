var mongoose = require('mongoose');  
var CustomerSchema = new mongoose.Schema({  
  name: String,
  lastName: String,
  gender: String,
  street: String,
  postCode: Number,
  city: String
});
mongoose.model('Customer', CustomerSchema);
module.exports = mongoose.model('Customer');