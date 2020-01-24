const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const indexRouter = require('./routers/index');
const { error, someNotFound } = require('./routers/notFound');
const { PORT = 3000 } = process.env;
const cookieParser = require('cookie-parser');
const cors = require('cors');
const celebrateErrors = require('celebrate').errors;
const { requestLogger, errorLogger } = require('./middlewares/logger');

//основные подключения
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
app.use(cors({
  orirgin: ['http://mestoekbmik.site', 'https://mestoekbmik.site', 'http://www.mestoekbmik.site', 'https://www.mestoekbmik.site'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  preflightContinue: false,
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);
app.use(indexRouter);
app.use(errorLogger);
app.use(celebrateErrors());
app.use('*', error);
app.use('*', someNotFound);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
});