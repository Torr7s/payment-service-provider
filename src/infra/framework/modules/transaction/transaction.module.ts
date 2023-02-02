import { Module } from '@nestjs/common';

import { TransactionController } from './transaction.controller';

import { PayableRepository } from '@/app/abstracts/repositories/payable.repository';
import { TransactionRepository } from '@/app/abstracts/repositories/transaction.repository';
import { UserRepository } from '@/app/abstracts/repositories/user.repository';

import { CreatePayableUseCase } from '@/app/use-cases/payables/create-payable';

import { CreateTransactionUseCase } from '@/app/use-cases/transactions/create-transaction';
import { ListUserTransactionsUseCase } from '@/app/use-cases/transactions/list-user-transactions';

import { PrismaService } from '@/infra/database/prisma/prisma.service';

import { PrismaPayableRepository } from '@/infra/database/prisma/repositories/payable.repository';
import { PrismaTransactionRepository } from '@/infra/database/prisma/repositories/transaction.repository';
import { PrismaUserRepository } from '@/infra/database/prisma/repositories/user.repository';

@Module({
  controllers: [TransactionController],
  providers: [
    PrismaService,
    {
      provide: PayableRepository,
      useFactory: (prismaService: PrismaService): PrismaPayableRepository =>
        new PrismaPayableRepository(prismaService),
      inject: [PrismaService]
    },
    {
      provide: TransactionRepository,
      useFactory: (prismaService: PrismaService): PrismaTransactionRepository =>
        new PrismaTransactionRepository(prismaService),
      inject: [PrismaService]
    },
    {
      provide: UserRepository,
      useFactory: (prismaService: PrismaService): PrismaUserRepository =>
        new PrismaUserRepository(prismaService),
      inject: [PrismaService]
    },
    {
      provide: CreatePayableUseCase,
      useFactory: (payableRepository: PayableRepository): CreatePayableUseCase =>
        new CreatePayableUseCase(payableRepository),
      inject: [PayableRepository]
    },
    {
      provide: CreateTransactionUseCase,
      useFactory: (createPayableUseCase: CreatePayableUseCase, transactionRepository: TransactionRepository): CreateTransactionUseCase =>
        new CreateTransactionUseCase(
          createPayableUseCase,
          transactionRepository
        ),
      inject: [CreatePayableUseCase, TransactionRepository]
    },
    {
      provide: ListUserTransactionsUseCase,
      useFactory: (transactionRepository: TransactionRepository): ListUserTransactionsUseCase =>
        new ListUserTransactionsUseCase(transactionRepository),
      inject: [TransactionRepository]
    }
  ]
})
export class TransactionModule {}