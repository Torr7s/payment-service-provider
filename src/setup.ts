import { INestApplication, ValidationPipe } from '@nestjs/common';

import passport from 'passport';
import cookieParser from 'cookie-parser';

import sessionConfig from './config/session';

import { HttpExceptionFilter } from './infra/framework/exceptions/http-exception.filter';

export function setup(app: INestApplication): INestApplication {
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true
    })
  );
  app.useGlobalFilters(new HttpExceptionFilter());

  app.use(sessionConfig);
  
  app.use(passport.initialize());
  app.use(passport.session());

  app.enableCors({
    origin: '*',
    methods: [
      'GET', 
      'POST'
    ],
    allowedHeaders: [
      'Acess',
      'Content-Type',
      'Authorization',
      'Accept',
      'Origin',
      'X-Requested-With'
    ]
  });

  app.use(cookieParser(process.env.JWT_SECRET_KEY));

  return app;
}