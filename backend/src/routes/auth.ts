import express, { Request, Response } from 'express';
import { register, login, oAuth } from '../handlers/auth';
import passport from "passport";
import "../config/google";
import { ErrorResponse } from '../utils/errorResponse';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', oAuth);

router.get('/logout', (req:Request, res: Response) => {
  req.logOut(() => {});
  req.session.destroy((err) => {});
  res.status(200).json({ message: "Goodbye!" })
});

export default router;