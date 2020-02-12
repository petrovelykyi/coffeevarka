const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const createError = require('http-errors');
const mongoose = require('mongoose');
const passport = require('passport');
const config = require('./routes/config/config');
const { cronTaskMailSender } = require('./routes/cron/cronTasks');

const app = express();

app.use(cors());
app.use(helmet());
app.set('x-powered-by', false);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(config.jwt.secret));
app.use(express.static(path.join(__dirname, 'frontend/build')));
app.use('/static', express.static(path.join(__dirname, 'frontend/static')));
app.use(passport.initialize());

const indexRouter = require('./routes/index');
const adminRouter = require('./routes/admin');
const usersRouter = require('./routes/users');
const catalogRouter = require('./routes/catalog');
const productsRouter = require('./routes/products');
const ordersRouter = require('./routes/orders');
const paymentsRouter = require('./routes/payments');
const citiesRouter = require('./routes/cities');
const cartRouter = require('./routes/cart');
const messagesRouter = require('./routes/messages');

app.use('/', indexRouter);
app.use('/api/admin', adminRouter);
app.use('/api/users', usersRouter);
app.use('/api/catalog', catalogRouter);
app.use('/api/products', productsRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/payments', paymentsRouter);
app.use('/api/cities', citiesRouter);
app.use('/api/cart', cartRouter);
app.use('/api/messages', messagesRouter);
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
});

require('dotenv').config();
// MongoDB Connection
const db = process.env.NODE_ENV === 'production' ? process.env.MONGO_URI_PROD : process.env.MONGO_URI_DEV;
mongoose.connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
})
  .then(() => console.log(`Connected to "${db}" DB!`))
  .catch((err) => {
    console.log(err);
    process.exit();
  });

// If the connection throws an error
mongoose.connection.on('error', (err) => {
  console.error(`Failed to connect to DB "${db}" on startup `, err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', () => {
  console.log(`Mongoose default connection to DB ${db} disconnected`);
});

const gracefulExit = () => {
  mongoose.connection.close(() => {
    console.log(`Mongoose default connection with DB: "${db}" is disconnected through app termination`);
    process.exit(0);
  });
};

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', gracefulExit).on('SIGTERM', gracefulExit);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Cron tasks
// Check Emails to send
cronTaskMailSender();

module.exports = app;
