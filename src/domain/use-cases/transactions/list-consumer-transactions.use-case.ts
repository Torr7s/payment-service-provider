import { TransactionEntity } from '@/domain/entities/transaction.entity';

export interface IListUserTransactionsUseCase {
  exec: (userId: string) => Promise<Array<TransactionEntity>>;
}