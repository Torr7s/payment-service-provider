import { Module } from '@nestjs/common'

import { ConsumerModule } from './modules/consumer/consumer.module';
import { TransactionModule } from './modules/transaction/transaction.module';

@Module({
  imports: [
    ConsumerModule,
    TransactionModule
  ]
})
export class AppModule {}
