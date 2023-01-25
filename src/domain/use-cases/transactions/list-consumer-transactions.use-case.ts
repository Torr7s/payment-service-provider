import { Transaction } from '@prisma/client';

export interface IListConsumerTransactionsUseCase {
  exec: (consumerId: string) => Promise<Transaction[]>;
}