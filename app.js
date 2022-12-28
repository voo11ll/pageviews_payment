const express = require("express");
//const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport")
var cons = require('consolidate');
const app = express();

app.get("/views");

app.use(express.static('views'));

// view engine setup
app.engine('html', cons.swig)
app.set('view engine', 'html');


//passport
require('./config/passport')(passport);

//MongoDB
 const db = require('./config/base').MongoURI;

//connect
mongoose.connect(db, {useNewUrlParser: true })
.then(() => console.log('MongoDB connect...'))
.catch(err => console.log(err));


//parser анализатор тела 
app.use(express.urlencoded({extended: false}));

//express session 
app.use(session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true
    }));    

// passport
app.use(passport.initialize());
app.use(passport.session());

//connect flassh
app.use(flash());

//vars
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

//routes
//app.use('/', require('./routes/index'))
app.use('/', require('./routes/users'))
app.use('/', require('./routes/index'))

var server = app.listen(3000, function () {

    var host = server.address().address
    var port = server.address().port

    console.log('Example app listening on port http://localhost:3000')

})



