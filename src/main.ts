import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { setup } from './setup';

import { AppModule } from './infra/framework/app.module';

async function bootstrap(): Promise<void> {
  const app: INestApplication = await NestFactory.create(AppModule);

  setup(app);
  
  await app.listen(3000);
}

bootstrap();
