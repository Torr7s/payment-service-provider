import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma.service';

import { TransactionRepository } from '@/app/abstracts/repositories/transaction.repository';

import { 
  NSTransactionRepositoryCreate, 
  NSTransactionRepositoryFindById,
  NSTransactionRepositoryList
} from '@/domain/contracts/repositories';

@Injectable()
export class PrismaTransactionRepository implements TransactionRepository {
  constructor(private prismaService: PrismaService) {}

  public async create(params: NSTransactionRepositoryCreate.Input): Promise<NSTransactionRepositoryCreate.Output> {
    return this.prismaService.transaction.create({
      data: params
    });
  }

  public async findById({ id }: NSTransactionRepositoryFindById.Input): Promise<NSTransactionRepositoryFindById.Output> {
    return this.prismaService.transaction.findUnique({
      where: {
        id
      }
    });
  }

  public async list({ consumerId }: NSTransactionRepositoryList.Input): Promise<NSTransactionRepositoryList.Output> {
    return await this.prismaService.transaction.findMany({
      where: {
        consumerId
      }
    });
  }
}