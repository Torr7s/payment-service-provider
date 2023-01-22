import { Module } from '@nestjs/common'

import { ConsumerModule } from './consumer/consumer.module';
import { TransactionModule } from './transaction/transaction.module';

@Module({
  imports: [
    ConsumerModule,
    TransactionModule
  ]
})
export class AppModule {}
