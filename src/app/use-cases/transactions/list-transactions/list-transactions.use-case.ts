import { TransactionRepository } from '@/app/abstracts/repositories/transaction.repository';

import { TransactionEntity } from '@/domain/entities/transaction.entity';

import { IListConsumerTransactionsUseCase } from '@/domain/use-cases/transactions';

export class ListTransactionsUseCase implements IListConsumerTransactionsUseCase {
  constructor(private readonly repository: TransactionRepository) {}

  public async exec(consumerId: string): Promise<TransactionEntity[]> {
    return this.repository.listConsumerTransactions(consumerId);
  }
}