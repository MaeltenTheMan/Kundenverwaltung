var mongoose = require('mongoose');
mongoose.connect("mongodb://maelten:passwort1@ds241664.mlab.com:41664/firstmongosandbox", { useNewUrlParser: true, auth:{authdb:"admin"} });

