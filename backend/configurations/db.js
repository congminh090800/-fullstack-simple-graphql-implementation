var mongoose = require('mongoose');

const uri = "mongodb+srv://"+process.env.DB_USERNAME+":"+process.env.DB_PASSWORD+"@restaurants.ihhbe.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const db= mongoose.connect(uri,{useNewUrlParser: true,useUnifiedTopology: true, dbName:'sample_restaurants'},function(err) {
        if (err) {
            console.log('Unable to connect to the server. Please start the server. Error:', err);
        } else {          
            console.log('connected to: '+mongoose.connection.name);
        }
    });
module.exports=db;