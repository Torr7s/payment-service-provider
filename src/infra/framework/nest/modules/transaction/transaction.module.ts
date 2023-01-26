import { Module } from '@nestjs/common';

import { TransactionController } from './transaction.controller';

import { TransactionModuleProviders } from '../../ioc/providers/transaction.providers';

@Module({
  controllers: [TransactionController],
  providers: TransactionModuleProviders
})
export class TransactionModule {}