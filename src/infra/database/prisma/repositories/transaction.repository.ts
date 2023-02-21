import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma.service';

import { TransactionRepository } from '@/app/abstracts/repositories/transaction.repository';

import { TransactionEntity } from '@/app/entities/transaction.entity';

@Injectable()
export class PrismaTransactionRepository implements TransactionRepository {
  constructor(private prismaService: PrismaService) {}

  public async create(data: TransactionEntity): Promise<TransactionEntity> {
    return this.prismaService.transaction.create({
      data: {
        cardCVV: data.cardCVV,
        cardExpirationDate: data.cardExpirationDate,
        cardNumber: data.cardNumber,
        cardOwnerName: data.cardOwnerName,
        description: data.description,
        paymentMethod: data.paymentMethod,
        value: data.value,
        userId: data.userId
      }
    });
  }

  public async findById(id: string): Promise<TransactionEntity> {
    return this.prismaService.transaction.findUnique({
      where: {
        id
      }
    });
  }

  public async listUserTransactions(userId: string): Promise<Array<TransactionEntity>> {
    return await this.prismaService.transaction.findMany({
      where: {
        userId
      }
    });
  }
}