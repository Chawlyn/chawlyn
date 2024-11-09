import express, { Request, Response } from 'express';
import { register, login, googleLogged } from '../handlers/auth';
import passport from "passport";
import "../config/google";
import { ErrorResponse } from '../utils/errorResponse';

const router = express.Router();

router.post('/auth/register', register);
router.post('/auth/login', login);
router.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }))

router.get('/google/callback', 
  passport.authenticate('google', {
    successRedirect: '/protected',
    failureRedirect: '/auth/failure'
  })
);

router.get('/auth/failure', (req:Request, res:Response) => {
  res.status(401).send({ message: 'Authentication failed' });
})
router.get('/protected', googleLogged, (req:Request, res:Response) => {

  if (!req.user) {
    throw new ErrorResponse("No user found", 401)
  }
  res.send(`Hello from protected route ${req.user}`)
})

router.get('/logout', (req:Request, res: Response) => {
  req.logOut(() => {});
  req.session.destroy((err) => {});
  res.status(200).json({ message: "Goodbye!" })
});

export default router;