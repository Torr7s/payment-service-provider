import { Transaction } from '@prisma/client';

import { TransactionRepository } from '@/app/abstracts/repositories/transaction.repository';

import { IListConsumerTransactionsUseCase } from '@/domain/use-cases/transactions';

export class ListTransactionsUseCase implements IListConsumerTransactionsUseCase {
  constructor(private readonly repository: TransactionRepository) {}

  public async exec(consumerId: string): Promise<Transaction[]> {
    return this.repository.listConsumerTransactions(consumerId);
  }
}