import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import compression from 'compression';
import authRouter from './routes/auth';
import asyncHandler from './middleware/async';
import errorHandler from './middleware/error';
import session from "express-session";
import environment from './config/env';
import passport from 'passport';
import { ErrorResponse } from './utils/errorResponse';

const app: Application = express();

if (!environment.SESSION_SECRET) {
  throw new ErrorResponse('Secret key is required', 500)
}

app.use(cors({ credentials: true }));
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: environment.SESSION_SECRET, resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', asyncHandler(async (req: Request, res: Response) => {
  return res.status(200).json({ messgae: "Welcome"})
}));

app.use('/api/v1/auth', authRouter);

// Error Handler
app.use(errorHandler)

export default app;