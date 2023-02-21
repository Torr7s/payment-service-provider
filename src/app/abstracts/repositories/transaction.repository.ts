import { TransactionEntity } from '@/app/entities/transaction.entity';

export abstract class TransactionRepository {
  public abstract create: (data: TransactionEntity) => Promise<TransactionEntity>;
  public abstract findById: (id: string) => Promise<TransactionEntity>;
  public abstract listUserTransactions: (userId: string) => Promise<Array<TransactionEntity>>;
}