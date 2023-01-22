import { Module } from '@nestjs/common';

import { TransactionController } from './transaction.controller';

import { TransactionRepository } from '@/app/repositories/transaction.repository';
import { CreateTransactionUseCase } from '@/app/use-cases/transactions';

import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { PrismaTransactionRepository } from '@/infra/database/prisma/repositories/transaction.repository';

@Module({
  controllers: [TransactionController],
  providers: [
    PrismaService,
    {
      provide: TransactionRepository,
      useFactory: (prismaService: PrismaService): PrismaTransactionRepository => new PrismaTransactionRepository(prismaService),
      inject: [PrismaService]
    },
    {
      provide: CreateTransactionUseCase,
      useFactory: (repository: TransactionRepository): CreateTransactionUseCase => new CreateTransactionUseCase(repository),
      inject: [TransactionRepository]
    }
  ]
})
export class TransactionModule {}