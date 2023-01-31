import session from 'express-session';
import connectPgSimple from 'connect-pg-simple';

const stage: string = process.env.STAGE;

export default session({
  secret: process.env.JWT_SECRET_KEY as string,
  resave: false,
  saveUninitialized: false,
  store: stage === 'production' ? new (connectPgSimple(session))() : new session.MemoryStore(),
  cookie: {
    httpOnly: true,
    signed: true,
    sameSite: 'strict',
    secure: process.env.STAGE === 'production'
  }
});