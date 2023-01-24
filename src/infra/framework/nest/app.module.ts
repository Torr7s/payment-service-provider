import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config';

import { ConsumerModule } from './modules/consumer/consumer.module';
import { TransactionModule } from './modules/transaction/transaction.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true
    }),
    ConsumerModule,
    TransactionModule
  ]
})
export class AppModule {}
