import { PrismaService } from '../prisma.service';

import { TransactionRepository } from '@/app/abstracts/repositories/transaction.repository';

import { TransactionEntity } from '@/domain/entities/transaction.entity';

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
        consumerId: data.consumerId
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

  public async listConsumerTransactions(consumerId: string): Promise<Array<TransactionEntity>> {
    return await this.prismaService.transaction.findMany({
      where: {
        consumerId
      }
    });
  }
}