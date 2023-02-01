import { TransactionEntity } from '@/domain/entities/transaction.entity';

export interface ListUserTransactionsUseCaseInput {
  userId: string;
}

export interface ListUserTransactionsUseCaseOutput {
  transactions: TransactionEntity[];
}