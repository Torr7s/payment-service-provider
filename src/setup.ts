import { INestApplication, ValidationPipe } from '@nestjs/common';

import session from 'express-session';
import passport from 'passport';
import connectPgSimple from 'connect-pg-simple';
import cookieParser from 'cookie-parser';

export function setup(app: INestApplication): INestApplication {
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true
    })
  );

  app.use(cookieParser(process.env.JWT_SECRET_KEY));

  app.use(
    session({
      secret: process.env.JWT_SECRET_KEY as string,
      resave: false,
      saveUninitialized: false,
      store: process.env.STAGE === 'production' ? new (connectPgSimple(session))() : new session.MemoryStore(),
      cookie: {
        httpOnly: true,
        signed: true,
        sameSite: 'strict',
        secure: process.env.STAGE === 'production'
      }
    })
  );

  app.use(passport.initialize())
  app.use(passport.session());

  return app;
}