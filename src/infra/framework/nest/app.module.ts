import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './modules/auth/auth.module';
import { ConsumerModule } from './modules/consumer/consumer.module';
import { TransactionModule } from './modules/transaction/transaction.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true
    }),
    AuthModule,
    ConsumerModule,
    TransactionModule
  ]
})
export class AppModule {}