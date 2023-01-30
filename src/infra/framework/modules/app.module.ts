import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { ConsumerModule } from './consumer/consumer.module';
import { PayableModule } from './payable/payable.module';
import { TransactionModule } from './transaction/transaction.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true
    }),
    AuthModule,
    ConsumerModule,
    TransactionModule,
    PayableModule
  ]
})
export class AppModule {}