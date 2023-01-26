import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';

import { AppModuleProviders } from './ioc/providers/app.providers';

import { ConsumerModule } from './modules/consumer/consumer.module';
import { TransactionModule } from './modules/transaction/transaction.module';

@Module({
  controllers: [AppController],
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true
    }),
    ConsumerModule,
    TransactionModule
  ],
  providers: AppModuleProviders
})
export class AppModule {}