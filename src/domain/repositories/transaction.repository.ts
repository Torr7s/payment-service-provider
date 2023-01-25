import { Transaction } from '@prisma/client';

import { CreateTransactionDto } from '@/domain/dtos/transaction/create-transaction.dto';

export interface ITransactionRepository {
  create: (createTransactionDto: CreateTransactionDto) => Promise<Transaction>;
  findById: (id: string) => Promise<Transaction>;
  listConsumerTransactions: (consumerId: string) => Promise<Transaction[]>;
}