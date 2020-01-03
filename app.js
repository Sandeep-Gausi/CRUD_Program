var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var routes = require('./routes/pages');


//connect to db
mongoose.connect('mongodb+srv://sandy:sandy@cluster0-z2swg.mongodb.net/test?retryWrites=true&w=majority',{useNewUrlParser: true,useUnifiedTopology:true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB');
});

//Init app
var app = express();

//view engine setup
app.set('view engine','ejs');

// body-parser
app.use(bodyParser.urlencoded({ extended: false }));
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// parse application/json
app.use(bodyParser.json());


app.use(routes);

app.listen(3000,function(){
    console.log('Connected');
});