import { Transaction } from '@prisma/client';

import { PrismaService } from '../prisma.service';

import { TransactionRepository } from '@/app/abstracts/repositories/transaction.repository';

import { CreateTransactionDto } from '@/domain/dtos/transaction';

export class PrismaTransactionRepository implements TransactionRepository {
  constructor(private prismaService: PrismaService) {}

  public async create(createTransactionDto: CreateTransactionDto): Promise<Transaction> {
    return this.prismaService.transaction.create({
      data: createTransactionDto
    });
  }

  public async findById(id: string): Promise<Transaction> {
    return this.prismaService.transaction.findUnique({
      where: {
        id
      }
    });
  }

  public async listConsumerTransactions(consumerId: string): Promise<Transaction[]> {
    return await this.prismaService.transaction.findMany({
      where: {
        consumerId
      }
    });
  }
}