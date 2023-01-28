import { Provider } from '@nestjs/common';

import { TransactionRepository } from '@/app/abstracts/repositories/transaction.repository';

import { CreateTransactionUseCase } from '@/app/use-cases/transactions/create-transaction';
import { ListTransactionsUseCase } from '@/app/use-cases/transactions/list-transactions';

import { PrismaService } from '@/infra/database/prisma/prisma.service';

import { PrismaTransactionRepository } from '@/infra/database/prisma/repositories/transaction.repository';

export const TransactionModuleProviders: Provider[] = [
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
  },
  {
    provide: ListTransactionsUseCase,
    useFactory: (repository: TransactionRepository): ListTransactionsUseCase => new ListTransactionsUseCase(repository),
    inject: [TransactionRepository]
  }
]