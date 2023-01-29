import { Transaction } from '@prisma/client';

import { CreateTransactionDto } from '@/domain/dtos/transaction';
import { ITransactionRepository } from '@/domain/repositories/transaction.repository';

export abstract class TransactionRepository implements ITransactionRepository {
  public abstract create: (consumerId: string, createTransactionDto: CreateTransactionDto) => Promise<Transaction>;
  public abstract findById: (id: string) => Promise<Transaction>;
  public abstract listConsumerTransactions: (consumerId: string) => Promise<Transaction[]>;
}