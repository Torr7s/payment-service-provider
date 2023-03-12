import { Transaction } from '../entities/transaction';

export abstract class TransactionRepository {
  public abstract create: (data: Transaction) => Promise<Transaction>;
  public abstract findById: (id: string) => Promise<Transaction | null>;
  public abstract listUserTransactions: (userId: string) => Promise<Array<Transaction>>;
}