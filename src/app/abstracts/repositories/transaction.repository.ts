import { TransactionEntity } from '@/domain/entities/transaction.entity';

import { ITransactionRepository } from '@/domain/repositories/transaction.repository';

export abstract class TransactionRepository implements ITransactionRepository {
  public abstract create: (data: TransactionEntity) => Promise<TransactionEntity>;
  public abstract findById: (id: string) => Promise<TransactionEntity>;
  public abstract listUserTransactions: (userId: string) => Promise<Array<TransactionEntity>>;
}