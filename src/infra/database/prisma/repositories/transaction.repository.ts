import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma.service';

import { TransactionRepository } from '@/app/repositories/transaction.repository';

import { TransactionRepositoryCreateNS, TransactionRepositoryFindByIdNS } from '@/domain/contracts/repositories';

@Injectable()
export class PrismaTransactionRepository implements TransactionRepository {
  constructor(private prismaService: PrismaService) {}

  public async create(params: TransactionRepositoryCreateNS.Input): Promise<TransactionRepositoryCreateNS.Output> {
    return this.prismaService.transaction.create({
      data: {
        value: params.value,
        description: params.description,
        paymentMethod: params.paymentMethod,
        cardNumber: params.cardNumber,
        cardOwnerName: params.cardOwnerName,
        cardExpirationDate: params.cardExpirationDate,
        cardCVV: params.cardCVV
      }
    });
  }

  public async findById({ id }: TransactionRepositoryFindByIdNS.Input): Promise<TransactionRepositoryFindByIdNS.Output> {
    return this.prismaService.transaction.findUnique({
      where: {
        id
      }
    });
  };
}