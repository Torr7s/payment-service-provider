import { Transaction } from '@prisma/client';

import { CreateTransactionDto } from '@/domain/dtos/transaction/create-transaction.dto';

export interface ICreateTransactionUseCase {
  exec: (consumerId: string, createTransactionDto: CreateTransactionDto) => Promise<Transaction>;
}