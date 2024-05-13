{var express = require('express');
var logger = require('morgan');

var cors = require('cors')
var mongoose = require('mongoose')

// var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth');
var incomesRouter = require('./routes/incomes');
var expensesRouter = require('./routes/expenses');
var categoriesRouter = require('./routes/categories');
var photosRouter = require('./routes/photos')
var transportConfigRouter = require('./routes/transportConfig')
var nodeMailer = require('nodemailer');
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })
{/*var mailer = require('./mail')*/}


{/*var transporter = nodeMailer.createTransport({
  host: 'mail.entreprehub.com',
  port: 465,
  secure: true,
  auth: {
      user: 'info@entreprehub.com',
      pass: 'UBqB9wF1!'
  }
});

var mailOptions = {
  from: 'Castillo <info@entreprehub.com>',
  to: 'celiel@live.com',
  subject: 'Sending Email using Node.js',
  html: html,
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
*/}
var app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set('trust proxy', 1);
app.enable('trust proxy');

app.use(
    cors({
      origin: [process.env.REACT_APP_URI, ]  // <== URL of our future React app, process.env.REACT_APP_URI is the correct URI
    })
  );

// app.use(
//     cors()
//   );

// app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/categories', categoriesRouter);
app.use('/expenses', expensesRouter);
app.use('/incomes', incomesRouter);
app.use('/photos', photosRouter)
app.use('/transport', transportConfigRouter)

mongoose
  .connect(process.env.MONGODB_URI)
  .then((x) => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch((err) => console.error("Error connecting to mongo", err));

module.exports = app;
}