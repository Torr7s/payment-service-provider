import { Module } from '@nestjs/common';

import { PrismaService } from './prisma/prisma.service';

import { PayableRepository } from '@/src/app/repositories/payable.repository';
import { TransactionRepository } from '@/src/app/repositories/transaction.repository';
import { UserRepository } from '@/src/app/repositories/user.repository';

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