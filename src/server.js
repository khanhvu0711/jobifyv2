import express from 'express';
import 'express-async-errors';
import morgan from 'morgan';
import * as dotenv from 'dotenv';
import jobRouter from './routes/jobRouter.js';
import userRouter from './routes/userRouter.js';
import authRouter from './routes/authRouter.js';
import dbConnect from './config/dbConnect.js';
import errorHandle from './middlewares/errorHandle.js';
import { authenticateUser } from './middlewares/authMiddleware.js';
import cookieParser from 'cookie-parser';
import path from 'path';

dotenv.config();

const app = express();

const PORT = process.env.NODE_PORT || 5100;
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, 'public')));

app.get('/', (req, res) => {
  console.log(__dirname);
  res.send('helloword;');
});

app.get('/api/v1/test', (req, res) => {
  res.json({ msg: 'test route' });
});
//job
app.use('/api/v1/jobs', authenticateUser, jobRouter);

//user
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users/', authenticateUser, userRouter);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './public', 'index.html'));
});

app.use('*', (req, res) => {
  res.status(404).json({
    msg: 'page not found',
  });
});

app.use(errorHandle);

dbConnect();
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT} ....`);
});
