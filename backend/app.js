const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { celebrate, Joi, errors } = require('celebrate');
const helmet = require('helmet');
const NotFoundError = require('./errors/NotFoundError');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');

require('dotenv').config();

const { PORT = 3000 } = process.env;
const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
})
  .then(() => console.log('You are connected to MongoDB, yay!'))
  .catch((err) => console.log({ err }));

app.use(helmet());

app.use(requestLogger);

app.get('/api/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/api/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(5),
  }).unknown(true),
}), login);
app.post('/api/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(5),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(/^https?:\/\/(www\.)?[a-zA-Z0-9-.]+\.[a-zA-Z]{2,}([a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]+)*#*$/),
  }).unknown(true),
}), createUser);

app.use(auth);

app.use('/api/users', require('./routes/users'));
app.use('/api/cards', require('./routes/cards'));

app.use('*', () => {
  throw new NotFoundError('Такой страницы не существует, проверьте адрес');
});

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = statusCode === 500 ? 'На сервере произошла ошибка' : err.message;
  res.status(statusCode).send({ message });
  next();
});

app.listen(PORT, () => {
  console.log(`Hi! This is the Port ${PORT} speaking!`);
});
