import { Module } from '@nestjs/common';

import { PrismaService } from './prisma/prisma.service';

import { PayableRepository } from '@/app/abstracts/repositories/payable.repository';
import { TransactionRepository } from '@/app/abstracts/repositories/transaction.repository';
import { UserRepository } from '@/app/abstracts/repositories/user.repository';

import { PrismaPayableRepository } from './prisma/repositories/payable.repository';
import { PrismaTransactionRepository } from './prisma/repositories/transaction.repository';
import { PrismaUserRepository } from './prisma/repositories/user.repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: PayableRepository,
      useClass: PrismaPayableRepository,
    },
    {
      provide: TransactionRepository,
      useClass: PrismaTransactionRepository,
    },
    {
      provide: UserRepository,
      useClass: PrismaUserRepository
    }
  ],
  exports: [
    UserRepository,
    TransactionRepository,
    PayableRepository
  ]
})
export class DatabaseModule {}