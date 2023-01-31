import { TransactionRepository } from '@/app/abstracts/repositories/transaction.repository';
import { TransactionEntity } from '@/domain/entities/transaction.entity';

import { IListUserTransactionsUseCase } from '@/domain/use-cases/transactions';

export class ListTransactionsUseCase implements IListUserTransactionsUseCase {
  constructor(private readonly repository: TransactionRepository) {}

  public async exec(userId: string): Promise<TransactionEntity[]> {
    return this.repository.listUserTransactions(userId);
  }
}