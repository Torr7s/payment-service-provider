import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma.service';

import { TransactionEntity } from '@/src/app/entities/transaction.entity';
import { TransactionRepository } from '@/src/app/repositories/transaction.repository';

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