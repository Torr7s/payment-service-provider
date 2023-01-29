import { TransactionEntity } from '../entities/transaction.entity';

export interface ITransactionRepository {
  create: (data: TransactionEntity) => Promise<TransactionEntity>;
  findById: (id: string) => Promise<TransactionEntity>;
  listConsumerTransactions: (consumerId: string) => Promise<Array<TransactionEntity>>;
}