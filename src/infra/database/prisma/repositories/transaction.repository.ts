import { Injectable } from '@nestjs/common';

import { 
  Transaction as PrismaTransaction 
} from '@prisma/client';

import { PrismaService } from '../prisma.service';

import { PrismaTransactionMapper } from '../mappers/transaction.mapper';

import { Transaction } from '@/src/app/entities/transaction/transaction.entity';
import { TransactionRepository } from '@/src/app/repositories/transaction.repository';

@Injectable()
export class PrismaTransactionRepository implements TransactionRepository {
  constructor(private prismaService: PrismaService) {}

  public async create(data: Transaction): Promise<Transaction> {
    const prismaTransactionData: PrismaTransaction = await this.prismaService.transaction.create({
      data: PrismaTransactionMapper.toPrisma(data)
    });

    const transaction: Transaction = PrismaTransactionMapper.toDomain(
      prismaTransactionData
    );

    return transaction;
  }

  public async findById(id: string): Promise<Transaction | null> {
    const prismaTransactionData: PrismaTransaction = await this.prismaService.transaction.findUnique({
      where: {
        id
      }
    });

    if (!prismaTransactionData) {
      return null;
    }

    const transaction: Transaction = PrismaTransactionMapper.toDomain(
      prismaTransactionData
    );

    return transaction;
  }

  public async listUserTransactions(userId: string): Promise<Array<Transaction>> {
    const prismaTransactionData: PrismaTransaction[] = await this.prismaService.transaction.findMany({
      where: {
        userId
      }
    });

    const transactions: Transaction[] = prismaTransactionData.map(
      PrismaTransactionMapper.toDomain
    );

    return transactions;
  }
}