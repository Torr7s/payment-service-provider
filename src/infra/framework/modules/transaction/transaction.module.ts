import { Module } from '@nestjs/common';

import { TransactionController } from './transaction.controller';

import { PayableRepository } from '@/app/abstracts/repositories/payable.repository';
import { TransactionRepository } from '@/app/abstracts/repositories/transaction.repository';
import { UserRepository } from '@/app/abstracts/repositories/user.repository';

import { AuthUseCase } from '@/app/use-cases/auth/auth';
import { CreatePayableUseCase } from '@/app/use-cases/payables/create-payable';

import { CreateTransactionUseCase } from '@/app/use-cases/transactions/create-transaction';
import { ListTransactionsUseCase } from '@/app/use-cases/transactions/list-transactions';

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
      provide: AuthUseCase,
      useFactory: (userRepository: UserRepository): AuthUseCase =>
        new AuthUseCase(userRepository),
      inject: [UserRepository]
    },
    {
      provide: CreatePayableUseCase,
      useFactory: (payableRepository: PayableRepository, transactionRepository: TransactionRepository): CreatePayableUseCase =>
        new CreatePayableUseCase(
          payableRepository,
          transactionRepository
        ),
      inject: [PayableRepository, TransactionRepository]
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
      provide: ListTransactionsUseCase,
      useFactory: (transactionRepository: TransactionRepository): ListTransactionsUseCase =>
        new ListTransactionsUseCase(transactionRepository),
      inject: [TransactionRepository]
    }
  ]
})
export class TransactionModule {}