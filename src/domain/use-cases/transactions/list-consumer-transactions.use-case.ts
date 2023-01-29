import { TransactionEntity } from '@/domain/entities/transaction.entity';

export interface IListConsumerTransactionsUseCase {
  exec: (consumerId: string) => Promise<Array<TransactionEntity>>;
}