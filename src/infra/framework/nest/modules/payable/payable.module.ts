import { Module } from '@nestjs/common';

import { PayableController } from './payable.controller';

import { PayableRepository } from '@/app/abstracts/repositories/payable.repository';
import { TransactionRepository } from '@/app/abstracts/repositories/transaction.repository';

import { ListPayablesUseCase } from '@/app/use-cases/payables/list-payables';

import { PrismaService } from '@/infra/database/prisma/prisma.service';

import { PrismaPayableRepository } from '@/infra/database/prisma/repositories/payable.repository';
import { PrismaTransactionRepository } from '@/infra/database/prisma/repositories/transaction.repository';

@Module({
  controllers: [PayableController],
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
      provide: ListPayablesUseCase,
      useFactory: (payableRepository: PayableRepository): ListPayablesUseCase => 
        new ListPayablesUseCase(payableRepository),
      inject: [PayableRepository]
    }
  ]
})
export class PayableModule {}